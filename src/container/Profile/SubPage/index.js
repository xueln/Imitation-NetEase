/**
 * Created by xueln on 2017/11/21.
 */
import React,{Component} from 'react';
import './index.less';
import {Link} from 'react-router-dom'
export default class SubPage extends Component{
    constructor(){
        super();

    }
    render(){

        return (
            <div className="page">
                <h2><Link to={this.props.url}><i className="iconfont icon-fanhui"></i>{this.props.title}</Link></h2>
                <div className="child">
                    {React.Children.map(this.props.children,(item,index)=><div key={index}>{item}</div>)}
                </div>

            </div>
        )
    }
}