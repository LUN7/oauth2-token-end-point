'use strict';

const clients = [
  { id: '1', name: 'Samplr', clientId: 'abc123', clientSecret: 'ssh-secret', isTrusted: false },
  { id: '2', name: 'Samplr2', clientId: 'xyz123', clientSecret: 'ssh-password', isTrusted: true },
];

module.exports.findById = (id, done) => {
  for (let i = 0, len = clients.length; i < len; i++) {
    if (clients[i].id === id) return done(null, clients[i]);
  }
  return done(new Error('Client Not Found'));
};

module.exports.findByClientId = (clientId, done) => {
  for (let i = 0, len = clients.length; i < len; i++) {
    if (clients[i].clientId === clientId) return done(null, clients[i]);
  }
  return done(new Error('Client Not Found'));
};

module.exports.findTrustedByClientId = (clientId, done) => {
  for (let i = 0, len = clients.length; i < len; i++) {
    if (clients[i].clientId === clientId && clients[i].isTrusted) return done(null, clients[i]);
  }
  return done(new Error('Trusted Client Not Found'));
};
