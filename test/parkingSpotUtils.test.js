var expect = require('chai').expect;
var parkingSpotUtils = require('../util/parkingSpotUtils');
var mockPreParkingSpots = require('./mockData/preProcessedParkingSpots');
var mockPostParkingSpots = require('./mockData/postProcessedParkingSpots');
var constants = require('../util/constants');

describe('processParkingSpotDescription test', function () {
  var preProcessedParkingSpots = mockPreParkingSpots.parkingSpots;
  var postProcessedParkingSpots = mockPostParkingSpots.parkingSpots;

  var processedParkingSpots = parkingSpotUtils.processParkingSpotDescription(preProcessedParkingSpots);
  it('should remove br tags and add rateByTime and time limit properties', function () {
    expect(processedParkingSpots[0].properties.id).to.be.equal(postProcessedParkingSpots[0].properties.id);
    expect(processedParkingSpots[0].properties.type).to.be.equal(postProcessedParkingSpots[0].properties.type);
    expect(processedParkingSpots[0].properties.description).to.be.equal(postProcessedParkingSpots[0].properties.description);
    expect(processedParkingSpots[1].properties.description).to.be.equal(postProcessedParkingSpots[1].properties.description);
    expect(processedParkingSpots[0].properties).to.deep.include(
      {
        [constants.WEEKDAY_6_10]: {
          "rate": "2.00",
          "limit": constants.NO_TIME_LIMIT_TEXT
        }
      });
    expect(processedParkingSpots[0].properties).to.deep.include(
      {
        [constants.SUN_6_10]: {
          "rate": "2.00",
          "limit": constants.NO_TIME_LIMIT_TEXT
        }
      });
    expect(processedParkingSpots[0].properties).to.deep.include(
      {
        [constants.FREE_PARKING]: {
          "rate": "0",
          "limit": "until 9am"
        }
      });
    expect(processedParkingSpots[1].properties).to.deep.include({
      [constants.FREE_PARKING]: {
        "rate": "0",
        "limit": "until 9am"
      }
    });
    expect(processedParkingSpots[1].properties).to.deep.include({
      [constants.WEEKDAY_9_6]: {
        "rate": "2.50",
        "limit": "2 hr"
      }
    });
    expect(processedParkingSpots[1].properties).to.deep.include({
      [constants.SAT_6_10]: {
        "rate": "2.00",
        "limit": "1 hr"
      }
    });
    expect(processedParkingSpots[1].properties).to.deep.include({
      [constants.SAT_9_6]: {
        "rate": "2.50",
        "limit": constants.NO_TIME_LIMIT_TEXT
      }
    });
  });
});