/**
 * Created by xueln on 2017/11/5.
 */
import React,{Component} from 'react';
export default class Arrows extends Component{
    goLeft=()=>{
        this.props.fn(-1)
    }
    goRight=()=>{
        this.props.fn(1)
    }
    render(){
        return (
            <div className="arrows">
                <a className="arrow-left iconfont icon-fanhui" onClick={this.goLeft}></a>
                <a className="arrow-right iconfont icon-gengduo" onClick={this.goRight}></a>
            </div>
        )
    }
}