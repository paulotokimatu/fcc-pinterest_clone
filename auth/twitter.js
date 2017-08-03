var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var db = require("../controllers/db_handler.js");
var config = require('../_config');
var init = require('./passport');

passport.use(new TwitterStrategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: config.twitter.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(() => {
        db('users').where( { twitter_id: profile.id } ).first()
        .then((user) => {
            if (user) {
                return done(null, user);
            }
            else {
                db('users').insert({
                    twitter_id: profile.id,
                    name: profile.displayName
                })
                .then(() => {
                    //After inserting the user, we need to select it and serialize
                    db('users').where( { twitter_id: profile.id } ).first()
                    .then((newUser) => {
                        return done(null, newUser);
                    })
                    .catch((err) => {
                        return done(err);
                    });
                })
                .catch((err) => {
                    return done(err);
                });
            }
        })
        .catch((err) => {
            return done(err);
        });
    });
  }

));

// serialize user into the session
init();

module.exports = passport;