var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var expressJWT = require("express-jwt");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

var secret = process.env.SECRET;

var mongoose = require("mongoose");
var User = require("./models/user");
mongoose.connect("mongodb://localhost/foodtakes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public/'));

app.use("/users", expressJWT({secret: secret}).unless({path: ["/users"], method: "post"}));

app.use("/users", require("./controllers/users"));
app.use("/auth", require("./controllers/auth"));

app.get("/*", function(req, res) {
	res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(3000);