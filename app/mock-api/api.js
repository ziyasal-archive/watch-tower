var restify = require('restify');
var fs = require('fs');
var util = require('util');

var server = restify.createServer({
    name: 'mock-api',
    version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

function status(req, res, next) {
    console.log('[GET]');
    var status = req.params.status;

    var path = __dirname + util.format('/aws-status.%s.html', status);
    fs.readFile(path, function (err, data) {
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.end(data);
        return next();
    });
}

function notify(req, res, next) {
    console.log('[POST]');
    res.send(200);
    return next();
}

function error(req, res, next) {
    return next(new Error('An error occurred'));
}


server.get('/:status', status);
server.get('/error/:status', error);
server.post('/notify', notify);

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});