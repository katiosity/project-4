var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var expressJWT = require("express-jwt");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

// var mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/foodtakes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public/'));

app.get("/*", function(req, res) {
	res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(3000);