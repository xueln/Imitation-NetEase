import React,{Component} from 'react';
import './index.less'
import Slider from '../../components/Slider/slider'
import {connect} from 'react-redux'
import actions from '../../store/actions/home'
@connect(state=>state.home,actions)
export default class Home extends Component{
    constructor(){
        super()
    }
    componentDidMount(){
        this.props.getSliders();
    }
    render(){
        let params={
            img:this.props.sliders
        }
        return <div>
            <Slider {...params}/>
        </div>
    }
}