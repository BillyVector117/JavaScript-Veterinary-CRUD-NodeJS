const express = require("express"); // Allows to set a server
const bodyParser = require("body-parser"); // Allows to read body
const mongoose = require("mongoose"); // Allows to make connection to mongoDB
const app = express(); // To use Express module.
require("dotenv").config(); // To load enviroment variables

// bodyParser settings: parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
const port = process.env.PORT || 3000; // Heroku set a PORT automatically, else use 3000 PORT

// ----------------Database connection (MongoDB)----------------

// Database connection using enviroment variables (enviroment variables are in Heroku and an .env File)
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.lyluq.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
// Database connection using mongoDB URI, URI as first Params, Setting object (Avoid Alerts/error logs in console) as second Params
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected succesfully!"))
  .catch((event) => console.log(event));

// Template Engine (ejs)
app.set("view engine", "ejs");
// Create Middleare, __dirname references to setting/main route
app.use(express.static(__dirname + "/public"));
// Note: res.send('text') is used in static pages (without template engine), .render('Textfile', {title:title}) IS ONLY used in template engines (ejs,pug,etc)

// API/Web routes --- // Routes allow modifications like:  ej. /api...
app.use("/", require("./router/myRoutes"));
app.use("/mascotas", require("./router/mascotas"));

// 404 PAGE - Middleware
app.use((req, res, next) => {
  res.status(404).render("error", {
    Title: "THIS IS ERROR 404 PAGE USING EJS",
    Descrp: "Description generated using ejs as template engine",
  });
});

// Server listener
app.listen(port, () => {
  console.log(`server listening on port ${port} !`);
});

/*
// Create Server without 'Express' framework (Vanilla NodeJS)
const http = require('http'); // Default NodeJS module
const server = http.createServer((req, res) => { // Create server
  res.end('Answer request v2') // Server response
})
const port = 3000; // PORT
// Server listener
server.listen(port, () =>{
  console.log(`Listening server on port ${port} !`)
}) // Nodemon (server watch), needs global installation
*/
