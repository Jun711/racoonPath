var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://jun711:jun711@ds131687.mlab.com:31687/parking', ['parkings']);

router.get('/bookings', function (req, res, next) {
  // res.send('BOOKINGS ROUTE');
  db.parkings.find(function (err, parkings) {
    if (err) {
      res.send(err);
    }
    res.json(parkings);
  })
});

router.post('/parkings', function (req, res, next) {
  var parking = req.body.data;

  if (!parking.userName) {
    res.status(400);
    res.json({
      error: 'Bad data'
    });
  } else {
    db.parkings.save(parking, function (err, savedParking) {
      if (err) {
        res.send(err);
      }
      res.json(savedParking);
    });
  }
})

module.exports = router;