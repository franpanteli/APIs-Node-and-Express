let express = require('express');
let app = express();

// Question 1, print "Hello World" in the console
console.log("Hello World");

// Question 2, 
app.get('/', (req, res) => {
    res.send("Hello Express");
});


 module.exports = app;
