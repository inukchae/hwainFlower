var facebook = require('./facebook');


module.exports = function(app, passport){
    console.log("패스포트 설정 로직 호출됨");
    
    passport.serializeUser(function(user, done){
        console.log("serializeUser() 호출됨");
        console.dir(user);

        done(null, user);
    });


    passport.deserializeUser(function(user, done){
        console.log("deserializeUser() 호출됨");
        console.dir(user);

        done(null, user);
    });
    
    passport.use('facebook', facebook(app, passport));
};

