let appInfo={
    appid:'webfe',
    name:'仿网易严选',
    description:'网易严选秉承网易一贯的严谨态度,深入世界各地,严格把关所有商品',
    secret:'12345',
    redirectUrl:'http://localhost:8888/#/profile'

}
let express = require('express');
let app = express();
let path=require('path');
let uuid=require('uuid')
app.set('views',path.resolve('views'))
app.set('view engine','ejs')
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8888');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', "true");
    if (req.method == 'OPTIONS') {
        res.end();
    } else {
        next();
    }
})
app.use(function(req,res,next){
    req.loginUserId="xueln";
    next();
})

app.get('/authorize',function(req,res){//http://localhost:3001/authorize?clientId=webfe&redirectUrl=http://localhost:8888/#/profile
    res.render('auth',{
        loginUserId:req.loginUserId,
        appInfo
    
    })
})
let CODES={}
app.post('/authorize',function(req,res){
    const code=uuid.v4();
    CODES[code]={
        clientId:req.query.clientId,
        userId:req.loginUserId
    }
    res.redirect(req.query.redirectUrl+'#/profile?1=1&code='+code)
})
let TOKENS={}
app.get('/token',function(req,res){
    let code=req.query.code;
    let token=uuid.v4();
    TOKENS[token]={
        clientId:CODES[code].clientId,
        userId:CODES[code].userId
    }
    res.send({token})
})
const USERS={
    'xueln':{
        username:'第三方qq用户',
        password:'+++',
        avatar:'http://img.11665.com/img3_p3/i1/1935718798/TB2q7S9aGe5V1BjSspkXXcoqpXa_%21%211935718798.jpg'
    }
}
app.get('/userInfo',function(req,res){
    let token=req.query.token;
    let userid=TOKENS[token].userId
    let user=USERS[userid]
    res.send(user)
})
app.listen(3001)