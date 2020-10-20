const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name:{
        type: String, 
        maxlength:50
    },
/*     email:{
        type: String,
        trim: true,
        unique: 1
    }, */
    password:{
        type: String,
        minlength: 5
    },
    provider:{
        type: String,
        'default': ''
    },
    token: {
        type: String,
        'default':''
    },
    facebook:{

    }
});

const User = mongoose.model('User', userSchema);
module.exports = {User}