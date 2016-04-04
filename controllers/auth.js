var express = require('express');
var User = require('../models/user');
var jwt = require("jsonwebtoken");
var router = express.Router();

var secret = process.env.SECRET;

router.post("/", function(req, res) {
	User.findOne(
		{
			email: req.body.email
		},
		function(err, user) {
			if (err || !user) {
				res.send({ message: "Invalid user" });
			} else {
				user.authenticated(req.body.password, function(err, result) {
					if (err || !result) {
						res.send({ message: "Invalid password" });
					} else {
						var token = jwt.sign(user, secret);
						res.send({
							user: user,
							token: token
						});
					}	
				});
			}
		}
	);
});

module.exports = router;
