var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var parkingSpots = require('./routes/parkingSpots');
var faqs = require('./routes/faqs');
var contactInfo = require('./routes/contactInfo');
var constants = require('./util/constants');
var helmet = require('helmet');

var app = express();

var port = process.env.PORT || constants.LISTENING_PORT;

app.listen(port, function () {
  console.log('App is running on port ', port);
})

var httpRedirect = function (req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers['x-forwarded-proto'] != 'https') {
      return res.redirect('https://' + req.headers.host + req.url);
    } else {
      return next();
    }
  } else {
    return next();
  }
};

app.use(httpRedirect);

// views templating engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// use helmet
app.use(helmet());

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// routes
app.use('/', index);
app.use('/api', parkingSpots);
app.use('/api', faqs);
app.use('/api', contactInfo);