/**
 * Created by xueln on 2017/11/21.
 */
import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import './index.less'
import {connect} from 'react-redux';
import actions from '../../../store/actions/profile'
import SubPage from '../SubPage/index.js'
@connect(state=>state.profile,actions)
export default class Addr extends Component{
    render(){
        return (
            <div className="addr">
                <SubPage url="/profile" title="地址管理">
                    <ul>
                        {this.props.addr.map((item,index)=>(<li key={index}>
                            <div>{item.name}</div>
                            <div>
                                <p>{item.tel}</p>
                                <p>{item.city+item.road}</p>
                            </div>
                            <div><Link to={{pathname:'/profile/addr/detail',state:{index}}}><i className="iconfont icon-bianji"></i></Link></div>
                        </li>))}
                    </ul>
                    <button><Link to="/profile/addr/detail">+新建地址</Link></button>
                </SubPage>

            </div>
        )
    }
}