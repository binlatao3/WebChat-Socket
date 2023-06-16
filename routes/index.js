var express = require('express');
var router = express.Router();
var Users = require('../model/user');
var Conversation = require('../model/conversation');
const io = require('../routes/socket')

io.on('connection', socket => {

    socket.emit('chat-message', 'Hello World')

    socket.on('send-chat-message', message => {

        socket.broadcast.emit('receive-chat-message',message)
        socket.emit('receive-last-message-sender',message)
        socket.broadcast.emit('receive-last-message-receiver',message)
    })

    socket.on('checked-chat-message', data =>{

        var friend = []
        Users.findOne({id:data.receiver},{ friends : 1,_id:0}).then(function (user)
        {
            if(user)
            {
                friend = user.friends
                // console.log(friend)
                var a = [];
                friend.map(e =>{
                    // console.log(e.friendId)
                    // console.log(data.receiver)
                    // console.log(data.sender)
                    if(e.friendId == data.sender)
                    {
                        a.push({
                            friendId: e.friendId,
                            textReceicer:{
                                bold:'normal',
                                color:'',
                            }
                        })
                    }
                    else
                    {
                        a.push({
                            friendId: e.friendId,
                            textReceicer:{
                                bold:e.textReceicer.bold,
                                color:e.textReceicer.color,
                            }
                        })
                    }
                })
                console.log("a 1: ",a)
                // console.log("list 1: ",list)
                Users.updateOne({id:data.receiver},{friends:a},function (err, user)
                {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        })
    })

    socket.on('sender-unchecked-chat-message',function(data){
        // console.log(data)
        // socket.broadcast.emit('sender-unchecked-chat-message', data)
        // socket.broadcast.emit('receiver-unchecked-chat-message', data)
    })

    socket.on('unchecked-chat-message', data =>{
        // console.log(data)
        var friend = []

        Users.find({id:{$ne:data.sender}}).then(function (user)
        {
            var arr = user.map(u =>{
                friend.push({
                    friendId: u.id,
                    fullname: u.fullname,
                    friends:u.friends
                })
            })

            Users.exists({id:data.sender,'friends.friendId':data.receiver},{ friends : 1,_id:0},function (err, user)
            {
                if (err) {
                    console.log(err)
                }
                else
                {
                    if(user)
                    {
                        Users.find({id:data.receiver},{ friends : 1,_id:0},function (err, user)
                        {
                            if (err) {
                                console.log(err)
                            }
                            else
                            {
                                var a = [];
                                var list = []
                                friend.map(e =>{
                                    if(e.friendId == data.receiver)
                                    {
                                        a.push({
                                            friendId: data.sender,
                                            textReceicer:{
                                                bold:'bold',
                                                color:'black',
                                            }
                                        })
                                        list.push({
                                            friendId: e.friendId,
                                            textReceicer:{
                                                bold:'normal',
                                                color:'',
                                            }
                                        })
                                    }
                                })
                                console.log("a 2: ",a)
                                console.log("list 2: ",list)
                                Users.updateOne({id:data.sender,"friends.friendId": list[0].friendId},{ $set: { "friends.$.textReceicer": list[0].textReceicer }},function (err, user)
                                {
                                    if (err) {
                                        console.log(err)
                                    }
                                    else
                                    {
                                         Users.updateOne({id:data.receiver,"friends.friendId": a[0].friendId},{ $set: { "friends.$.textReceicer": a[0].textReceicer }},function (err, user)
                                        {
                                            if (err) {
                                                console.log(err)
                                            }
                                            else {
                                                console.log("Both users updated successfully");
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                    else
                    {
                        var a = []
                        var list = []
                        friend.map(e =>{
                            if(e.friendId == data.receiver)
                            {
                                a.push({
                                    friendId: data.sender,
                                    textReceicer:{
                                        bold:'bold',
                                        color:'black',
                                    }
                                })
                                list.push({
                                    friendId: e.friendId,
                                    textReceicer:{
                                        bold:'normal',
                                        color:'',
                                    }
                                })
                            }
                        })
                        console.log("a 3: ",a)
                        console.log("list 3: ",list)
                        Users.updateOne({id:data.receiver}, {$addToSet:{friends:a[0]}},function (err, user)
                        {
                            if (err) {
                                console.log(err)
                            }
                            else
                            {
                                 Users.updateOne({id:data.sender},{$addToSet:{friends:list[0]}},function (err, user)
                                {
                                    if (err) {
                                        console.log(err)
                                    }
                                    else {
                                        console.log("Both users updated successfully");
                                    }
                                })
                            }
                        })
                    }
                }
            })
        })
    })

})

// socket.on('checked-chat-message', data =>{

//     Users.findOne({id:data.receiver}).then(function (user)
//     {
//         var a = [];
//         a.push({
//             friendId: data.sender,
//             textReceicer:{
//                 bold:'normal',
//                 color:'',
//             }
//         })
//         Users.updateMany({id:data.receiver},{ $set: { friends : a  }},function (err, user)
//         {
//             if (err) {
//                 return next(err)
//             }
//         })
//     })
// })

// socket.on('sender-unchecked-chat-message',function(data){
//     // console.log(data)
//     // socket.broadcast.emit('sender-unchecked-chat-message', data)
//     // socket.broadcast.emit('receiver-unchecked-chat-message', data)
// })

// socket.on('unchecked-chat-message', data =>{

//     Users.find({id:data.receiver}).then(function (user)
//     {
//         if(user)
//         {
//             var a = [];
//             var arr = user.map(e=>{
//                 a.push({
//                     friendId: data.sender,
//                     textReceicer:{
//                         bold:'bold',
//                         color:'black',
//                     }
//                 })
//             })

//             Users.updateMany({id:data.receiver},{friends:a},function (err, user)
//             {
//                 if (err) {
//                     return next(err)
//                 }
//             })
//         }
//     })
// })

/* GET home page. */
router.get('/', function(req, res, next) {
    if(!req.session.user){
        res.redirect('../login')
    }else{
        

        var users = {};
        var friend = [];
        var sorteByDate = []
        
        Users.findOne({id:req.session.user}).then(function (your)
        {
            users = {
                id: your.id,
                fullname: your.fullname,
                friends:your.friends
            }

            Users.find({id:{$ne: your.id}}).then(function (user)
            {
                var arr = user.map(u => {
                    friend.push({
                        friendId: u.id,
                        fullname: u.fullname,
                    })
                })
  
                var arrfr = [];
                var promises = friend.map(u => {
                    var date = new Date();
                    var exist = false;
                    return new Promise((resolve, reject) => {
                        Users.exists({ id: u.friendId }, function(err, conv) {
                            if (err) {
                                reject(err);
                            } 
                            else 
                            {
                                Conversation.exists({ member: { $all: [your.id, u.friendId] } }, function(err, conv) {
                                if (err) {
                                    reject(err);
                                } else {
                                    if (!conv) {
                                    new Conversation({
                                        conversationId: create_UUID(),
                                        member: [your.id, u.friendId],
                                        createAt: date.getTime()
                                    }).save();
                                    }
                                    resolve();
                                }
                                });
                            }
                            });
                        })
                        .then(() => {
                        return getLastestText(u, your.id);
                        })
                        .then(data => {
                        if (data) {
                            data.forEach(e => {
                            if (u.friendId === e.friendId) {
                                Object.assign(u, {
                                text: e.text,
                                sender: e.sender,
                                createAt: e.createAt
                                });
                                arrfr.push(u);
                            }
                            });
                        }
                        })
                        .catch(err => {
                        console.log(err);
                        });
                });

                Promise.all(promises)
                .then(() => {
                    Users.find({id:your.id}).then(function (fr)
                    {
                        if(fr)
                        {
                            sorteByDate = arrfr.slice().sort((a, b) => b.createAt - a.createAt) 
                            var time = ''
                            for(i = 0;i < fr.length;i++)
                            {
                                for(j = 0;j < fr[i].friends.length;j++)
                                {
                                    sorteByDate.map(a =>{
                                        if(fr[i].friends[j].friendId == a.friendId)
                                        {
                                            Object.assign(a,{
                                                time:time,
                                                bold:fr[i].friends[j].textReceicer.bold,
                                                color:fr[i].friends[j].textReceicer.color,
                                            })
                                        }
                                    })
                                }
                            }
                            sorteByDate.map(a =>{
                                if(a.createAt)
                                {
                                    var dateText = new Date(getTime(a.createAt))
                                    var nowDate = new Date(getTime())
                                    var diffMs = (nowDate - dateText);
                                    var diffDays = Math.floor(diffMs / 86400000); // days
                                    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
                                    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
                                    var diffSecs = Math.round((nowDate - dateText)) / 1000
                                    
                                    if(diffSecs >= 0 && diffMins == 0)
                                    {
                                        time = 'now'
                                    }
                                    else if(diffMins >= 1 && diffHrs == 0)
                                    {
                                        time = diffMins + 'm'
                                    }
                                    else if(diffHrs >= 1 && diffDays == 0)
                                    {
                                        time = diffHrs + 'h'
                                    }
                                    else if(diffHrs > 24)
                                    {
                                        time = diffDays + 'd'
                                    }
                                    Object.assign(a,{
                                        time:time,
                                        rawDate: new Date(a.createAt).getTime()
                                    })
                                }
                            })
                            res.render('index', { 
                                title: 'Chat',
                                users: users,
                                friend: sorteByDate
                            });
                        }
                    })
                })
                .catch(err => {
                    console.log(err);
                });
            })
        })
    }
});

async function getLastestText(receiver, userId) {
    let arr = []
    try {
        const conv =  await Conversation.findOne({
            member: { $all: [receiver.friendId, userId] }
            })
            .sort({ createAt: -1 })
            .exec();
        if (conv) {
            if (conv.chats && conv.chats.length > 0) {
                const lastChat = conv.chats[conv.chats.length - 1];
                Object.assign(receiver, { text: lastChat.text,sender:lastChat.sender,createAt: lastChat.createAt});
            } else {
                Object.assign(receiver, { text: '' });
            }
        } else {
            Object.assign(receiver, { text: '' });
        }
    arr.push(receiver)
    } catch (err) {
        console.error(err);
        throw err;
    }
    return arr
}



router.get('/api', function(req, res, next) {
    if(!req.session.user){
        res.redirect('../login')
    }else{
        var text = []

        Conversation.find({member:{$in:[req.session.user]}},function (err, conv)
        {
            var friendChat = []
            if(err)
            {
                return next(err)
            }
            else
            {
                conv.forEach(conversation => {
                    conversation.chats.forEach(chat => {
                        text.push({
                        id: chat.messageId,
                        sender: chat.sender,
                        receiver: chat.receiver,
                        message: chat.text,
                        createAt: chat.createAt
                        });
                    });
                });
        
                res.json({
                    text: text
                });
            }
        })
    }
});

router.post('/', function(req, res, next) {
    if(!req.session.user){
        res.redirect('../login')
    }else{
        Conversation.findOne({member:{$all:[req.session.user,req.body.friend]}},function (err, conv)
        {
            if(err)
            {
                return next(err)
            }
            else
            {
                if(conv)
                {
                    var date = new Date()
                    var chat = [{
                        messageId: create_UUID(),
                        sender: req.session.user,
                        receiver: req.body.friend,
                        text: req.body.mytext,
                        createAt: date.getTime()
                    }]
                    Conversation.updateOne({member:{$all:[req.session.user,req.body.friend]}},{$push:{"chats":chat}},function (err, user)
                    {
                        if (err) {
                            console.log(err)
                        }
                    })
                }
            }
        })
        if(req.body.mytext !== '')
        {
            var date = new Date()
            res.send({
                mytext: req.body.mytext,
                receiver:req.body.friend,
                sender:req.session.user,
                createAt: date.getTime()
            });
        }
    }
});

function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
}

function create_UUID(){
    var d = new Date();
    var dateString = addZero(d.getSeconds());
    var uuid = 'Chatx'.replace(/[x]/g, function(c) {
        var r = dateString + Math.floor((Math.random() * 100000) + 100000);
        return r;
    });
    return uuid;
}

function getTime(date)
{
    if(date)
    {
        var today = new Date(date);
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
        return date + ' '+ time
    }
    else
    {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
        return date + ' '+ time
    }
}


module.exports = router;
