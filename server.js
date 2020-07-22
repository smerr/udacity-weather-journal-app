// Setup empty JS object to act as endpoint for all routes
const data = [];

// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));
const port = 8000;

// Spin up the server
const server = app.listen(port, listening);

// Callback to debug
function listening() {
  console.log(`running on localhost: ${port}`);
}

// Post Route

app.post("/add", addData);

function addData(req, res) {
  data.push(req.body);
  res.json(data);
}
// Initialize all route with a callback function
// Callback function to complete GET '/all'
app.get("/all", sendData);

function sendData(req, res) {
  let lastPost = data[data.length - 1];
  res.send(lastPost);
}
