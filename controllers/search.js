var express = require('express');
var router = express.Router();
var Yelp = require("yelp");
var request = require("request");

var yelp = new Yelp({
	consumer_key: process.env.YELP_API_CONSUMER_KEY,
	consumer_secret: process.env.YELP_API_CONSUMER_SECRET,
	token: process.env.YELP_API_TOKEN,
	token_secret: process.env.YELP_API_TOKEN_SECRET
});

router.post("/", function(req, res) {
	var name = req.body.name;
	var location = req.body.location;


	yelp.search({term: name, location: location})
	.then(function (data) {
		res.json(data);
	})
	.catch(function (err) {
		console.log(err);
	});
});

module.exports = router;