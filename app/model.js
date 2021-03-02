// {
//     property: 'value'
// } // annonymous object 

module.exports.Conversation = class Conversation {
    constructor(users, messages) {
        if (!users) throw new Error('missing users')
        if (users && users.length != 2) throw new Error('conversations needs exactly 2 users')

        this.users = users;
        this.messages = messages || [];
    }
}

// new Message(..,..)
module.exports.Message = class Message {
    constructor(username, content) {
        this.username = username;
        this.content = content;
        this.timestamp = Math.floor((new Date()).getTime() / 1000) // Unixtimestamp
    }
}



// it is like:
// newMessage(..,..)
// module.exports.newMessage = function (sender, message) {
//     return {
//         username: sender,
//         message: message,
//         timestamp: Math.floor((new Date()).getTime() / 1000) // Unixtimestamp
//     }
// }





