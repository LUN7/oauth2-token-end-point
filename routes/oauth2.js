'use strict';

const oauth2orize = require('@poziworld/oauth2orize');
const passport = require('passport');
const db = require('../db');
const utils = require('../utils');

// Create OAuth 2.0 server
const server = oauth2orize.createServer();

// Register serialization and deserialization functions.
//
// When a client redirects a user to user authorization endpoint, an
// authorization transaction is initiated. To complete the transaction, the
// user must authenticate and approve the authorization request. Because this
// may involve multiple HTTP request/response exchanges, the transaction is
// stored in the session.
//
// An application must supply serialization functions, which determine how the
// client object is serialized into the session. Typically this will be a
// simple matter of serializing the client's ID, and deserializing by finding
// the client by ID from the database.

server.serializeClient((client, done) => done(null, client.id));

server.deserializeClient((id, done) => {
  db.clients.findById(id, (error, client) => {
    if (error) return done(error);
    return done(null, client);
  });
});

function issueTokens(userId, clientId, done) {
  db.users.findById(userId, (error, user) => {
    const accessToken = utils.getUid(256);
    const refreshToken = utils.getUid(256);
    db.accessTokens.save(accessToken, userId, clientId, (error) => {
      if (error) return done(error);
      db.refreshTokens.save(refreshToken, userId, clientId, (error) => {
        if (error) return done(error);
        // Add custom params, e.g. the username
        const params = { username: user.name };
        return done(null, accessToken, refreshToken, params);
      });
    });
  });
}


// Exchange user id and password for access tokens. The callback accepts the
// `client`, which is exchanging the user's name and password from the
// authorization request for verification. If these values are validated, the
// application issues an access token on behalf of the user who authorized the code.

server.exchange(oauth2orize.exchange.password((client, username, password, scope, done) => {
  // Validate the client
  db.clients.findByClientId(client.clientId, (error, localClient) => {
    if (error) return done(error);
    if (!localClient) return done(null, false);
    if (localClient.clientSecret !== client.clientSecret) return done(null, false);
    // Validate the user
    db.users.findByUsername(username, (error, user) => {
      if (error) return done(error);
      if (!user) return done(null, false);
      if (password !== user.password) return done(null, false);
      // Everything validated, return the token
      issueTokens(user.id, client.clientId, done);
    });
  });
}));

// issue new tokens and remove the old ones
server.exchange(oauth2orize.exchange.refreshToken((client, refreshToken, scope, done) => {
  console.log('refresh token'),
  db.refreshTokens.find(refreshToken, (error, token) => {
    if (error) return done(error);
    console.log('token',token)
    // issueTokens(token.id, client.id, (err, accessToken, refreshToken) => {
    issueTokens(token.userId, client.clientId, (err, accessToken, refreshToken) => {
      if (err) {
        done(err, null, null);
      }
      db.accessTokens.removeByUserIdAndClientId(token.userId, token.clientId, (err) => {
        if (err) {
          done(err, null, null);
        }
        db.refreshTokens.removeByUserIdAndClientId(token.userId, token.clientId, (err) => {
          if (err) {
            done(err, null, null);
          }
          done(null, accessToken, refreshToken);
        });
      });
    });
  });
}));

// Token endpoint.
//
// `token` middleware handles client requests to exchange authorization grants
// for access tokens. Based on the grant type being exchanged, the above
// exchange middleware will be invoked to handle the request. Clients must
// authenticate when making requests to this endpoint.

module.exports.token = [
  passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
  server.token(),
  server.errorHandler(),
];
