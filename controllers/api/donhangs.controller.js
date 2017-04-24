var config = require('config.json');
var express = require('express');
var router = express.Router();
var donhangService = require('services/donhang.service');

// routes
router.post('/createdonhang', createDonhang);
router.get('/:_phuthuoc', getAll);
router.get('/getById/:_id', getById);
router.put('/updatebasicinfo/:_id', updateBasicInfo);
router.delete('/:_id', deleteUser);

module.exports = router;

function authenticateUser(req, res) {
    donhangService.authenticate(req.body.username, req.body.password)
        .then(function (token) {
            if (token) {
                // authentication successful
                res.send({ token: token });
            } else {
                // authentication failed
                res.status(401).send('Email hoặc Password không đúng.');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function createDonhang(req, res) {
    console.log('donhangs.createDonhang:');
    console.log(req.body);
    donhangService.createDonhang(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}


function getAll(req, res) {
    console.log('//////////////////////////////////////////////////');
    console.log('sanphams: getAll by _phuthuoc: ' + req.params._phuthuoc);
    donhangService.getAll(req.params._phuthuoc)
        .then(function (user) {
            if (user) {
                console.log('Get All sanphams by _phuthuoc.');
                res.send(user);
            } else {
                console.log('ERROR: Get All sanphams by _phuthuoc.');
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}


function getById(req, res) {
    console.log('//////////////////////////////////////////////////');
    console.log('sanphams: getById by _id: ' + req.params._id);
    donhangService.getById(req.params._id)
        .then(function (user) {
            if (user) {
                console.log('getById sanphams by _id.');
                res.send(user);
            } else {
                console.log('ERROR: getById sanphams by _id.');
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updateBasicInfo(req, res) {
    //var userId = req.user.sub;
    //if (req.params._id !== userId) {
    //    // can only update own account
    //    return res.status(401).send('You can only update your own account');
    //}

    donhangService.updateBasicInfo(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            console.log(err);
            res.status(400).send(err);
        });
}

function updateSanphamInfo(req, res) {
    //var userId = req.user.sub;
    //if (req.params._id !== userId) {
    //    // can only update own account
    //    return res.status(401).send('You can only update your own account');
    //}

    donhangService.updateSanphamInfo(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            console.log(err);
            res.status(400).send(err);
        });
}

function deleteUser(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only delete own account
        return res.status(401).send('You can only delete your own account');
    }

    donhangService.delete(userId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}