const socketAPI = require('socket.io');

const Client = require('./client');

const connectedClients = {};

// Initializes the connection between the server and the socket manager
const initializeIO = (server) =>{
    const io = socketAPI(server);

    // Event that is fired each time a new connection is established between a client and this server.    
    io.on('connection', (socket) => {           
        connectedClients[socket.id] = new Client(socket);
        console.log("FIRST CREATED SOCKET ID => ", socket.id);
        // Event that is fired each time the client sends a message to Sandy in the chat interface.
        socket.on('sendMessage-' + socket.id, async (data) => {
            const connectedClient = connectedClients[socket.id];                          
            const response = await connectedClient.dialogflowAgent.getResponseFromAgent(data.message);
            
            // Saves each message of the client and the response of Sandy.
            connectedClient.conversation.push('Client: ' + data.message);
            connectedClient.conversation.push('Sandy: ' + response);      
            
            // Sends out the response of the Dialogflow agent to Sandy's chat interface.
            socket.emit('sendMessage', {
                user: {name: "Sandy", avatar: "images/sandy.png"},
                message: response
            });
        });

        socket.on('disconnect', () => {            
            // DISCONNECT WITH SLACK
            // .. .. .. 
            removeConnectedClient(socket.id);
        });  
    });
};

const removeConnectedClient = (socketId) => {
    delete connectedClients[socketId];
};

const getConnectedClient = (socketId) => {
    return connectedClients[socketId];
};


module.exports.initialize = initializeIO;
module.exports.getConnectedClient = getConnectedClient;