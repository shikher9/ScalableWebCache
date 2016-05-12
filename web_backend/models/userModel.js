var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userModel = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    token: {
        type: String
    },
    email: {
        type: String
    }
});


module.exports = mongoose.model('User', userModel);