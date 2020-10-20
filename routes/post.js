//var Entities = require('html-entities').AllHtmlEntities;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {Post} = require('../models/Post');


var storage = multer.diskStorage({

	destination: function(req, file, cb){
		cb(null, 'uploads/');
	},

	filename: function(req, file, cb){
		cb(null, `${Date.now()}_${file.originalname}`)
	}
});

var upload = multer({storage: storage}).single("file");


router.get('/posts',(req, res) => {
	console.log('/posts 도달');

	const category = req.query.category;
	let searchWord = req.query.title;

	console.log("서치월드:" + searchWord);
	if(searchWord == undefined){
		searchWord = "";
	}

	console.log("최후의 서치월드:" + searchWord);


	const pageNumber = parseInt(req.query.CurrentPage, 10) + 1;
	const nPerPage = 8;

	console.log("페이지 출력해본당:" + pageNumber);

/* 
  	Post.find({category: category}).exec((err, postInfo) => {

		console.log("아래 db에서 가져온 데이터들");
		console.log(postInfo);
		if(err){
			return res.status(400).json({success:false, err});
		}else{
			return res.status(200).json({success:true, postInfo});
		}
	}); */
	let realcount = 0;

	function calculator(count){
		console.log("칼큘 실행");
		realcount = count;
		console.log("칼큘 후 카운트:" + realcount);
	}

	const count = Post.find({category: category, title:{$regex:searchWord}}).count().exec(
		(err,count) => {
			console.log("카운트 결과값:" + count);
			calculator(count);


			Post.find({category: category, title:{$regex:searchWord}}).skip(pageNumber > 0 ? ((pageNumber -1) * nPerPage) : 0 )
			.limit(nPerPage).exec(
				(err, docs) => {
					console.log(docs);
					if(err){
						return res.status(400).json({success : false});
					}else{
						return res.status(200).json({success:true, realcount ,docs});
					}
				});	
		}
	);

/* 	Post.find({category: category, title:{$regex:searchWord}}).skip(pageNumber > 0 ? ((pageNumber -1) * nPerPage) : 0 )
		.limit(nPerPage).exec(
			(err, docs) => {
				console.log(docs);
				if(err){
					return res.status(400).json({success : false});
				}else{
					return res.status(200).json({success:true, realcount ,docs});
				}
			});	 */



/* const count = Post.find({category: category, title: searchWord}).count().exec(
	(err,count) => {
		console.log("카운트 결과값:" + count);
		calculator(count);
	}
);


Post.find({category: category}).skip(pageNumber > 0 ? ((pageNumber -1) * nPerPage) : 0 )
	.limit(nPerPage).exec(
		(err, docs) => {
			console.log(docs);
			if(err){
				return res.status(400).json({success : false});
			}else{
				return res.status(200).json({success:true, realcount ,docs});
			}
		});	 */



});



router.post('/image', (req, res) => {

	console.log("/image 라우팅 경로 도착함");
	
	upload(req, res, err => {

		if(err){
			return res.json({success: false, err});
		}
		return res.json({success:true, filePath: res.req.file.path, fileName: res.req.file.filename});
	});
});



router.post('/', (req, res) => {

	console.log('글 등록 페이지 도착함');

	const post = new Post(req.body);

	post.save((err)=>{
		if(err) return res.status(400).json({success:false, err});
		return res.status(200).json({success:true});
	});

});

router.get("/postDetailById", (req, res) => {

	console.log("글 상세 페이지");
	const postId = req.query.id;

	console.log("id:" + postId);
	//Post.find({category: category}).skip(pageNumber > 0 ? ((pageNumber -1) * nPerPage) : 0 )


	Post.find({_id : postId}).exec((err, post) => {
		console.log("디비에서 가져온 데이터 조회:" + post);
		console.log("에러가 있다면찍어라:" + err);
		if(err) return res.status(400).send({success: false, err});
		return res.status(200).send({success: true, post});
	});


});



/////////////////////////////////////////////////////////////////////
/* var addpost = function(req, res) {
    console.log('post 모듈 안에 있는 addpost 호출됨.');
 
    var paramTitle = req.body.title || req.query.title;
    var paramContents = req.body.contents || req.query.contents;
    var paramWriter = req.body.writer || req.query.writer;
    var boardContent = req.body.content || req.query.content;
	
    console.log('요청 파라미터 : ' + paramTitle + ', ' + paramContents + ', ' +  paramWriter);

    
	var database = req.app.get('database');

   // var title = String Buffer();



	// 데이터베이스 객체가 초기화된 경우
	if (database.db) {
    
			// save()로 저장
			// PostModel 인스턴스 생성
			var post = new database.PostModel({
				title: paramTitle,
				contents: paramContents,
                //writer: userObjectId
                //writer: "temp아이디"
			});

			post.savePost(function(err, result) {
				if (err) {
                    if (err) {
                        console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack);

                        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                        res.write('<h2>응답 웹문서 생성 중 에러 발생</h2>');
                        res.write('<p>' + err.stack + '</p>');
                        res.end();

                        return;
                    }
                }
				
			    console.log("글 데이터 추가함.");
			    console.log('글 작성 포스팅 글을 생성했습니다. : ' + post._id);
			    
			    return res.redirect('/process/showpost/' + post._id); 
			});
		
		
	} else {
        console.log('db 없다 ');
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
}; */

/*  var listpost = function(req, res) {

	console.log('post 모듈 안에 있는 listpost 호출됨.');
  
    var paramPage = req.body.page || req.query.page;
    var paramPerPage = req.body.perPage || req.query.perPage;
	
    console.log('요청 파라미터 : ' + paramPage + ', ' + paramPerPage);
    
	var database = req.app.get('database');
	
    // 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		// 1. 글 리스트
		var options = {
			page: paramPage,
			perPage: paramPerPage
        }
        
        console.log("db안에 들어왔다");
		
		database.PostModel.list(options, function(err, results) {
	 		if (err) {

                console.error('게시판 글 목록 조회 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>게시판 글 목록 조회 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
            }
			
			if (results) {
                console.log("아래 결과 파라미터");
				console.dir(results);
 
				// 전체 문서 객체 수 확인
				database.PostModel.count().exec(function(err, count) {

					res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
					
					// 뷰 템플레이트를 이용하여 렌더링한 후 전송
					var context = {
						title: '글 목록',
						posts: results,
						page: parseInt(paramPage),
						pageCount: Math.ceil(count / paramPerPage),
						perPage: paramPerPage, 
						totalRecords: count,
						size: paramPerPage
					};
					
					req.app.render('listpost', context, function(err, html) {
                        if (err) {
                            console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack);

                            res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                            res.write('<h2>응답 웹문서 생성 중 에러 발생</h2>');
                            res.write('<p>' + err.stack + '</p>');
                            res.end();

                            return;
                        }
                        
						res.end(html);
					});
					
				});
				
			} else {

                console.log("에러탔다");
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>글 목록 조회  실패</h2>');
				res.end();
			}
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
};
 */

/* var showpost = function(req, res) {
	console.log('post 모듈 안에 있는 showpost 호출됨.');
  
    // URL 파라미터로 전달됨
    var paramId = req.body.id || req.query.id || req.params.id;
	
    console.log('요청 파라미터 : ' + paramId);
    
    
	var database = req.app.get('database');
	
    // 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		// 1. 글 리스트
		database.PostModel.load(paramId, function(err, results) {
			if (err) {
                console.error('게시판 글 조회 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>게시판 글 조회 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
            }
			
			if (results) {
				console.dir(results);
  
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				
				// 뷰 템플레이트를 이용하여 렌더링한 후 전송
				var context = {
					title: '글 조회 ',
					posts: results,
					Entities: Entities
				};
				
				req.app.render('showpost', context, function(err, html) {
					if (err) {
                        console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack);
                
                        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                        res.write('<h2>응답 웹문서 생성 중 에러 발생</h2>');
                        res.write('<p>' + err.stack + '</p>');
                        res.end();

                        return;
                    }
					
					console.log('응답 웹문서 : ' + html);
					res.end(html);
				});
			 
			} else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>글 조회  실패</h2>');
				res.end();
			}
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
}; */

module.exports = router;
