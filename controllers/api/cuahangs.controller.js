var config = require('config.json');
var express = require('express');
var router = express.Router();
var cuahangService = require('services/cuahang.service');

// routes
router.post('/authenticate', authenticateUser);
router.post('/createbasicinfo', createBasicInfo);
router.get('/:_phuthuoc', getAll);
router.get('/getById/:_id', getById);
router.get('/cuahangnhan/:_id', getCuahangnhan);
router.put('/updatebasicinfo/:_id', updateBasicInfo);
router.put('/updatesanphaminfo/:_id', updateSanphamInfo);
router.delete('/:_id', deleteUser);

module.exports = router;

function authenticateUser(req, res) {
    cuahangService.authenticate(req.body.username, req.body.password)
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

function createBasicInfo(req, res) {
    console.log('cuahangs.createInfo:');
    console.log(req.body);
    cuahangService.createBasicInfo(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrentUser(req, res) {
    cuahangService.getById(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAll(req, res) {
    console.log('req.params._phuthuoc: ' + req.params._phuthuoc);
    cuahangService.getAll(req.params._phuthuoc)
        .then(function (user) {
            if (user) {
                console.log('Get All cuahangs by _phuthuoc.');
                res.send(user);
            } else {
                console.log('ERROR: Get All cuahangs by _phuthuoc.');
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}


function getById(req, res) {
    cuahangService.getById(req.params._id)
        .then(function (user) {
            if (user) {
                console.log('getById cuahangs by _id.');
                res.send(user);
            } else {
                console.log('ERROR: getById cuahangs by _id.');
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCuahangnhan(req, res) {
    cuahangService.getCuahangnhan(req.params._id)
        .then(function (user) {
            if (user) {
                console.log('getCuahangnhan cuahangs by _id.');
                res.send(user);
            } else {
                console.log('ERROR: getCuahangnhan cuahangs by _id.');
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

    cuahangService.updateBasicInfo(req.params._id, req.body)
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

    cuahangService.updateSanphamInfo(req.params._id, req.body)
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

    cuahangService.delete(userId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}