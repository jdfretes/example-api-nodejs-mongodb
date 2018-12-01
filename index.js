'use strict'
const app = require('express')();
const bodyParser = require('body-parser');
var http = require('http').Server(app);
var jwt = require('jsonwebtoken');
var cors = require('cors')
var io = require('socket.io')(http);
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var mensajes = []

app.get('/', (req, res) => {
    res.status(200).send('<h1>twApi</h1>');
});

app.get('/api', (req, res) => {
    res.status(200).send({ message: 'root api' })
});

app.get('/api/product', (req, res) => {
    res.status(200).send({ message: 'get productos' })
});

app.get('/api/product/:productId', (req, res) => {
    res.status(200).send({ message: 'get producto' })
});

app.post('/api/product', (req, res) => {
    res.status(200).send(req.body)
});

app.put('/api/product/productId', (req, res) => {
    res.status(200).send({ message: 'put producto' })
});

app.delete('/api/product/productId', (req, res) => {
    res.status(200).send({ message: 'delete producto' })
});


/*app.get('/api/login', (req, res) => {
    //auth user
    const user = {
        id: 3,
        user_name: 'juanda'
    };
    const token = jwt.sign({user}, 'my_secret_key')
    res.json({
        token: token
    });
});

app.get('/api/protected', (req, res) => {
    res.json({
        text: 'api protected'
    })
});
//sockets
io.on('connection', (socket) => {
    socket.on('user new', (msg) => {
        let customMsg = {
            user: msg,
            msg: 'Hola me conecte...'
        }
        console.log(customMsg.user + ' se conecto');
        addMsg(customMsg)
    });

    socket.on('chat message', (msg) => {
        addMsg(msg)
    });
});

function addMsg(msg) {
    mensajes.push(msg)
    io.emit('send msg', mensajes)
}*/

//server
http.listen(PORT, () => {
    console.log('Corriendo en el puerto: ', PORT);
});
