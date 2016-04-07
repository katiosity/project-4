var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var expressJWT = require("express-jwt");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var cloudinary = require("cloudinary");
var Yelp = require("yelp");

var secret = process.env.SECRET;

var yelp = new Yelp({
	consumer_key: process.env.YELP_API_CONSUMER_KEY,
	consumer_secret: process.env.YELP_API_CONSUMER_SECRET,
	token: process.env.YELP_API_TOKEN,
	token_secret: process.env.YELP_API_TOKEN_SECRET
});

var mongoose = require("mongoose");
var User = require("./models/user");
var Place = require("./models/place");
var Review = require("./models/review");

mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/foodtakes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public/'));

app.use("/users", expressJWT({secret: secret}).unless({path: ["/users"], method: "post"}));

app.use("/users", require("./controllers/users"));
app.use("/places", require("./controllers/places"));
app.use("/auth", require("./controllers/auth"));
app.use("/reviews", require("./controllers/reviews"));
app.use("/search", require("./controllers/search"));

app.get("/*", function(req, res) {
	res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(process.env.PORT || 3000);