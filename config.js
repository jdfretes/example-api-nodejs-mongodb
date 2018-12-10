module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB || 'mongodb://localhost:27017/shopdb',
    SECRET_TOKEN: 'mi_clave_secreta'
}