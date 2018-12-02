'use strict'
const Product = require('../models/product');

function getProducts(req, res) {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({ message: 'Error al consultar, Disculpe los inconvenientes...' })
        if (!products) return res.status(404).send({ message: 'No existen productos a la venta...' })

        res.status(200).send({ products })
    })
}

function getProduct(req, res) {
    let productId = req.params.productId
    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({ message: 'Error al consultar el producto, Disculpe los inconvenientes...' })
        if (!product) return res.status(404).send({ message: 'El Producto no existe...' })

        res.status(200).send({ product })
    })
}

function saveProduct(req, res) {
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
}

function updateProduct(req, res) {
    let productId = req.params.productId
    let update = req.body
    Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
        if (err) return res.status(500).send({ message: 'Error al actualizar el Producto...' })
        res.status(200).send({ product: productUpdated })
    });
}

function deleteProduct(req, res) {
    let productId = req.params.productId
    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({ message: 'Error al eliminar el Producto...' })
        product.remove((err) => {
            if (err) return res.status(500).send({ message: 'Error al eliminar el Producto...' })
            res.status(200).send({ message: "El Producto a sido eliminado" })
        })
    })
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}