const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);

const socketManager = require('./socketManager');
socketManager.initialize(server);
const fulfillmentManager = require('./fulfillmentManager');

const port = process.env.PORT || 3000;

app.set('view engine', 'pug'); //Specify and load view engine
app.set('views', path.join(__dirname, 'views')); //Declare views folder
app.use(express.static(path.join(__dirname, 'public'))); //Declare public folder
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.json()); // Parse JSON bodies (as sent by API clients)

// Renders Sandy's chat interface.
app.get('/', (req, res, next) =>{    
    res.render('chatInterface');    
});

//Google dialog flow makes post requests to the server.
app.post('/', async function (request, response) {  
  console.log('Dialog Flow posted a request to this server in order to fulfill text... ');
  fulfillmentManager.fulfill(request, response);
});

server.listen(port, () => {
    console.log('listening on => '+port);    
});


