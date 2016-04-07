var express = require('express');
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
  Place.find(function(err, places) {
    if (err) return res.send({message: 'Error - Could not find places'});
    res.send(places);
  });
});

router.post('/', function(req, res) {
    var place = new Place(req.body);

    Place.findOne({name: place.name}, function(err, existingPlace) {
        if (!existingPlace) {
            place.save(function(err) {
                if (err) return res.send({message: 'Error - Could not create place'});
                res.send(place);
            });
        } else {
            res.send({message: "Place exists"});
        }
    });
});

router.get('/:id', function(req, res) {
  Place.findById(req.params.id, function(err, place) {
    if (err) return res.send({message: 'No place found'});
    res.send(place);
  });
});

router.put('/:id', function(req, res) {
  Place.findById(req.params.id, function(err, place) {
    if (err) return res.send({message: 'No place found'});

    if (req.body.name) place.name = req.body.name;
    if (req.body.addressLine1) review.addressLine1 = req.body.addressLine1;
    if (req.body.addressLine2) review.addressLine2 = req.body.addressLine2;

    place.save(function(err) {
      if (err) return res.send({message: 'Error - Could not edit place'});
      res.send(place);
    });
  });
});

router.delete('/:id', function(req, res) {
  Place.remove({_id: req.params.id}, function(err) {
    if (err) return res.send({message: 'No place found'});
    res.send({message: 'Place deleted'});
  });
});

module.exports = router;
