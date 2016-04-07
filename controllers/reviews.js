var express = require('express');
var Review = require('../models/review');
var Place = require('../models/place');
var router = express.Router();
var Yelp = require("yelp");
var request = require("request");

var yelp = new Yelp({
  consumer_key: process.env.YELP_API_CONSUMER_KEY,
  consumer_secret: process.env.YELP_API_CONSUMER_SECRET,
  token: process.env.YELP_API_TOKEN,
  token_secret: process.env.YELP_API_TOKEN_SECRET
});

router.get('/', function(req, res) {
  Review.find(function(err, reviews) {
    if (err) return res.send({message: 'Error - Could not find reviews'});
    res.send(reviews);
  });
});

router.post('/', function(req, res) {
  console.log(req.body);
  console.log(req.user);
  var review = new Review(req.body.review);
  var place = new Place(req.body.place);
  Place.findOne({name: place.name}, function(err, existingPlace) {
    if (!existingPlace) {
      place.save(function(err) {
        if (err) return res.sendStatus(500);
        review.place = place._id;
        review.save();
        res.sendStatus(200)
      });
    } else {
      review.place = existingPlace._id;
      review.save(function(err) {
        if (err) return res.send({message: err})
        res.sendStatus(200);
      })
    }
  });
});

router.get('/:id', function(req, res) {
  Review.findById(req.params.id, function(err, review) {
    if (err) return res.send({message: 'No review found'});
    res.send(review);
  });
});

router.put('/:id', function(req, res) {
  Review.findById(req.params.id, function(err, review) {
    if (err) return res.send({message: 'No review found'});

    if (req.body.review) review.review = req.body.review;
    if (req.body.image) review.image = req.body.image;
    if (req.body.food) review.food = req.body.food;
    if (req.body.drinks) review.drinks = req.body.drinks;
    if (req.body.service) review.service = req.body.service;
    if (req.body.atmosphere) review.atmosphere = req.body.atmosphere;

    review.save(function(err) {
      if (err) return res.send({message: 'Error - Could not edit review'});
      res.send(review);
    });
  });
});

router.delete('/:id', function(req, res) {
  Review.remove({_id: req.params.id}, function(err) {
    if (err) return res.send({message: 'No review found'});
    res.send({message: 'Review deleted'});
  });
});

module.exports = router;
