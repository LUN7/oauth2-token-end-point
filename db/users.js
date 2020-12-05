'use strict';

const User = require('../model/user')

module.exports.findById = (id, done) => {
  User.findById(id, (err, user)=> {
    if (err) return done(new Error(err))
    if (!user) return done(new Error('User Not Found'))
    return done(null, user)
  })
};

module.exports.findByUsername = (username, done) => {
  User.findOne({username}, (err, user)=> {
    if (err) return done(new Error(err))
    if (!user) return done(new Error('User Not Found'))
    return done(null, user)
  })
};

module.exports.create = (user, done) => {

}