var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var constants = require('../util/constants');

var db = mongojs(constants.DB_PARKING, ['contactInfo']);

router.get('/contactInfo', function (req, res) {
  db.contactInfo.find(function (err, contactInfo) {
    if (err) {
      res.send(err);
    } else {
      res.json(contactInfo);
    }
  })
});

module.exports = router;