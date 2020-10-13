const DialogflowAgent = require('./dialogflowAgent');

class Client {
    constructor(socket){        
        this.socket = socket;
        this.ipAddress = socket.handshake.address;
        this.conversation = [];
        this.dialogflowAgent = new DialogflowAgent(socket.id);             
    }    
}

module.exports = Client;