'use strict'
const mongoose = require('mongoose');
const User = require('../models/user');
const service = require('../services/index');
const bcrypt = require('bcrypt-nodejs');

function signUp(req, res) {
    if(req.body.email == "" || req.body.displayName == "" || req.body.password == "" ){
        return res.status(404).send({ message: 'Debe llenar los datos requeridos...' })
    }

    if (!validateEmail(req.body.email)) {
        return res.status(404).send({ message: 'Ingrese un email valido...' })
    }

    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.body.password
    })

    user.avatar = user.gravatar()

    user.save((err) => {
        if (err) return res.status(500).send({ message: 'No se pudo reqistrar(verifique sus datos)...', error: err.code})
        return res.status(200).send({ token: service.createToken(user) })
    })
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

function signIn(req, res) {
    //si llega vacio el request rechazamos
    if (Object.keys(req.body).length === 0) return res.status(404).send({ message: 'Debe llenar los datos requeridos...' })
    //si llegan los parametros buscamos en la db
    User.findOne({ email: req.body.email }).select('password').then((user) => {
        if (!user) return res.status(404).send({ message: 'No esxiste usuario con el email especificado...' })
        //usamos hashSync porque cuando guardamos el password elegimos eso
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null, message: 'Contrasenha invalida' });
        //si pass es valido damos aceso y un nuevo token
        res.status(200).send({
            message: 'Te has logueado correctamente...',
            token: service.createToken(user),
            auth: passwordIsValid
        })
    }).catch((err) => {
        if (err) return res.status(500).send({ message: 'Disculpe los inconvenientes...' })
    });

}

module.exports = {
    signUp,
    signIn
}




