const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = mongoose.Schema({
    writer:{
        type: String
    },
    postId:{
        type: String,
        //ref: 'Post'
    },
    responseTo:{
        type: String
    },
    content:{
        type: String
    }
}, {timestamps: true});

const Comments = mongoose.model('Comments', commentsSchema);

module.exports = {Comments}