// returns a new html elemnt with specified type and attributes
function createElement(type, className = "", html = "") {     
    let item = document.createElement(type);
    if (className.length > 0){
        item.className = className;
    }
    item.innerHTML = html;
    return item;
}

// create a new html element and add it to the parent, with specified attributes
function createAndAppend(type, parent, className = "", html = "") {  
    let item = createElement(type, className, html);
    parent.append(item);
    // still return the item, because we than we can still add items to that
    return item;                                           
}

// create a new html element and add it to the parent, with specified attributes and contains an URL ("p", container, "", text);
function createAndAppendURL(type, parent, className = "", html = "") { 

    let trueParent = parent;
    let data = html.split(/\bhttps?:\/\/\S+/gi);

    let matches = html.match(/\bhttps?:\/\/\S+/gi);
    let numURL = 0;
    
    for (let i = 0; i < data.length; i++) {
            
        let item = createElement(type, className, data[i]);
        parent.append(item);
        trueParent = item;

        if(matches[numURL]){
            let url = document.createElement('a');
            url.href = matches[numURL];
            url.innerText = "Link";
            url.target = "_top"
            numURL++;
            trueParent.append(url);
        }

    }                                      
}

function getTime() {
    let datetime = new Date();
    return datetime.toLocaleTimeString().slice(0,5) + " " + datetime.toLocaleDateString();
}