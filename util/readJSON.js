var parkingSpotUtils = require('./').ParkingSpots;
var fs = require('fs');
var parkingSpots;

// fs.readFile('../test/mockData/parkingSpots.json', 'utf8', function (err, data) {
//     if (err) throw err; // we'll not consider error handling for now
//     parkingSpots = JSON.parse(data);
//     console.log('parkingSpots: ', parkingSpots)
// });

parkingSpots = JSON.parse(fs.readFileSync('../test/mockData/parkingMeters.json', 'utf8'));
var processedParkingSpots = parkingSpotUtils.processParkingSpotDescription(parkingSpots)

fs.writeFile('../test/mockData/processedParkingMeters.json', JSON.stringify(processedParkingSpots, null, 2), function (err) {
  if (err) {
    console.error(err);
    return;
  }
  ;
  console.log('File has been created');
});
