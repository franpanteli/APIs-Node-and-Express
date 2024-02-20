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

// Question 7, chaining middleware to create a time server
/* 
	-> We are using the app.get method 
		-> We are doing this because we want to retrieve the time (a piece of information which we want to return to the user in this block of code)
		-> This is part of route handling for the HTTP GET request method 
		-> This is on the "now" URL path 
	-> The first block of code  
		-> This logs the time when the request from the user was made
			-> We are converting that data and time into a string 
			-> This is a timestamp 
		-> We are storing this time in a variable 
		-> Then moving onto the next set of instructions in that block of code 
	-> The next block of code 
		-> This sends back the value of the time to the user 
		-> This is the time stored in the variable for the first block of code 
		-> This is a middleware function in the chain -> we are chaining functions together (like running a list of cells in an ipynb file all one after the other, 'run all')
		-> This is sending a JSON back to the client -> the client being the user
		-> We have the user side, and the server side 
	-> We have chained two middleware functions 
		-> req <- for the request HTTP object
		-> res <- for the response HTTP object 
		-> next <- this passes the control to the next middleware in the stack when called 
		-> The client makes a request
		-> Then the server stores the time in a timestamp using the first middleware function 
		-> Then the second middleware function returns (sends) this back to the client 	
		-> This is done in the form of a JSON response -> a js object which contains data in a string 
*/

app.get(
    "/now",
    (req, res, next) => {
      req.time = new Date().toString();
      next();
    },
    (req, res) => {
      res.send({
        time: req.time
      });
    }
  );

//  Question 8, getting a route parameter input from the client
/* 
	-> We are using app.get <- this method returns information to the client (it 'gets' the information)
		-> This sets up a route for handling HTTP GET requests 
		-> With the :word parameter in the URL
	-> At the directory on the server /:word/echo
		-> :word is a placeholder
	-> And it has request and response objects 
		-> res and req 
		-> This is the route handler function which gets executed when the GET request matches the route at the URL in the request 
	-> We set a variable  
		-> This variable is called word 
		-> The value this variable stores is the same as the parameters we require
		-> The 'word' this uses is the same as the 'word' in the path argument which the function takes 
		->  req.params returns the values of route parameters 
	-> We return the JSON object
		-> We then return the value of the constant which is stored in the variable called word which we set above it 
		-> This sends a JSON response back to the client 
		-> We are echoing back the value of the word parameter
		-> The word parameter is the one which was set in the variable above it 
		-> The value which was set equal to that parameter was the same one as in the path to the request object 
*/

app.get("/:word/echo", (req, res) => {
    const { word } = req.params;
    res.json({
      echo: word
    });
});

// Question 9, get query parameter input from the client
/* 
	-> We are using the app.get method to retrieve information 
	-> The req and res (request and response) objects
	-> The first two lines inside this request are setting the values of variables 
		-> The first is the firstName 
			-> This is for the first name stored in the request query 
		-> The second is for the last name 
			-> This is stored in the request query
			-> The request query is for the first and last name of the person 
	-> We then set the response query 
		-> This is the string that we want the server request to respond with 
		-> The server will send the client a JSON object -> this object stores the string which we are setting in this block of code 
		-> The string which this returns equals name -> the values contained there are the same as in the variables which were defined above
		-> Those values were obtained from the argument of the app.get method 
	-> In more technical terms 
		-> this sets an Express route for handling HTTP GET requests to this path 
		-> When the GET request matches the route -> then this route handler function gets executed
		-> This takes the request object (req) and gives a res (response) object 
		-> The query parameters which are stored in the variables are included in the URL after the "?" parameter
			-> e.g in the URL "/name?first=John&last=Doe" <- req.query.first is "John" and req.query.last is "Doe" (syntax)
		-> The response this sends back to the client is a JSON response	
		-> This contains the property "name"
		-> This allows you to take a URL and return the name which it is associated with, based on the syntax above 
*/

app.get("/name", (req, res) => {
    let firstName = req.query.first;
    let lastName = req.query.last;
    res.json({
      name: `${firstName} ${lastName}`
    });
});

// Question 10, using body-parser to Parse POST Requests
/*
	This code at first glance:
		-> We are setting the values of three different variables 
			-> The first two variables are importing Express and enabling us to use body-parser and the third is setting up an Express app 
		-> app.use <- we are calling on the use method to use bodyParser 
			-> This turns off the extended attribute 
		-> We are finally using bodyParser.json 

	-> In more technical terms: 
		-> This sets up an Express.js application with body-parser middleware
		-> This handles incoming data in the request body 
		-> The first two lines are importing the modules 
			-> 'Express' <- the Express.js framework 
			-> 'body-parser' <- this imports the body-parser middleware 
				-> This is used to parse the request body 
		-> The third const line <- sets up the Express application 
			-> This creates an instance of an Express application 
			-> This handles incoming HTTP requests
			-> The first two const's are module imports and the third sets up an Express application 
		-> Configuring the Express application 
			-> The third constant line set up the Express application and the first two imported the modules for this 
			-> This section of code is configuring this application 
			-> We are configuring this application to use the body-parser middleware for parsing URL-encoded data in the request body 
			-> The extended: false option <- this means that the library uses the Node.js builtin `query string` module to parse the data 
		-> Configuring the body-parser for JSON data
			-> This is the app.use method 
			-> This configures the body-parser middleware for parsing JSON data in the request body 
		-> These are two confirmations 
			-> These allow the Express application to handle different types of data in the request body 
			-> This is used for processing form submissions <- URL-encoded data
			-> This can also be used for handling JSON data sent in the request body 
			-> Parsed data is available for route handlers through 'req.body'
*/

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

// Question 11, using body-parser to Parse POST Requests
  
// Below - this line of code is as part of the tests from the project boilerplate code
 module.exports = app;
