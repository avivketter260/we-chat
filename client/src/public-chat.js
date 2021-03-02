function generateRandomColor() {
    randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
    return randomColor;
}


// private: const sendPublicMessage = ...
// public: document.sendPublicMessage = .... 
function sendPublicMessage() {
    const username = $("input[name='username']").val()
    const content = $("input[name='m']").val()
    $("#div-id #m").val('');
    $("#send-public-message").click(function () {
    })
    $.ajax({
        url: "http://localhost:3000/send-message?username=" + username + "&m=" + content + "",
        context: document.body
    }).done(function () {
    })
}


var userColor = {};
setInterval(function () {
    const username = $("input[name='username']").val()
    $.ajax({
        url: "http://localhost:3000/get-messages",
        context: document.body
    }).done(function (messages) {

        var html = '';
        let privateMessageIcon;
        for (const message of messages) {

            const sender = message.username;


            if (userColor[sender] === undefined) {
                userColor[sender] = generateRandomColor();
            }
            // icon disappear for the user who login
            if (!(username === sender)) {
                privateMessageIcon = "<img id='private-Message-icon'  src='message-icon.png'>";

            } else privateMessageIcon = "<img id='private-Message-icon'  src='message-icon.png' style='visibility: hidden;'>";

            html += "<b onclick='onPrivateMessageRequested(\"" + sender + "\")' " + "style='color: " + userColor[sender] + "'>" + sender + "" + privateMessageIcon + " </b>" + "  <br>" + message.content + "<br>";
            $('#content').html(html);


        }
    });
}, 1000);