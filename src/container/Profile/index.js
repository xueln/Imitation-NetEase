
import React,{Component} from 'react';
import './index.less'
import {connect} from 'react-redux'
import actions from '../../store/actions/profile'
import {Link} from 'react-router-dom'

@connect(state=>state.profile,actions)
export default class Profile extends Component{
    componentDidMount(){
        console.log(this.props)
       if(this.props.location.search){//从第三方登录过来的，肯定有用户信息
           this.props.callback(this.props.location.search);
       }else{
        if(!this.props.user.username){//未登录
            this.props.history.push('/login')//跳到登录页

        }
       }
        
    }
    esc=()=>{
        this.props.logout();
    }
    render(){
        return (
            <div className="person">
                <div className="user-basic">
                    <img alt="默认头像" src={this.props.user.avatar||require('../../images/girl.png')}/>
                    <div>
                        <p>{this.props.user.username}</p>
                        <p className="level">用户等级</p>
                    </div>
                </div>
                <ul className="user-have">
                    <li><i className="iconfont icon-dizhi"></i><Link to="/profile/addr">地址管理</Link></li>
                    <li><i className="iconfont icon-iconfontzaixiankefu"></i><Link to="/profile/custom">联系客服</Link></li>
                    <li><i className="iconfont icon-morentouxiang"></i>我的订单</li>
                    <li><i className="iconfont icon-jiari"></i>周六一起拼</li>
                    <li><i className="iconfont icon-shouhou1"></i>售后服务</li>
                    <li><i className="iconfont icon-youhuiquan"></i>优惠券</li>
                    <li><i className="iconfont icon-hongbao"></i>我的红包</li>
                    <li><i className="iconfont icon-youxiangou"></i>优先购</li>
                    <li><i className="iconfont icon-lipinqia"></i>礼品卡</li>
                    <li><i className="iconfont icon-jifen3"></i>积分中心</li>
                    <li><i className="iconfont icon-huiyuanjulebu"></i>会员俱乐部</li>
                    <li><i className="iconfont icon-zhanghaoanquan"></i>账号安全</li>
                    
                    <li><i className="iconfont icon-bangzhuzhongxin"></i>帮助中心</li>
                    <li><i className="iconfont icon-yijianfankui"></i>意见反馈</li>
                </ul>
                <div className="logout">
                    <Link to='/login'>退出登录</Link>
                    

                </div>
            </div>
        )
    }

}