var express = require('express');
var router = express.Router();
var fs = require('fs');

var {getMinDistanceCab, endTheTrip} = require('../common/cabOperations')

router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/cab-request', function(req, res, next) {
  getMinDistanceCab(req.body, (carData, carId)=>{
    res.send({
        availabilityStatus : carId !== -1 ? "CAR ASSIGNED" : "NO CARS AVAILBLE",
        assignedCarDetails : carId !== -1 ? carData[carId] : {}
    });
  })
});

router.post('/end-trip', function(req, res, next) {
  endTheTrip(req.body, ()=>{
    res.send("Trip Ended!!!")
  })
});


module.exports = router;
