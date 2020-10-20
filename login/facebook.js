

var FacebookStrategy = require('passport-facebook').Strategy;
var config = require("../config/config");
/* const {Post} = require("../models/Post"); */
const {User} = require("../models/User");


module.exports = function(app, passport){

    console.log("페이스북 패스포트 닸다 탔따페이");

    return new FacebookStrategy({
        clientID: config.facebook.clientId,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL
    }, function(accessToken, refreshToken, profile, done){
        console.log("passport의 facebook 호출됨");
        console.dir(profile);

        var options ={
            criteria: {'facebook.id' : profile.id}
        };

        //var database = app.get('database');
        User.findOne(options, function(err, user){
            if(err) return done(err);

            if(!user){

                var user = new User({
                    name: profile.displayName,
                    /* email: profile.emails[0].value, */
                    provider: 'facebook',
                    token: accessToken,
                    facebook: profile._json
                });

                user.save(function(err){
                    if(err) console.log(err);
                    return done(err, user);
                });


                
            }else{
                return done(err, user);
            }
        });
    });
};
