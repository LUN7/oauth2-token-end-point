'use strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const session = require('express-session');
const passport = require('passport');
const routes = require('./routes');
const mongoose = require('mongoose')


// Express configuration
const app = express();

app.use(cookieParser());
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(errorHandler());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
require('./auth');

app.post('/oauth/token', routes.oauth2.token);
app.get('/api/userinfo', routes.user.info);



function listen() {
    const port = process.env.PORT || 3000
    app.listen(port);
    console.log('Express app started on port ' + port);
  }

// Required for @now/node, optional for @now/node-server.
module.exports = app;

connectMongoDB();

function connectMongoDB() {
    mongoose.connection
      .on('error', console.log)
      .on('disconnected', connectMongoDB)
      .once('open', listen);
    return mongoose.connect('mongodb://localhost:27017', {
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }