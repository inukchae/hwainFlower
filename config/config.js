
module.exports = {
    server_port: 3003,
    db_url: 'mongodb://localhost:27017/local',
    mongoURI:'mongodb+srv://inuk159:inuk159@shoppingmall.gxreq.mongodb.net/<dbname>?retryWrites=true&w=majority',
    db_schemas: [
        {file:'./post_schema', collection:'post', schemaName:'PostSchema', modelName:'PostModel'}
    ],
    route_info:[
        {file:'./post', path:'/process/addpost', method:'addpost', type:'post'},   
        {file:'./post', path:'/process/listpost', method:'listpost', type:'post'},
        {file:'./post', path:'/process/listpost', method:'listpost', type:'get'}   
    ],
   facebook: {
        clientId:372029687175525,
        clientSecret:"2a58c10ca9b62318bed20d1806ba79aa",
        callbackURL:'http://localhost:3003/user/login/facebook/callback'
    } 
}
          

/* module.exports = {
    server_port: 3003,
    db_url: 'mongodb://localhost:27017/local',
    db_schemas: [
        {file:'./post_schema', collection:'post', schemaName:'PostSchema', modelName:'PostModel'}
    ],
    route_info:[
        {file:'./post', path:'/process/addpost', method:'addpost', type:'post'},   
        {file:'./post', path:'/process/listpost', method:'listpost', type:'post'},
        {file:'./post', path:'/process/listpost', method:'listpost', type:'get'}   
    ]

}
 */
