var app = require('express')();
var http = require('http').Server(app);
var cors = require('cors')
var io = require('socket.io')(http);
app.use(cors())
var mensajes = []

app.get('/', function (req, res) {
    res.send('<h1>twApi</h1>');
});

io.on('connection', function (socket) {
    socket.on('user new', function (msg) {
        let customMsg = {
            user: msg,
            msg: 'Hola me conecte...'
        }
        console.log(customMsg.user + ' se conecto');
        addMsg(customMsg)
    });

    socket.on('chat message', function (msg) {
        addMsg(msg)
    });
});

function addMsg(msg) {
    mensajes.push(msg)
    io.emit('send msg', mensajes)
}


http.listen(process.env.PORT || 3000, function () {
    console.log('listening on *:3000');
});
