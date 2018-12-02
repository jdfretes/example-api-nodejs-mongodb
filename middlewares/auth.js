'use strict'
const services = require('../services/index')

function isAuth(req, res, next) {
    if(!req.headers.authorization){
        return res.status(403).send({ message: 'No tienes acceso...' })
    }
    const token = req.headers.authorization.split(" ")[1]
    
    services.decodeToken(token).then(response => {
        req.user = response
        console.log(response)
        next()
    }).catch(response => {
        res.status(response.status).send({message: response.message})
    })
    
}

module.exports = isAuth