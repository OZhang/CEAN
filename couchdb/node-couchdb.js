const NodeCouchdb = require('node-couchdb');

const couch = new NodeCouchdb({
    host: '127.0.0.1',
    protocol: 'http',
    port: '5984',
    auth: {
        user: 'admin',
        pass: 'admin'
    }
});

exports.getDB = function() { return couch; }