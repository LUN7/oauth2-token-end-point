'use strict';

// const clients = [
//   { id: '1', name: 'Samplr', clientId: 'abc123', clientSecret: 'ssh-secret', isTrusted: false },
//   { id: '2', name: 'Samplr2', clientId: 'xyz123', clientSecret: 'ssh-password', isTrusted: true },
// ];

const Client = require("../model/client");

module.exports.findById = (id, done) => {
  Client.findById(id, (err, client)=> {
    if (err) return done(new Error(err))
    if (!client) return done(new Error('Client Not Found'))
    return done(null, client)
  })
};

module.exports.findByClientId = (clientId, done) => {
  Client.find(clientId, (err, client)=> {
    if (err) return done(new Error(err))
    if (!client) return done(new Error('Client Not Found'))
    return done(null, client)
  })
};

module.exports.findTrustedByClientId = (clientId, done) => {
  Client.find(clientId, (err, client)=> {
    if (err) return done(new Error(err))
    if (!client) return done(new Error('Client Not Found'))
    if (client.isTrusted) return done(new Error('Trusted Client Not Found'))
    return done(null, client)
  })
};
