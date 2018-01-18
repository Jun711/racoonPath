var constants = require('./constants');

var processText = function (text) {
  var textArr = text.split('<br>');
  var weekdayOfficeHourRate = '0';
  var weekdayAfterOfficeRate = '0';
  var satOfficeHourRate = '0';
  var satAfterOfficeRate = '0';
  var sunOfficeHourRate = '0';
  var sunAfterOfficeRate = '0';
  var weekdayOfficeHourLimit = '0';
  var weekdayAfterOfficeLimit = '0';
  var satOfficeHourLimit = '0';
  var satAfterOfficeLimit = '0';
  var sunOfficeHourLimit = '0';
  var sunAfterOfficeLimit = '0';
  var freeParking = '0';
  var parseRate = false;
  var parseLimit = false;
  var parseDone = false;
  console.log('textArr.length: ', textArr.length)
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
          weekdayOfficeHourRate = currentText.substr(-4, 4).trim();
        } else if (parseLimit) {
          if (currentText.includes(constants.NO_TIME_LIMIT)) {
            console.log('currentText: ' + currentText)
            
            console.log('constants.NO_TIME_LIMIT_TEXT: ' + constants.NO_TIME_LIMIT_TEXT)

            weekdayOfficeHourLimit = constants.NO_TIME_LIMIT_TEXT;
            console.log('weekdayOfficeHourLimit: ' + weekdayOfficeHourLimit)
          } else {
            weekdayOfficeHourLimit = currentText.substr(-4, 4).trim();
          }
        }
        continue;
      }

      if (currentText && currentText.startsWith('m-f 6pm')) {
        if (parseRate) {
          weekdayAfterOfficeRate = currentText.substr(-4, 4);
        } else if (parseLimit) {
          if (currentText.includes(constants.NO_TIME_LIMIT)) {
            weekdayAfterOfficeLimit = constants.NO_TIME_LIMIT_TEXT;
          } else {
            weekdayAfterOfficeLimit = currentText.substr(-4, 4);
          }
        }
        continue;
      }

      if (currentText && currentText.startsWith('sat 9am')) {
        if (parseRate) {
          satOfficeHourRate = currentText.substr(-4, 4);
        } else if (parseLimit) {
          if (currentText.includes(constants.NO_TIME_LIMIT)) {
            satOfficeHourLimit = constants.NO_TIME_LIMIT_TEXT;
          } else {
            satOfficeHourLimit = currentText.substr(-4, 4);
          }
        }
        continue;
      }

      if (currentText && currentText.startsWith('sat 6pm')) {
        if (parseRate) {
          satAfterOfficeRate = currentText.substr(-4, 4);
        } else if (parseLimit) {
          if (currentText.includes(constants.NO_TIME_LIMIT)) {
            satAfterOfficeLimit = constants.NO_TIME_LIMIT_TEXT;
          } else {
            satAfterOfficeLimit = currentText.substr(-4, 4);
          }
        }
        continue;
      }

      if (currentText && currentText.startsWith('sun 9am')) {
        if (parseRate) {
          sunOfficeHourRate = currentText.substr(-4, 4);
        } else if (parseLimit) {
          if (currentText.includes(constants.NO_TIME_LIMIT)) {
            sunOfficeHourLimit = constants.NO_TIME_LIMIT_TEXT;
          } else {
            sunOfficeHourLimit = currentText.substr(-4, 4);
          }
        }
        continue;
      }

      if (currentText && currentText.startsWith('sun 6pm')) {
        if (parseRate) {
          sunAfterOfficeRate = currentText.substr(-4, 4);
        } else if (parseLimit) {
          if (currentText.includes(constants.NO_TIME_LIMIT)) {
            sunAfterOfficeLimit = constants.NO_TIME_LIMIT_TEXT;
          } else {
            sunAfterOfficeLimit = currentText.substr(-4, 4);
          }
        }
        continue;
      }
    }
  }

  console.log('processedDescription weekdayOfficeHourLimit: ', weekdayOfficeHourLimit)
  var processedDescription = {
    description: textArr.join('').trim(),
    properties: {
      weekdayOfficeHourRate,
      weekdayAfterOfficeRate,
      satOfficeHourRate,
      satAfterOfficeRate,
      sunOfficeHourRate,
      sunAfterOfficeRate,
      weekdayOfficeHourLimit,
      weekdayAfterOfficeLimit,
      satOfficeHourLimit,
      satAfterOfficeLimit,
      sunOfficeHourLimit,
      sunAfterOfficeLimit,
      freeParking
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