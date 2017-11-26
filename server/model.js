let mongoose =require('mongoose')
mongoose.Promise=Promise;
let connection=mongoose.createConnection('mongodb://localhost:27017/custom');
let MsgSchema=new mongoose.Schema({
    msg:String,
    time:{
        type:Date,default:Date.now
    }
})
let MsgModel=connection.model('Chat',MsgSchema);
exports.MsgModel=MsgModel