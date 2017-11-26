
/**
 * Created by xueln on 2017/11/20.
 */
import React,{Component} from 'react';
import './index.less'
import {connect} from 'react-redux';
import actions from '../../store/actions/profile'
@connect(state=>state.profile,actions)
export default class Forget extends Component{
    constructor(){
        super();
        this.state={
            index:1
        }
    }
    next=(index)=>{
        this.setState({
            index
        })
    }
    resetPsw=()=>{

        let msg={username:this.username.value,password:this.psw.value};//用户名和新密码
        console.log(msg,'qq')
        this.props.resetPsw(msg)

    }
    render(){
        return (
            <div className="forget" style={{top:-250*(this.state.index-1)+'px'}}>

                    <div className="step1" style={{opacity:this.state.index==1?1:0}}>
                        <h2>输入账号</h2>
                        <label>请输入要重置密码的邮箱账号</label>
                        <input type="text" placeholder="邮箱账号" ref={input=>this.username=input}/>
                        <button onClick={()=>this.next(2)}>下一步</button>
                    </div>
                    <div className="step2" style={{opacity:this.state.index==2?1:0}}>
                        <h2>安全验证</h2>
                        <label>请编辑"短信验证"发送至106981630163331完成验证,然后输入手机号并点击"已发送"</label>
                        <input type="tel" placeholder="手机号码"/>
                        <button onClick={()=>this.next(3)}>已发送</button>
                    </div>
                    <div className="step3" style={{opacity:this.state.index==3?1:0}}>
                        <h2>重置密码</h2>
                        <input type="text" placeholder="输入新密码" ref={input=>this.psw=input}/>
                        <button onClick={this.resetPsw}>提交</button>
                        <p>{this.props.resetStatus}</p>
                    </div>

            </div>
        )
    }


}