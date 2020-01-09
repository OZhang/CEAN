const express = require('express');
const router = express.Router();
const couch = require('../db/nodeCouchDb').getDB();
const dbName = 'books';

router.get('/', function(req, res, next) {
    const mangoQuery = {
        selector: {}
    };
    const parameters = {};
    couch.mango(dbName, mangoQuery, parameters).then(
        ({ data, headers, status }) => {
            res.send(data.docs);
        },
        err => {
            console.error(err);
            res.sendStatus(err.statusCode);
        });
});

router.get('/:id', function(req, res, next) {
    const mangoQuery = {
        "selector": {
            "_id": req.params.id
        }
    };
    const parameters = {};
    couch.mango(dbName, mangoQuery, parameters).then(
        ({ data, headers, status }) => {
            console.log(data.docs);
            let result = [];
            data.docs.forEach(element => {
                result.push(element);
            });
            res.send(result.length === 1 ? result[0] : result);
        },
        err => {
            console.error(err);
            res.sendStatus(err.statusCode);
        });
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    couch.insert(dbName, req.body).then(
        ({ data, headers, status }) => {
            console.log(data);
            console.log(headers);
            console.log(status);
            res.send(data);
        },
        err => {
            console.error(err);
            res.sendStatus(err.statusCode);
        });
})


router.put('/:id', function(req, res, next) {
    console.log("req.body", req.body);
    couch.update(dbName, req.body).then(
        ({ data, headers, status }) => {
            console.log(data);
            console.log(headers);
            console.log(status);
            res.send(data);
        },
        err => {
            console.error(err);
            res.sendStatus(err.statusCode);
        });
})

router.delete('/:id', function(req, res, next) {
    console.log('req.params', req);
    couch.del(dbName, req.params.id, req.query['rev']).then(
        ({ data, headers, status }) => {
            console.log(data);
            console.log(headers);
            console.log(status);
            res.send(data);
        },
        err => {
            console.error(err);
            res.sendStatus(err.statusCode);
        });

})

module.exports = router;