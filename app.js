const express = require('express');

const cors = require('cors');

const http = require('http');
const path = require('path');
var passport = require('passport');

//Express's MiddleWare
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const static = require('serve-static');


const config = require('./config/config');


const mongoose = require('mongoose');
const connect = mongoose.connect(config.mongoURI,
    {
        useNewUrlParser: true, useUnifiedTopology: true,
        useCreateIndex: true, useFindAndModify: false
    }
).then(() => console.log("DB Connected!!!"))
.catch(err  => console.log(err));



const app = express();
//app.use(cors({origin: "http://localhost:3000/"}));

//const {createProxyMiddleware} = require('http-proxy-middleware');
/* app.use(
    '/user/login/facebook',
    createProxyMiddleware({target: 'http://localhost:3000',
            changeOrigin: true})
); */

app.use(cors());
const PORT = process.env.PORT || 3003;


app.set('port', PORT);


app.use('/uploads', express.static('uploads'));
app.use('/public', static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
    console.log("도착" + __dirname);
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

var flash = require('connect-flash');


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



var configPassport = require('./login/passport');
configPassport(app, passport);

app.use('/post', require('./routes/post'));
app.use('/user', require('./routes/user'));
app.use('/comments', require('./routes/comments'));


const server = http.createServer(app).listen(
    app.get('port'), function(){
        console.log('서버 시작');
        console.log("포트번호:" + app.get("port"));
    }

);
