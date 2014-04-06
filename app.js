var app = require('express')()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server);

var port = process.env.PORT || 5000;
server.listen(port);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
    socket.emit('ping', { msg: new Date() });
    socket.on('pong', function (data) {
        socket.emit('ping', { msg: new Date() });
    });
});