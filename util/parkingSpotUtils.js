var constants = require('./constants');

var processText = function (text) {
  var textArr = text.split('<br>');
  var weekdayOffice = {rate: '0', limit: '0'}
  var weekdayAfterOffice = {rate: '0', limit: '0'}
  var satOffice = {rate: '0', limit: '0'}
  var satAfterOffice = {rate: '0', limit: '0'}
  var sunOffice = {rate: '0', limit: '0'}
  var sunAfterOffice = {rate: '0', limit: '0'}
  var freeParking = {rate: '0', limit: 'until 9am'}
  var parseRate = false;
  var parseLimit = false;
  var parseDone = false;

  for (var i = 0; i < textArr.length; i++) {
    if (textArr[i] && !textArr[i].endsWith('\n'))
      textArr[i] += '\n';

    if (!parseDone && textArr[i] && textArr[i].startsWith(constants.RATES))
      parseRate = true;

    if (!parseDone && textArr[i] && textArr[i].startsWith(constants.EFFECT)) {
      parseLimit = true;
      parseRate = false;
    }

    if (textArr[i] && textArr[i].startsWith(constants.PARKING_PROHIBITIONS)) {
      parseLimit = false;
      parseDone = true;
    }

    if (!parseDone) {
      var currentText = textArr[i].toLowerCase().trim();

      if (currentText && currentText.startsWith('m-f 9am')) {
        if (parseRate) {
          weekdayOffice.rate = currentText.substr(-4, 4);
        } else if (parseLimit) {
          if (currentText.includes(constants.NO_TIME_LIMIT)) {
            weekdayOffice.limit = constants.NO_TIME_LIMIT_TEXT;
          } else {
            weekdayOffice.limit = currentText.substr(-4, 1);
          }
        }
        continue;
      }

      if (currentText && currentText.startsWith('m-f 6pm')) {
        if (parseRate) {
          weekdayAfterOffice.rate = currentText.substr(-4, 4);
        } else if (parseLimit) {
          if (currentText.includes(constants.NO_TIME_LIMIT)) {
            weekdayAfterOffice.limit = constants.NO_TIME_LIMIT_TEXT;
          } else {
            weekdayAfterOffice.limit = currentText.substr(-4, 1);
          }
        }
        continue;
      }

      if (currentText && currentText.startsWith('sat 9am')) {
        if (parseRate) {
          satOffice.rate = currentText.substr(-4, 4);
        } else if (parseLimit) {
          if (currentText.includes(constants.NO_TIME_LIMIT)) {
            satOffice.limit = constants.NO_TIME_LIMIT_TEXT;
          } else {
            satOffice.limit = currentText.substr(-4, 1);
          }
        }
        continue;
      }

      if (currentText && currentText.startsWith('sat 6pm')) {
        if (parseRate) {
          satAfterOffice.rate = currentText.substr(-4, 4);
        } else if (parseLimit) {
          if (currentText.includes(constants.NO_TIME_LIMIT)) {
            satAfterOffice.limit = constants.NO_TIME_LIMIT_TEXT;
          } else {
            satAfterOffice.limit = currentText.substr(-4, 1);
          }
        }
        continue;
      }

      if (currentText && currentText.startsWith('sun 9am')) {
        if (parseRate) {
          sunOffice.rate = currentText.substr(-4, 4);
        } else if (parseLimit) {
          if (currentText.includes(constants.NO_TIME_LIMIT)) {
            sunOffice.limit = constants.NO_TIME_LIMIT_TEXT;
          } else {
            sunOffice.limit = currentText.substr(-4, 1);
          }
        }
        continue;
      }

      if (currentText && currentText.startsWith('sun 6pm')) {
        if (parseRate) {
          sunAfterOffice.rate = currentText.substr(-4, 4);
        } else if (parseLimit) {
          if (currentText.includes(constants.NO_TIME_LIMIT)) {
            sunAfterOffice.limit = constants.NO_TIME_LIMIT_TEXT;
          } else {
            sunAfterOffice.limit = currentText.substr(-4, 1);
          }
        }
        continue;
      }
    }
  }

  var processedDescription = {
    description: textArr.join('').trim(),
    properties: {
      weekdayOffice: weekdayOffice,
      weekdayAfterOffice: weekdayAfterOffice,
      satOffice: satOffice,
      satAfterOffice: satAfterOffice,
      sunOffice: sunOffice,
      sunAfterOffice: sunAfterOffice,
      freeParking: freeParking
    }
  }

  return processedDescription
}

var processParkingSpotDescription = function (parkingSpots) {
  for (var i = 0; i < parkingSpots.length; i++) {
    var prop = parkingSpots[i].properties;
    var processDescription = processText(parkingSpots[i].properties.description);
    parkingSpots[i].properties.description = processDescription.description;
    parkingSpots[i].properties = Object.assign(prop, processDescription.properties);
  }

  return parkingSpots;
}

module.exports = {
  processParkingSpotDescription: processParkingSpotDescription
};