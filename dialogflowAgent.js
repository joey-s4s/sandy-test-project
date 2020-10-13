const { SessionsClient } = require('dialogflow');
const serviceAccount  = require('./private/credentialsDialogflow.json');

// An authorized sessions client
const authorizedSessionsClient = new SessionsClient({ credentials: serviceAccount });
// A Dialog Flow / Google Project ID:
const projectId = serviceAccount.project_id;

class DialogflowAgent {
    constructor(sessionId) {
        // Create a new session      
        this.sessionPath = authorizedSessionsClient.sessionPath(projectId, sessionId);                    
    }
    
     /**
     * Send a query to the Dialogflow agent, and return the query result.
     * @param {string} sentence The sentence sent to the dialogflow agent to which it will try and find a reponse.
     * @param {object} responses The return object from the Dialogflow API: a response from the agent to the sentence of the client.
     * @param {string} sessionId The socket identifier representing the unique identifier for this session.
     */
    async getResponseFromAgent(sentence) {    
        // Creating the request query.
        const request = {
            session: this.sessionPath,
            queryInput: {
                text: {
                    text: sentence,
                    languageCode: 'en-US',
                },
            },
        };
        try{
            // Send request query to the Dialogflow API - i.g. agent.
            const responses = await authorizedSessionsClient.detectIntent(request);        
            const result = responses[0].queryResult;         

            // Return response of the Dialogflow agent.
            return result.fulfillmentText;
        }    
        catch(error){
            console.log(error);
            return "It seems there has been an error. I apologize. It would be best if we start over this conversation."
        }
    }
}
module.exports = DialogflowAgent
