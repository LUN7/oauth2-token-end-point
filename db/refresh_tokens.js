"use strict";

// const tokens = {};
const Token = require("../model/token");
const R_F_LIMIT = 10

module.exports.find = (refreshToken, done) => {
  Token.findOne({ refreshToken }, (err, token) => {
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

module.exports.save = (refreshToken, userId, clientId, done) => {
  Token.findOne({ userId, clientId }, (err, token) => {
    if (err) return done(new Error(err));
    if (!token)
      return Token.create({ userId, clientId, refreshToken: [refreshToken] }, (err, dump) => {
        if (err) done(new Error("Refresh Token Create Failed"));
        return done(null);
      });
    token.refreshToken.unshift(refreshToken);
    if (token.refreshToken.length >= R_F_LIMIT) token.refreshToken.splice(R_F_LIMIT)
    console.log(token.refreshToken.length)
    return token.save((err, dump) => {
      if (err) return done(new Error("Refresh Token Update Failed"));
      return done(null);
    });
  });
};

module.exports.remove = (userId, clientId, refreshToken, done) => {
  Token.findOne({ userId, clientId}, (err, token) => {
    if (err) return done(new Error(err));
    if (!token) return done(new Error("Token Not Found"));
    token.refreshToken = token.refreshToken.filter( rt => rt !== refreshToken )
    return token.save((err, dump) => {
      if (err) return done(new Error("Refresh Token Removal Failed"));
      return done(null);
    });
  });
};


