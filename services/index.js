'use strict'
const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config')

function createToken(user) {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(1, 'days').unix(),
    }
    return jwt.sign(payload, config.SECRET_TOKEN)
}

function decodeToken(token) {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.verify(token, config.SECRET_TOKEN)
            if (payload.exp < moment().unix()) {
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                })
            }
            resolve(payload.sub)
        } catch (error) {
            reject({
                status: 500,
                message: 'Token invalido, o expirado',
                error
            })
        }
    })
    return decoded
}

module.exports = {
    createToken,
    decodeToken
}