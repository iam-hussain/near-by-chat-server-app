var mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
import md5 from 'md5';
import jwt from'jsonwebtoken';

var UserSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        require: true,
        type: String,
    },
    phone: {
        require: true,
        type: String
    },
    password: {
        require: true,
        type: String
    },
    salt: {
        require: true,
        type: String
    },
});


UserSchema.methods.hashPassword = function hashPassword(reqPassword) {
    return md5(md5(reqPassword) + this.salt);
};

UserSchema.methods.getJWT = function getJWT() {
    return jwt.sign({
        id: this.id,
        email: this.email,
        phone: this.phone
    }, "NearByChat_SECRET_KEY", {
        expiresIn: '1d'
    });
};

UserSchema.methods.verifyPassword = function verifyPassword(reqPassword) {
    return ((md5(md5(reqPassword) + this.salt)) == this.password )? true: false;
};

mongoose.plugin(timestamps);

module.exports = mongoose.model("User", UserSchema);