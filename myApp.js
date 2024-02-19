let express = require('express');
let app = express();

// Question 1, print "Hello World" in the console
console.log("Hello World");

// Question 2, serving the string "Hello Express" to get requests
    /* -> app.get() <- this sets up a route handler for HTTP GET requests
        -> This binds a function to a specific HTTP GET request for a particular route 
        -> If an HTTP request is made to that route, this is the code that tells us to run the function 
        -> When this route is called, get this function 
    -> (req, res) => { ... }:
        -> We are telling it which function we want to run 
        -> This is an arrow function 
        -> req and res are objects
        -> req <- an object representing the HTTP request 
        -> res <- an object representing the HTTP response 
    -> res.send("Hello Express"); <- we are sending the response back to the client 	
        -> We have the client and we have the server
    -> When a user makes a get request to that server, it responds with the string "Hello Express"	
        -> Handling HTTP requests for specific routes in Express applications
*/

app.get('/', (req, res) => {
    res.send("Hello Express");
});

// Question 3, serving static assets
/*
    About the code in this question: 
        -> The first line in this section sets up a route handler for HTTP GET requests
        -> This is the same as in the previous question 
        -> Instead of sending a string, we are sending a file 
        -> The file we are sending is stored on the server (not the user's side)
        -> This is the index.html file which this line of code gives the path to 

    -> app.get <- the first line of code sets up a route handler 	
        -> Get requests are made to the root URL
        -> This route handler is telling the server what should happen when these requests are made 

    -> (req, res) => 
        -> This is an arrow function which takes req and res
        -> Req is an object which represents the HTTP request
        -> Res is an object representing the HTTP response 
    -> res.sendFile(__dirname + "/views/index.html");:
        -> This is used to send a file in the response 
        -> __dirname M- <- this is a global variable in Node.js 
            -> This represents the current working directory of the script 
            -> This is used to construct the absolute path to the index.html file 	
        -> The html file which is held in this directory is being served -> this is what the user sees 
*/

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});
  



 module.exports = app;
