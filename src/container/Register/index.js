/**
 * Created by xueln on 2017/11/19.
 */
import React,{Component} from 'react';
import './index.less'
import {connect} from 'react-redux'
import actions from '../../store/actions/profile'
@connect(null,actions)
export default class Register extends Component{
    constructor(){
        super();
        this.state={
            seconds:0,
            username:'',
            tel:'',
            psw:''
        }
    }
    reg=(e)=>{
        e.preventDefault()
        let msg={username:this.state.username,password:this.state.psw};
        this.props.register(msg)
    }
    setUsername=(e)=>{
        this.setState({
            username:e.target.value
        })
    }
    setTel=(e)=>{
        this.setState({
            tel:e.target.value
        })
    }
    setPsw=(e)=>{
        this.setState({
            psw:e.target.value
        })
    }

    sendCode=(e)=>{
        e.target.disabled=true;
        this.setState({
            seconds:8
        })
        this.timer=setInterval(()=>{
            if(this.state.seconds>0){
                this.setState({
                    seconds:this.state.seconds-1
                })
            }
            else{
                e.target.disabled=false;
                clearInterval(this.timer);

            }
        },1000)
    }
    render(){
        return (
            <div className="reg">
                <form onSubmit={this.reg}>
                    <p>
                        <input type="text" placeholder="6-18位字母数字组合" className="username" value={this.state.username} onChange={this.setUsername}/>
                        <select className="select">
                            <option>@126.com</option>
                            <option>@163.com</option>
                        </select>

                    </p>
                    <p className="psw">
                        <input type="tel" placeholder="输入验证手机号" value={this.state.tel} onChange={this.setTel}/>
                    </p>

                    <p className="verify">
                        <input type="text" placeholder="输入短信验证码"/><button onClick={this.sendCode}>{this.state.seconds?<span className="time">剩余（{this.state.seconds}）s</span>:'发送验证码'}</button>
                    </p>
                    <p>
                        <input type="text" placeholder="6-16位字母数字字符组合密码" className="full-width" value={this.state.psw} onChange={this.setPsw}/>
                    </p>
                    <input type="submit" value="注册" className="full-width btn"/>
                </form>
                <p className="known">用户注册即代表同意<span>《服务条款》</span>和<span>《网易隐私政策》</span></p>
            </div>
        )
    }
}