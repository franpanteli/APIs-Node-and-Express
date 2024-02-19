// Below - this line of code was added in for question 5, to add environment variables into the project 
require('dotenv').config()

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
  
// Question 4, serving a json file on a specific route 
/*
    -> We are using the same app.get method as in the previous question 
    -> We are using the res.json method to send the string "Hello json"
        -> This is the data 
        -> The key is "message"
        -> We are serving this as a response to GET requests to the /route 
        -> This is being served in JSON format 
    -> The first line sets up the route handler for HTTP GET requests to the /json URL path 
        -> URLs are paths on servers (not client side)
        -> We are telling it what will happen when requests are made to this path 
    -> The arrow function 
        -> req <- the request
        -> res <- the response
    -> Inside the arrow function 
        -> res.json <- send a JSON response to the client 
        -> This has a key-value pair 
        -> The server responds to a call with this 
        -> The response is a JSON object -> which contains the string we are responding with 
*/    

app.get('/json', (req, res) => {
  res.json({
    "message": "Hello json"
  });
});

// Question 5, the .env file 
/*
    -> An env file was created in the project directory for this question 
    -> The response for this entire question is inside a app.get method
        -> This sets up a route handler for HTTP GET requests
        -> This defines what should happen when a GET request is made to the "/json" endpoint 
    -> This is again using the same path as in the previous question ("/json")
    -> In the previous question, we just returned a string based on whether this was called or not 
    -> This function returns this string in upper case if the content of the .env file has been interacted with 
    -> We are writing a function which says 
        -> When this server is interacted with 
        -> Respond with this message
        -> If else -> respond with that string in uppercase 
        -> Return that string, and in JSON format  
    -> The arrow function 
        -> req <- this is the object representing the HTTP request 
        -> res <- this is the object representing the HTTP response 
    -> var response 
        -> This sets the value of the variable equal to the JSON object which we would otherwise want to return 
    -> The if condition 
        -> We then check if the variable stored inside the .env file for this question is uppercase
        -> If it is uppercase, we modify the message property of the 'response' object 
        -> We are doing this using the .toUpperCase() method 
    -> process.env
        -> This is how the environment variable is accessed
        -> We have a variable stored in the .env file -> and we are saying if its value is this, then return this for .get requests
        -> The server is responding with this response object 
        -> This response is either the string or an uppercase version of it  
*/

app.get("/json", (req, res) => {
    var response = { "message": "Hello json" };
  
    if (process.env.MESSAGE_STYLE === "uppercase") {
      response.message = response.message.toUpperCase();
    }
  
    res.json(response);
});

// Question 6, implementing a root-level request logger middleware
/* 
    -> We are using the app.use method
        -> This registers a middleware function 
        -> These have access to the request and response objects 
        -> They are functions which we are running while requests are being sent to the server 
        -> These are run in a stack (e.g 'full-stack' developer)
    -> The argument to this is middleware
        -> Instead of just req and res, we also have next as an augment to this 
        -> Then we are defining a variable in js syntax 
        -> This variable stores the string in the same syntax as in the question 
            -> This contains information about the incoming request
            -> This concatenates the HTTP method, request path and client's IP address
            -> req.method <- this is the HTTP method used in the request 
            -> req.path <- the path part of the URL requested
            -> req.ip M- the IP of the client making the request  	
        -> We then log the result of this 
        -> next() is then telling the server to move onto the next function -> to avoid getting stuck on this one 
            -> It's like when you break a loop in Python
            -> We are passing the route-handler process onto the next route-handler 
            -> Or to the next middleware in the pipeline 
    -> The function middleware(req, res, next)
        -> This defines the middleware function 
        -> The request and response objects
        -> Next is a function that passes control to the next middleware in the stack 
        -> If it's not called, then the request-handling stops here
*/

app.use(function middleware(req, res, next) {
    let string = req.method + " " + req.path + " - " + req.ip;
    console.log(string);
    next();
  });

// Question 7, 

// Below - this line of code is as part of the tests from the project boilerplate code
 module.exports = app;
