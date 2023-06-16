var express = require('express');
var router = express.Router();
var Users = require('../model/user');
// const io = require('socket.io')(8080)

const u = {}

/* GET home page. */
router.get('/', function(req, res, next) {

    if(req.session.user){
        res.redirect('/');
    }else{
        res.render('login')
    };
});

router.post('/', (req, res, next) => {
    var body = req.body
    var fullname = body.fullname
    var username = body.username
    var password = body.password
    Users.findOne({username: username, password: password}, (err, users) => {
        var error = ''
        if(users){
            req.session.user = users.id
            // io.on('connection', socket => {
            //     console.log("New User")
            //     socket.emit('chat-message', 'Hello World')
            // })
            return res.redirect('../')
        }else if(username === ''){
            var error = 'Username not entered';
            return res.render('login', {error, fullname, username, password})
        }else if(password === ''){
            var error = 'Password not entered';
            return res.render('login', {error, fullname, username, password})
        }else{
            error = 'Username or password incorrect'
            return res.render('login', {error, fullname, username, password})
        }
    });
});

module.exports = router;
