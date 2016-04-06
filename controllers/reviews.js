var express = require('express');
var Review = require('../models/review');
var router = express.Router();

router.get('/', function(req, res) {
  Review.find(function(err, reviews) {
    if (err) return res.send({message: 'Error - Could not find reviews'});
    res.send(reviews);
  });
});

router.post('/', function(req, res) {
  var review = new Review(req.body);
  review.save(function(err) {
    if (err) return res.send({message: 'Error - Could not create review'});
    res.send(review);
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
