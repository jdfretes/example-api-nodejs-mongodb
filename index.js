'use strict'
const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Product = require('./models/product');
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
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({ message: 'Error al consultar, Disculpe los inconvenientes...' })
        if (!products) return res.status(404).send({ message: 'No existen productos a la venta...' })

        res.status(200).send({ products })
    })
});

app.get('/api/product/:productId', (req, res) => {
    let productId = req.params.productId
    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({ message: 'Error al consultar el producto, Disculpe los inconvenientes...' })
        if (!product) return res.status(404).send({ message: 'El Producto no existe...' })

        res.status(200).send({ product })
    })
});

app.post('/api/product', (req, res) => {
    let product = new Product()
    product.nombre = req.body.nombre
    product.imagen = req.body.imagen
    product.precio = req.body.precio
    product.categoria = req.body.categoria
    product.descripcion = req.body.descripcion

    product.save((err, productStored) => {
        if (err) res.status(500).send({ message: 'Error al guardar producto...' })
        res.status(200).send({ product: productStored })
    });
});

app.put('/api/product/:productId', (req, res) => {
    let productId = req.params.productId
    let update = req.body
    Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
        if (err) return res.status(500).send({ message: 'Error al actualizar el Producto...' })
        res.status(200).send({ product: productUpdated })
    });
});

app.delete('/api/product/:productId', (req, res) => {
    let productId = req.params.productId
    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({ message: 'Error al eliminar el Producto...' })
        product.remove((err) => {
            if (err) return res.status(500).send({ message: 'Error al eliminar el Producto...' })
            res.status(200).send({ message: "El Producto a sido eliminado" })
        })
    })
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

//db connect
mongoose.connect('mongodb://localhost:27017/shopdb', (err, res) => {
    if (err) {
        console.log('db status: ', err)
    } else {
        console.log('db status: coneccion a la base de datos establecida...')
        //server
        http.listen(PORT, () => {
            console.log('API Corriendo en el puerto: ', PORT);
        });
    }
});
