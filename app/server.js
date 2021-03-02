"use strict";
const cors = require('cors');
const express = require('express');
const app = express();
const Conversation = require('./model.js').Conversation;
const Message = require('./model.js').Message;

app.use(cors());


module.exports.setupRoutes = function () {
    app.listen(3000);
    console.log(':)')
    app.get('/get-messages', getMessages);
    app.get('/send-message', sendMessages);
    app.get('/send-private-message', sendPrivateMessage);
    app.get('/get-private-messages', getPrivateMessages);

}




function getMessages(req, res) {
    res.send(messages);
}

function sendMessages(req, res) {

    messages.push(new Message(req.query.username, req.query.m))
    res.status(200).send()
}


function getPrivateMessages(req, res) {
    const user1 = req.query.user1;
    const user2 = req.query.user2; // this is very optional
    const minTimestamp = req.query.minTimestamp // optional

    // in case 2 users are defined, get the messages thorugh conversationID like we did
// bug : some time user1 = null so i add &&user1 make sure its dosent heppend 
    if (user2 && user1) {

    
        const users = [user1, user2].sort()
        const conversationId = `${users[0]}+${users[1]}` //todo: sort is missing
        if (!privateMessages[conversationId]) { //bug: not sync with the send praivet message function
            privateMessages[conversationId] = new Conversation(users)
        }


        if (minTimestamp) {
            let filterMessage = privateMessages.filter((time) => {
            })
            privateMessages[conversationId][timestamp] = minTimestamp
        }


        return res.status(200).send([
            // TODO: filter messeges by minTimestamp
            privateMessages[conversationId]
        ]); 
    }


    // in case only one user is defined get the messages by searching the username inside the users array of each conversation
    const conversations = [];
    for (let key in privateMessages) {
        const conversation = privateMessages[key];
        let users = conversation.users;
        // maybe causes bugs ! 
        if (users[0] === user1 || users[1] === user1) {
            if (conversation.messages.length > 0) {
                conversations.push(conversation)
            }
        }

        // TODO: filter messeges by minTimestamp

    }
    return res.status(200).send(conversations);

}
function sendPrivateMessage(req, res) {
    const sender = req. query.sender;
    const reciver = req.query.reciver;
    const message = req.query.m;

    if (!sender || !reciver) {
        return res.status(400).send('missing sender or reciver!!');
    }
    
    if (message === '') return;  
    const users = [sender, reciver].sort()
    const conversationId = `${users[0]}+${users[1]}`;

    /*
    Alternative
        if(privateMessages[accessProperty])
        if(privateMessages.hasProperty(accessProperty))
        accessProperty in privateMessages
    */

    // If its the first message between these 2 users, create an empty object for them
    const firstMessage = !privateMessages[conversationId];

    if (firstMessage) {
        // getPrivateMessages create new conversation before this function = always false 
        privateMessages[conversationId] = new Conversation(users, message);
    }
    // bug: can make the worng conversationId
    const conversation = privateMessages[conversationId];
//TypeError: conversation.messages.push is not a function: i try to push a string to to message but message not array
    conversation.messages.push(new Message(sender, message));


    res.status(200).send();
}




// DATA:
// TODO: migrate this into another file

let messages = []
let privateMessages = {};


