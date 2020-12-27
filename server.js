'use strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
// const session = require('cookie-session');
const passport = require('passport');
const routes = require('./routes');
const mongoose = require('mongoose')
const flash = require('connect-flash');

// Express configuration
const app = express();

app.use(cookieParser());
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.use(errorHandler());
// app.use(session({ secret: 'no secret', name: 'oAuth'}));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
require('./auth');

app.post('/auth/token', routes.oauth2.token);
app.post('/auth/me', routes.user.me);
app.delete('/auth/client', routes.client.delete)
app.post('/auth/client', routes.client.modify) 

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
    return mongoose.connect('mongodb://localhost:27017/ecom', {
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }