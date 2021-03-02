function onPrivateMessageRequested(reciever) {
    const sender = $("#inbox #username").val();
    if (reciever === sender) return;
    intervalId(sender, reciever);
}

setInterval(function () {
    const username = $("input[name='username']").val();

    getPrivateMessages(username, undefined, function (conversations) {
        for (let conversation of conversations) {
            // the sender is the username of the last message in the conversation
            const sender = conversation.messages[conversation.messages.length - 1].username;
            if (sender === username) continue;
            if (stopHandlingMessagesFrom[sender]) continue;
            stopHandlingMessagesFrom[sender] = true; // TODO: move this line to showPrivate Window
            // Add name of username to the dropdown private messgae list.
            $(`<a id="${sender}" href="#">${sender}</a>`).appendTo(".dropdown .dropdown-content")
            $(".dropdown").show();
            // red = message not clicked / seen
            $(`.dropdown .dropdown-content #${sender}`).css("color", "red");
            $(`.dropdown .dropdown-content #${sender}`).click(function () {
                $(`.dropdown .dropdown-content #${sender}`).css("color", "green");
                intervalId(username, sender);

            })
            return;
        }
    });

}, 2000);

const stopHandlingMessagesFrom = {};

// bug : conversations bring only length of 1 
const renderConversations = function (conversations) {// bug : not all the converstions its here from the server always length ===1

    // TODO: why only the first? A= conversations its all the conv between all users and the last one thet push its in position 0

    let html = '';

    for (const message of conversations[0].messages) {
        const username = message.username;
        if (message.content === '') continue;
        html += "<b> " + username + " </b> says:" + "  <br>" + message.content + "<br>";
    }
    $(`.private-messages .private-message1`).html(html);
}




let refreshMessages;


function newConverstionWindow(him) {
    // create new div of message dynamically
    const newWindowDiv = `<div class="private-message1"></div>`;

    const divWindowHead = `<div class="head-line"><span class="close">X</span> <h1 class="add-reciver-name"></h1></div>`;

    const divWindowInput = `<div class="private-message-info">
    <input type="text" name="message" class="message1" required placeholder="Type your message...">
    <a class="click-send" type="submit">Send</a></div>`;

    // Add new div to html with headline for new converstion

    $(newWindowDiv).appendTo(".private-messages");

    $(divWindowHead).appendTo(`.private-messages-set`);

    $(divWindowInput).appendTo(`.head-line`);
    $(`.add-reciver-name`).html("Username: " + him);

}



const intervalId = function (me, him) {
    clearInterval(refreshMessages);
    // open new tab of converstion
    newConverstionWindow(him);

    getPrivateMessages(me, him, renderConversations);

    refreshMessages = setInterval(function () {
        getPrivateMessages(me, him, renderConversations);
    }, 1000);

    // send new message to the server 
    $(`.private-message-info .click-send`).click(function () {
        const message = $(`input[name="message"]`).val();
        $(".private-message-info .message1").val('');
        stopHandlingMessagesFrom[me] = false;
        sendPrivateMessage(me, him, message)
    });

    // close and remove the converstion div on click on X.

    $(`.private-messages-set .head-line .close`).click(function () {
        $(`.private-messages .private-message1`).remove();
        $(`.head-line`).remove();
    });

}

// services:

const sendPrivateMessage = function (sender, reciever, message, cb) {
    $.ajax({
        url: "http://127.0.0.1:3000/send-private-message?sender=" + sender + "&reciver=" + reciever + "&m=" + message,
        context: document.body
    }).done(function (...args) {
        if (cb) cb(...args);
        // TODO: find a way to pass all arguments regardless of the amount. as of now it passes only the first 4.
    });
}

const getPrivateMessages = function (user1, user2, cb) {

    let url = "http://localhost:3000/get-private-messages?user1=" + user1;

    if (user2) {
        url += "&user2=" + user2;
    }

    $.ajax({
        url: url,
        context: document.body
    }).done(function (conversations) {
        cb(conversations);
    })
}