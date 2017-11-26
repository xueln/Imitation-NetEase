let express = require('express');
let bodyParser = require('body-parser')
let {MsgModel}=require('./model')
let session = require('express-session');
let request=require('request')
let http=require('http')
let app = express()
let server=http.createServer(app)
let io=require('socket.io')(server);



io.on('connection',function(socket){
    socket.on('message',function(msg){
       
        
        MsgModel.create({msg},function(err,doc){
            io.emit('message',doc)
        })
       
    })
    socket.on('getAll',function(){
        MsgModel.find().sort({time:1}).exec(function(err,doc){
            io.emit('giveAll',doc)
        })
    })
})




app.use(bodyParser.json());
app.use(session({
    secret:'1',
    resave:true,
    saveUninitialized:true,
}))

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



let users = [];

// 注册
app.post('/signup', function (req, res) {

    let user = req.body; 
    let oldUser = users.find(item => item.username == user.username);

    if (oldUser) {
        res.json({ code: 1, error: '用户名已经被占用!' });
    } else {
        users.push(user);
     
        res.json({ code: 0, success: '用户注册成功!' });
    }
});

//登录
app.post('/login', function (req, res) {
    let user = req.body;
   
    let oldUser = users.find(item => item.username == user.username && item.password == user.password);
    if (oldUser) {
        req.session.user = user;
        res.json({ code: 0, success: '登录成功!', user });
    } else {
        res.json({ code: 1, error: '用户名或密码错误!' });
    }
});

// 验证登陆态
app.get('/validate',function(req,res){ 
    if(req.session.user){
        res.json({code:0,success:'已登录过',user:req.session.user})
    }else{
        res.json({code:1,error:'未登录'})
    }
})

// 获取首页轮播图数据
let sliders = require('./mock/sliders')
app.get('/sliders', function (req, res) {
    res.json(sliders)
})

// 获取居家详情页数据
let products = require('./mock/jujia')
app.get('/products',function(req,res){
    res.send(products)
})

// 获取分类页的内容
let fenlei = require('./mock/fen.js')
app.get('/list',function(req,res){
    res.send(fenlei)
})

// 重置密码功能
app.post('/reset', function (req, res) {   
    let user = req.body;      
    let oldUser = users.find(item => item.username == user.username);
    if (oldUser) {
        req.session.user = user;
        users=users.map(item =>{
            if(item.username==user.username){
                item.password=user.password;
                return item
            }else{
                return item;
            }
        })
         res.json({ code: 0, success: '重置成功!', user });
    } else {
         res.json({ code: 1, error: '用户不存在，重置失败' });
    }})


// 搜索 请求为 /search？str=“要输入的值”
app.get("/search",function (req,res) {
    res.set('Content-Type','application/json');
    let string=req.query.str;
    fs.readFile("./search/search.json","utf8",function (err,data) {
       data=JSON.parse(data);
        let searchProduct=data.filter(item=>{
        return  item.name.indexOf(string) !== -1
        });
        if(searchProduct.length ===0){
            let i=0;
            while (i<4){
                 let random= Math.round(Math.random()*(18-1)+1);
                searchProduct[i]=data[random];
                i++;
            }
            res.json({dataList:searchProduct,message:"很抱歉,没有找到"+string+"商品,为您推荐今日热卖商品",number:1})
        }else{
            res.json({dataList:searchProduct,number:0})
        }
    })
});

app.get('/logout',function(req,res){
    //res.clearCookie(connect.sid);
    res.json({success:'退出成功'})
})



app.get('/callback',function(req,res){//第三方qq登录
    let code=req.query.code;
    request('http://localhost:3001/token?code='+code,function(err,response,body){
        let token=JSON.parse(body).token;
        request('http://localhost:3001/userInfo?token='+token,function(err,response,body){
            res.send(body)
            
        })
    })
    
})


server.listen(3000)




