const {WebhookClient} = require('dialogflow-fulfillment');

const socketManager = require('./socketManager');
const nodemailer = require('./nodemailer');
const utilities = require('./utilities');

const getSocketIdFromAgent = (agent) => {
    const session = agent.request_.body.session;
    const socketId = session.split('sessions/')[1];
    return socketId;
}

// Intent Handlers

// Intent: All contact details collected, send this response to client after sending email to the backoffice.
const getContactDetailsHandler = (agent) =>{    
    const socketId = getSocketIdFromAgent(agent);
    const client = socketManager.getConnectedClient(socketId);
    const conversation = client.conversation;
    const emailHtmlContent = utilities.convertConversationToHtml(conversation);            
    nodemailer.sendEmail(emailHtmlContent);
    agent.add("Thank you! I have notified my colleagues and you will be contacted as quickly as possible.");    
};

// Prepare Intent Map:
const prepareIntentMap = () => {
    const intentMap = new Map();
    // Set the proper custom intent handler based on the Dialogflow intent name.
    intentMap.set('get-contact-details-phone-email', getContactDetailsHandler);    
    return intentMap;
};


// Export Method: Sends a response back to Dialogflow API. The mapped fulfillment text will be sent back
// to the client in the chat interface of Sandy.
const fulfill = (request, response) => {
    const agent = new WebhookClient({ request, response });            
    const intentMap = prepareIntentMap();
    try{
        agent.handleRequest(intentMap);
    }
    catch(error){
        console.log(error);
        // If an error occurs, then Dialogflow will resolve the fulfillment response with any of 
        // the pre-configured responses in the intent, in the Dialogflow interface.
    }    
};

exports.fulfill = fulfill;