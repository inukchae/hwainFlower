const express = require('express');
const router = express.Router();
const {Comments} = require("../models/Comments");


router.post('/saveComments', (req, res) => {
    console.log("세이브 커맨츠 도작했다.");  
    
    const comments =new Comments(req.body);
    comments.save((err, comments) => {
        if(err) return res.status(400).json({success:false, err});
        return res.status(200).json({success:true, comments});
    });
});


router.post('/getComments', (req, res)=> {
    console.log("댓글 리스트 가져오기 성공");
    console.dir(req.body.post_id);


    Comments.find({postId:req.body.post_id}).exec((err, comments) => {

            console.log("★★★ 아래 ★★★");
            console.dir(comments);

            if(err) return res.status(400) .send(err);
            return res.status(200).json({success:true, comments});
    });
 
});


module.exports = router;