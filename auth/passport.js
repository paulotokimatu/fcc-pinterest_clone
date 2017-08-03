var db = require("../controllers/db_handler.js");
var passport = require("passport");

module.exports = function() {
    passport.serializeUser(function(user, done) {
        done(null, user.twitter_id);
    });

    passport.deserializeUser(function(id, done) {
        db('users').where( { twitter_id: id } ).first()
        .then((user) => {
            done(null, user);
        })
        .catch((err) => {
            console.log("Problem: " + err);
        });
    });
};
