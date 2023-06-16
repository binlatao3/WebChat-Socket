var mongoose = require('mongoose');

var user = new mongoose.Schema({
    id: String,
    fullname: String,
    username: String,
    password: String,
    friends:Array
});

var Users = mongoose.model('user', user);

module.exports = Users;