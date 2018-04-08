var fs = require('fs')
var carData = require('./test');
const expect = require('chai').expect
var {assignRequestedCab, makeTheCabAvailable} = require('../common/cabOperations')

describe('Cab Operations', () => {

  it('calculate minimum distance for cab and book Pink Color Cab for trip', () => {
    var bookingCarDetails = {carColor:"PINK",locX:"10",locY:"20"}
    var returnCarData = assignRequestedCab(bookingCarDetails,carData);
    expect(returnCarData.carData[returnCarData.carId].isAvailable).to.equal("N");
  })

  it('calculate minimum distance for cab and book White Color Cab for trip after that release that cab', () => {
    var bookingCarDetails = {carColor:"WHITE",locX:"10",locY:"20"}
    var returnCarData = assignRequestedCab(bookingCarDetails,carData);
    expect(returnCarData.carData[returnCarData.carId].isAvailable).to.equal("N");
    var releaseCarDetails = {carID:2,locX:"30",locY:"40"}
    var releaseCabData = makeTheCabAvailable(releaseCarDetails,carData);
    expect(releaseCabData.carData[2].isAvailable).to.equal("Y");
  })

  it('calculate minimum distance for cab and book Black Color Cab for trip after that release that cab', () => {
    var bookingCarDetails = {carColor:"BLACK",locX:"10",locY:"20"}
    var returnCarData = assignRequestedCab(bookingCarDetails,carData);
    expect(returnCarData.carData[returnCarData.carId].isAvailable).to.equal("N");
  })
})