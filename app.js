var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var apiRouter = require('./routes/book');
var apiNodeCouchRouter = require('./routes/nodeCouchDb');
var cors = require('cors');
var app = express();

const nano = require('nano');
const db = nano(process.env.COUCHDB_URL || 'http://admin:raspberry@127.0.0.1:5984');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/cean-angular6')));
app.use(cors());
app.use('/', express.static(path.join(__dirname, 'dist/cean-angular6')));
app.use('/api', apiRouter);
app.use('/apinode', apiNodeCouchRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.send(err.status);
});
module.exports = app;