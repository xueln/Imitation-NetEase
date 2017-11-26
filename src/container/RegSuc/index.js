
/**
 * Created by xueln on 2017/11/20.
 */
import React,{Component} from 'react';
import './index.less';
import {Link} from 'react-router-dom'
export default class RegSuc extends Component{
    constructor(){
        super();
        this.state={
            time:4
        }
    }
    componentDidMount(){
        console.log(this.props)


            this.timer=setInterval(()=>{
                if(this.state.time>0){
                    this.setState({
                        time:this.state.time-1
                    })
                }else{
                    this.props.history.push('/login')
                }

            },1000)


    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
    render(){
        return (
            <div className="regsuc">
                <ul>
                    <li><i className="iconfont icon-duigou"></i></li>
                    <li><h1>恭喜你,</h1></li>
                    <li>{this.props.location.search.substring(1)}已经注册成功</li>
                    <li className="jump"><span>{this.state.time}</span>s后自动<Link to="/login">返回登录页面</Link></li>
                </ul>
            </div>
        )
    }

}