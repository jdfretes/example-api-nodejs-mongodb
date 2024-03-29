'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const UserSchema = Schema({
    email: { type: String, unique: true, lowercase: true },
    displayName: String,
    avatar: String,
    password: { type: String, select: false },
    signUpDate: { type: Date, default: Date.now() },
    lastLogin: Date
});

UserSchema.pre('save', function (next) {
    //if (!this.isModified('password')) return next()
    bcrypt.genSalt(15, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err)
            this.password = hash
            next()
        })
    })
})

UserSchema.methods.gravatar = function () {
    if (!this.email) return 'https://gravatar.com/avatar/?s=2006d-retro'

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return 'https://gravatar.com/avatar/' + md5 + '?s=200&d-retro'
}


module.exports = mongoose.model('User', UserSchema);