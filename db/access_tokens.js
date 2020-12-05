"use strict";

// const tokens = {};
const Token = require("../model/token");

module.exports.find = (accessToken, done) => {
  Token.findOne({ accessToken }, (err, token) => {
    if (err) return done(new Error(err));
    if (!token) return done(new Error("Token Not Found"));
    return done(null, token);
  });
};

module.exports.findByUserIdAndClientId = (userId, clientId, done) => {
  Token.findOne({ userId, clientId }, (err, token) => {
    if (err) return done(new Error(err));
    if (!token) return done(new Error("Token Not Found"));
    return done(null, token);
  });
};

module.exports.save = (accessToken, userId, clientId, done) => {
  Token.findOne({ userId, clientId }, (err, token) => {
    if (err) return done(new Error(err));
    if (!token)
      return Token.create({ userId, clientId, accessToken }, (err, dump) => {
        if (err) return done(new Error("Access Token Create Failed"));
        return done(null);
      });
    token.accessToken = accessToken;
    return token.save((err, dump) => {
      if (err) return done(new Error("Access Token Update Failed"));
      return done(null);
    });
  });
};

module.exports.removeByUserIdAndClientId = (userId, clientId, done) => {
  Token.findOne({ userId, clientId }, (err, token) => {
    if (err) return done(new Error(err));
    if (!token) return done(new Error("Token Not Found"));
    token.accessToken = ""
    return token.save((err, dump) => {
      if (err) return done(new Error("Refresh Token Removal Failed"));
      return done(null);
    });
  });
};
