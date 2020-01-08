const express = require('express');
const router = express.Router();
const Books = require('../db/Books');
const extend = require('util')._extend;

router.get('/', function(req, res, next) {
    Books.list({ include_docs: true }).then(
        (body) => {
            body.rows.forEach((data) => {
                console.log(data.doc);
            });
            res.send(body.rows);
        },
        err => {
            console.log(err);
            res.sendStatus(err.statusCode);
        });
});

router.get('/:id', function(req, res, next) {
    Books.get(req.params.id).then(
        (book) => {
            console.log(book);
            res.send(book);
        },
        err => {
            console.log(err);
            res.sendStatus(err.statusCode);
        });
})

router.post('/', function(req, res, next) {
    Books.insert(req.body).then((result) => {
            res.send(result);
        },
        err => {
            console.log(err);
            res.sendStatus(err.statusCode);
        });
})


router.put('/:id', function(req, res, next) {
    Books.get(req.params.id).then((book) => {
            extend(book, req.body);
            Books.insert(book).then((result) => {
                res.send(result);
            });
        },
        err => {
            console.log(err);
            res.sendStatus(err.statusCode);
        });
})

router.delete('/:id', function(req, res, next) {
    Books.get(req.params.id).then((book) => {
            Books.destroy(book._id, book._rev).then((result) => {
                res.send(result);
            });
        },
        err => {
            console.log(err);
            res.sendStatus(err.statusCode);
        });
})

module.exports = router;