const express = require('express');
const router = express.Router();
const{User} = require('../models/User');
var passport = require('passport'); 

const FacebookStrategy = require('passport-facebook').Strategy;
  

/* router.get('/login/facebook', (req, res) =>{
    console.log("페이스북 로그인 라우터까지 도달함");

    passport.authenticate('facebook' , {
        scope: 'email'
    });
});
 */


/* 
router.route('/login/facebook').get(passport.authenticate('facebook', {
    scope: 'email'
}));  */








router.get('/login/facebook', passport.authenticate('facebook',{
    scope: 'email'
}));

/* router.get('/login/facebook', (req, res) => {
    console.log("하하호호");
}
);                                            

 */









router.get('/login/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login'}),
    function(req,res){
        res.cookie("w_auth", "cookie123").status(200).json({});
        res.redirect('http://localhost:3000'); 
    }
);

module.exports = router;



 


