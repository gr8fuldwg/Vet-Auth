const mongoose = require('mongoose');
const uuid = require('uuid');
const crypto = require('crypto');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String
    }, 
    salt: {
        type: String
    }
});

userSchema.methods.hashPassword = function hashPassword(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 128, 'sha256').toString('hex');
}
userSchema.methods.isValidPassword = function isValidPassword(password) {
    const possibleMatch = crypto.pbkdf2Sync(password, this.salt, 10000, 128, 'sha256').toString('hex');
    return this.hash === possibleMatch
}
module.exports = mongoose.model('User', userSchema);