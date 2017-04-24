var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('sanphams');

var service = {};

service.getAll = getAll;
service.getById = getById;
service.createBasicInfo = createBasicInfo;
service.updateBasicInfo = updateBasicInfo;
service.delete = _delete;

module.exports = service;

function authenticate(username, password) {
    var deferred = Q.defer();

    db.users.findOne({ username: username }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve(jwt.sign({ sub: user._id }, config.secret));
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getAll(_phuthuoc) {
    var deferred = Q.defer();
    console.log('getAll(_phuthuoc): ' + _phuthuoc);
    db.sanphams.find({ phuthuoc: _phuthuoc }).toArray(function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            console.log('sanphams:' + user);
            deferred.resolve(user);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.sanphams.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(user);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function createBasicInfo(cuahangParam) {
    var deferred = Q.defer();

    // validation
    /*db.sanphams.findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // username already exists
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                createUser();
            }
        });*/
    createCuahang();
    function createCuahang() {
        // set user object to userParam without the cleartext password
        //var user = _.omit(userParam, 'password');

        // add hashed password to user object
        //user.hash = bcrypt.hashSync(userParam.password, 10);

        db.sanphams.insert(
            cuahangParam,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function updateBasicInfo(_id, cuahangParam) {
    var deferred = Q.defer();

    // validation
    db.sanphams.findById(_id, function (err, user) {
        if (err) {
          deferred.reject(err.name + ': ' + err.message);
        
        //if (user.username !== userParam.username) {
        //    // username has changed so check if the new username is already taken
        //    db.users.findOne(
        //        { username: userParam.username },
        //       function (err, user) {
        //           if (err) deferred.reject(err.name + ': ' + err.message);
        //
        //           if (user) {
        //               // username already exists
        //               deferred.reject('Username "' + req.body.username + '" is already taken')
        //           } else {
        //               updateUser();
        //           }
        //       });
        } else {
            updateCuahang();
        }
    });

    function updateCuahang() {
        // fields to update
        var set = {
            tensanpham: cuahangParam.tensanpham,
            masanpham: cuahangParam.masanpham,
            mota: cuahangParam.mota,
            ghichu: cuahangParam.ghichu,
            updatedby: cuahangParam.updatedby
        };

        // update password if it was entered
        //if (userParam.password) {
        //    set.hash = bcrypt.hashSync(userParam.password, 10);
        //}

        db.sanphams.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function updateSanphamInfo(_id, cuahangParam) {
    var deferred = Q.defer();

    // validation
    db.sanphams.findById(_id, function (err, user) {
        if (err) {
          deferred.reject(err.name + ': ' + err.message);
        
        //if (user.username !== userParam.username) {
        //    // username has changed so check if the new username is already taken
        //    db.users.findOne(
        //        { username: userParam.username },
        //       function (err, user) {
        //           if (err) deferred.reject(err.name + ': ' + err.message);
        //
        //           if (user) {
        //               // username already exists
        //               deferred.reject('Username "' + req.body.username + '" is already taken')
        //           } else {
        //               updateUser();
        //           }
        //       });
        } else {
            updateCuahang();
        }
    });

    function updateCuahang() {
        // fields to update
        var set = {
            sanphams: cuahangParam.sanphams
        };

        // update password if it was entered
        //if (userParam.password) {
        //    set.hash = bcrypt.hashSync(userParam.password, 10);
        //}

        db.sanphams.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.users.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}