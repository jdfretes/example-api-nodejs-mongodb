'use strict'
const app = require('./app');
const mongoose = require('mongoose');
const config = require('./config')
//db connect & server
mongoose.connect(config.db, (err, res) => {
    if (err) {
        console.log('db status: base de datos offline, intente reiniciar la base de datos')
    } else {
        console.log('db status: coneccion a la base de datos establecida...')
        //server
        app.listen(config.port, () => {
            console.log('API Corriendo en el puerto:', config.port);
        });
    }
});
