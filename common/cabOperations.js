var fs = require('fs')
var filePath = __dirname + '/data.json';
var calculateMinSquareDistance = require('./mathOperation')


function getMinDistanceCab(reqBody, callBack){ 
    readThenWriteBackInTheCarDataFile(reqBody, assignRequestedCab, callBack) 
}  

function endTheTrip(reqBody, callBack){
    readThenWriteBackInTheCarDataFile(reqBody, makeTheCabAvailable, callBack) 
}

function readThenWriteBackInTheCarDataFile(reqBody, carDataModifyingFunction, callBack){
  fs.readFile(filePath, 'utf8', (err, carData) => {
    if (err) {
      return console.log(err);
    }
    var carDataObj = carDataModifyingFunction(reqBody, JSON.parse(carData))
    fs.writeFile(filePath, JSON.stringify(carDataObj.carData, null, 3), 'utf8',()=>{
      carDataObj.carId === "NONE"  ? callBack() : callBack(carDataObj.carData, carDataObj.carId)
    });
  });
} 

function assignRequestedCab(reqBody, carData){
    var customerLocation = {
      locX: reqBody.locX,
      locY: reqBody.locY
    }
    
    var minDistance = -1, tempDistance, carId = -1; 
    carData.map((car, i) =>{
      if(car.isAvailable === 'Y' && (reqBody.carColor === "ANYCOLOR" || reqBody.carColor === car.bodyColor)){
        tempDistance = calculateMinSquareDistance(car.location.X, customerLocation.locX, car.location.Y, customerLocation.locY);
        if(minDistance === -1 || minDistance > tempDistance){
          minDistance = tempDistance; 
          carId = i;
        }            
      }
    })

    if(carId !== -1)
      carData[carId].isAvailable = 'N'
    return {
        carData,
        carId
    }
}

function makeTheCabAvailable(reqBody, carData){
    var carIndex = reqBody.carID - 1;
    carData[carIndex].location.X = reqBody.locX
    carData[carIndex].location.Y = reqBody.locY
    carData[carIndex].isAvailable = 'Y'
    return {
        carData,
        carID : "NONE"
    }
}

module.exports = {
    getMinDistanceCab,
    endTheTrip,
    assignRequestedCab,
    makeTheCabAvailable
}
    
