var express = require('express');
var router = express.Router();
var Users = require('../model/user');
var uuid = require('short-uuid');
const { customAlphabet } = require('nanoid')
const nanoid = customAlphabet('1234567890', 7)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Chat' });
});

router.post('/', (req ,res, next) => {
  var body = req.body
  var fullname = body.fullname
  var username = body.username
  var password = body.password
  Users.findOne({username: username},(err, users) => {
    var error = ''
    if(fullname === ''){
      var error = 'Fullname not entered';
      return res.render('signup',{error})
    }else if(fullname.length < 5){
      var error = 'Fullname must be more than 5 characters';
      return res.render('signup',{error, fullname, username, password})
    }else if(validateName(fullname)){
      var error = 'Fullname can not have a number';
      return res.render('signup',{error, fullname, username, password})
    }else if(username ===''){
      var error = 'Username not entered';
      return res.render('signup',{error, fullname, username, password})
    }else if(username.length < 5){
      var error = 'Username must be more than 5 characters';
      return res.render('signup',{error, fullname, username, password})
    }else if(users){
      var error = 'Username exists';
      return res.render('signup',{error, fullname, username, password})
    }else if(password === ''){
      var error = 'Password not entered';
      return res.render('signup',{error, fullname, username, password})
    }else if(password.length <  6){
      var error = 'Password must be more than 6 characters';
      return res.render('signup',{error, fullname, username, password})
    }else{
      new Users({
        id: create_UUID(),
        fullname: fullname,
        username: username,
        password: password
      }).save();
      res.redirect('/login')
    }
  });  
});

function validateName(name) {
  const re = /\d+/;
  return re.test(String(name).toLowerCase());
}

function addZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
}

function create_UUID(){
  var d = new Date();
  var dateString = addZero(d.getSeconds());
  var uuid = '10000x'.replace(/[x]/g, function(c) {
      var r = dateString + Math.floor((Math.random() * 100) + 1);
      return r;
  });
  return uuid;
}



module.exports = router;
