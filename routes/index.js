var express = require('express');
var router = express.Router();
var fs = require('fs');

var {getMinDistanceCab, endTheTrip, getCarDetails} = require('../common/cabOperations')

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/car-list', function(req, res, next) {
  getCarDetails(carData => res.send(carData))
});

router.post('/cab-request', function(req, res, next) {
  getMinDistanceCab(req.body, (carData, carId, carList)=>{
    res.send({
        availabilityStatus : carId !== -1 ? "CAR ASSIGNED" : "NO CARS AVAILBLE",
        assignedCarDetails : carId !== -1 ? carData[carId] : {},
        carList
    });
  })
});

router.post('/end-trip', function(req, res, next) {
  endTheTrip(req.body, (carList)=>{
    res.send({
      carList
    })
  })
});


module.exports = router;