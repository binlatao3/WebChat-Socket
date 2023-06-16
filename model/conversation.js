var mongoose = require('mongoose');

var conversation  = new mongoose.Schema({
    conversationId: String,
    member: Array,
    chats:[
        {
            messageId: String,
            sender: String,
            receiver: String,
            text: String,
            createAt: Date,
        }
    ],
    createAt: Date,
});

var Conversation = mongoose.model('Conversation', conversation);

module.exports = Conversation;