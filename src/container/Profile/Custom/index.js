import React,{Component} from 'react';
//import 'bootstrap/dist/css/bootstrap.css'
import io from 'socket.io-client';
import SubPage from '../SubPage/index.js'
import './index.less'
export default class Custom extends Component{
    constructor(){
        super()
        this.state={
            records:[]
        }
    }
    componentDidMount(){
        let socket =io('http://localhost:3000');
        socket.on('connect',()=>{
            socket.emit('getAll')//获取聊天记录
            socket.on('giveAll',(msg)=>{
                
                this.setState({
                    records:msg
                })
            })
            this.btn.onclick=()=>{
                socket.send(this.content.value)
            }
            socket.on('message',(msg)=>{
                
                this.setState({
                    records:[...this.state.records,msg]
                })
               
            })

        })
        

    }

    render(){
        return <div className="Custom">
                    <SubPage url="/profile" title="客服中心">
                        <ul className="list">
                            {this.state.records.map((item,index)=><li key={index}><span className="msg">{item.msg}</span><span className="time">{item.time}</span></li>)}
                        </ul>
                        <div className="send">
                            <input type="text" className="content" ref={input=>this.content=input}/>
                            <button className="btn" ref={input=>this.btn=input}>发送</button>
                        </div>
                    </SubPage>
   
                </div>
    }
}