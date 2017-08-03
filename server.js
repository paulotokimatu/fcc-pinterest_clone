require('dotenv').config();
var express = require("express");
var app = express();
var routes = require("./routes/index.js");
var passport = require("passport");
var session = require('express-session');
var bodyParser = require("body-parser");
var path = require("path");

//This should appear before sessions
app.use(express.static(path.join(__dirname, 'client')));
app.set('view engine', 'ejs');

//Setting sessions and passport to work with auth
app.use(session({
  secret: 'k6DQVTf9AqsVhXR9N2ZX',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//Middleware to parse POST requests
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

app.listen((process.env.PORT || 8081), () => {
    console.log("Server up");
});