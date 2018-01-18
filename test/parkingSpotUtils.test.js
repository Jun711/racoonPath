var expect = require('chai').expect;
var parkingSpotUtils = require('../util/parkingSpotUtils');
var mockPreParkingSpots = require('./mockData/preProcessedParkingSpots');
var mockPostParkingSpots = require('./mockData/postProcessedParkingSpots');
var constants = require('../util/constants');

describe('processParkingSpotDescription test', function () {
  var preProcessedParkingSpots = mockPreParkingSpots.parkingSpots;
  var postProcessedParkingSpots = mockPostParkingSpots.parkingSpots;

  var processedParkingSpots = parkingSpotUtils.processParkingSpotDescription(preProcessedParkingSpots);
  it('should remove br tags and add rateByTime property', function () {
    expect(processedParkingSpots[0].properties.id).to.be.equal(postProcessedParkingSpots[0].properties.id);
    expect(processedParkingSpots[0].properties.type).to.be.equal(postProcessedParkingSpots[0].properties.type);
    expect(processedParkingSpots[0].properties.description).to.be.equal(postProcessedParkingSpots[0].properties.description);
    expect(processedParkingSpots[0].properties).to.deep.include({"weekdayOfficeHourRate": "2.50"});
    expect(processedParkingSpots[0].properties).to.deep.include({"sunAfterOfficeRate": "2.00"});
    expect(processedParkingSpots[0].properties).to.deep.include({"freeParking": "0"});
    expect(processedParkingSpots[1].properties).to.deep.include({"freeParking": "0"});
  });

  it('should remove br tags and add time limit properties', function () {
    expect(processedParkingSpots[0].properties.id).to.be.equal(postProcessedParkingSpots[0].properties.id);
    expect(processedParkingSpots[0].properties.type).to.be.equal(postProcessedParkingSpots[0].properties.type);
    expect(processedParkingSpots[0].properties.description).to.be.equal(postProcessedParkingSpots[0].properties.description);
    expect(processedParkingSpots[1].properties.description).to.be.equal(postProcessedParkingSpots[1].properties.description);
    expect(processedParkingSpots[0].properties).to.deep.include({"weekdayOfficeHourLimit": constants.NO_TIME_LIMIT_TEXT});
    expect(processedParkingSpots[0].properties).to.deep.include({"satAfterOfficeLimit": constants.NO_TIME_LIMIT_TEXT});
    expect(processedParkingSpots[1].properties).to.deep.include({"satOfficeHourLimit": constants.NO_TIME_LIMIT_TEXT});
    expect(processedParkingSpots[1].properties).to.deep.include({"weekdayOfficeHourLimit": "2 hr"});
    expect(processedParkingSpots[1].properties).to.deep.include({"satAfterOfficeLimit": "1 hr"});
  });
});