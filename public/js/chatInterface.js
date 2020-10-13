var socket = undefined;

$(function () {
    //const deployAddress = "https://test-sandy-chatbot.azurewebsites.net/";
    const localHost = 'http://localhost:3000/';
    socket = io.connect(localHost);

    socket.on('connect', () => {

        //Send fist message
        let firstMessage = "Hello, I'm Sandy, your virtual assistant, I am still learning, but I will do my best to help you! ";
        firstMessage += "In case you want to ask me something, please tell me you have a question.";      
        createServerMessage("Sandy", "images/sandy.png", firstMessage);


        socket.on("sendMessage", (data) => {
            createServerMessage(data.user.name, data.user.avatar, data.message)
        })
    })
})

function trySubmitUserText(event) {
    if (event.keyCode == 13) {
        submitUserText()
    }
}

function submitUserText() {
    if(socket == undefined){

        return
    }

    let inputField = document.getElementById('messageInput')
    let message = inputField.value
    if (message.trim() == "") {
        return
    }
    inputField.value = ""
    createUserMessage(message)
    socket.emit('sendMessage-' + socket.id, {message: message})
}

function createUserMessage(text) {
    let messagesList = document.getElementById("messagesList");
    let msgBox = createAndAppend("div", messagesList, "user_msg");
    let msg = createAndAppend("div", msgBox, "sent_msg");
    fillMessage(msg, "You", text, "right");
}

function createServerMessage(name, avatar, text) {
    let messagesList = document.getElementById("messagesList");
    if (text.indexOf("Hello, I'm Sandy, your virtual assistant, I am still learning, but I will do my best to help you!") > -1 
        && messagesList.querySelector("p") !== null){
        return;
    }
    let msgBox = createAndAppend("div", messagesList, "sandy_incoming_msg");
    let img_div = createAndAppend("div", msgBox, "sandy_msg_img");
    let img = createAndAppend("img", img_div);
    img.src = avatar;
    img.alt = "avatar";

    let msg = createAndAppend("div", msgBox, "sandy_msg");
    let msg_withd = createAndAppend("div", msg, "sandy_withd_msg");


    var matches = text.match(/\bhttps?:\/\/\S+/gi);
    if(matches!==null && matches.length>0){
        fillMessageURL(msg_withd, name, text, "left");
    }else{
        fillMessage(msg_withd, name, text, "left");
    }    
}

function fillMessage(container, name, text, side) {
    createAndAppend("span", container, "date_time text-" + side, "<b>" + name + "</b> " + getTime());
    createAndAppend("p", container, "", text);
    let messagesList = document.getElementById("messagesList")
    messagesList.parentElement.scrollTop = messagesList.parentElement.scrollHeight;
}

function fillMessageURL(container, name, text, side) {
    createAndAppend("span", container, "date_time text-" + side, "<b>" + name + "</b> " + getTime());
    createAndAppendURL("p", container, "", text);
    let messagesList = document.getElementById("messagesList")
    messagesList.parentElement.scrollTop = messagesList.parentElement.scrollHeight;
}
