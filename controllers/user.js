'use strict'
const mongoose = require('mongoose');
const User = require('../models/user');
const service = require('../services/index');
const bcrypt = require('bcrypt-nodejs');

function signUp(req, res) {
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName
    })

    user.avatar = user.gravatar()

    user.save((err) => {
        if (err) res.status(500).send({ message: 'Error al crear el usuario...' + err })
        return res.status(200).send({ token: service.createToken(user) })
    })
}

function signIn(req, res) {
    console.log(req.body)
    User.findOne({ email: req.body.email }).select('+password').then((user) => {
        if (!user) return res.status(404).send({ message: 'No esxiste usuario con el email especificado...' })
        console.log(req.body.password, user.password)
        //usamos hashSync porque cuando guardamos el password elegimos eso
        var passwordIsValid = bcrypt.hashSync(req.body.password, user.password);
        console.log(' passwordIsValid ', passwordIsValid)
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null, message: 'Contrasenha invalida' });

        res.status(200).send({
            message: 'Te has logueado correctamente...',
            token: service.createToken(user),
            auth: true
        })
    }).catch((err) => {
        if (err) return res.status(500).send({ message: 'Disculpe los inconvenientes...' })
    });
    
}

module.exports = {
    signUp,
    signIn
}
