
const convertConversationToHtml = (conversation) => {
    if (conversation && conversation.length > 0){
        let result = "<h3>New question from client: </h3><ul>";
        let i;
        for(i=0;i<conversation.length;i++){
            let message = "";
            let sender = "";
            if (conversation[i].indexOf('Client:')>-1){
                sender = "Client:";
            }
            else{
                sender = "Sandy:"
            }
            message = conversation[i].replace(sender, "");
            result += '<li style="margin-bottom:10px;"><b>' + sender + "</b>" + message + "</li>";
        }
        result += "</ul>";
        return result;
    }
    return "";
};

module.exports.convertConversationToHtml = convertConversationToHtml;