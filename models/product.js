'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProductSchema = Schema({
    nombre: String,
    imagen: String,
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: String,
        enum: [
            'computadoras',
            'Celulares',
            'Accesorios'
        ]
    },
    descripcion: String
});

module.exports = mongoose.model('Product', ProductSchema);