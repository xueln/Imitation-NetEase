/**
 * Created by xueln on 2017/11/5.
 */
import React,{Component} from 'react';
import PropTypes from 'prop-types'

import SliderItems from './slideritems'
import Arrows from './arrows'
import SliderDots from './sliderDots'

import './index.less'

class Slider extends Component{
    constructor(){
        super();
        this.state={
            index:0
        }
		this.fn=this.fn.bind(this);
		this.turn=this.turn.bind(this);
		this.getSlider=this.getSlider.bind(this)
    }
    
    
    componentDidMount(){
        this.props.auto? this.fn():''
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }

    fn(){
        this.timer=setInterval(()=>{
            this.turn(1);
        },this.props.delay*1000)
    }
    turn(step){
        let index=this.state.index;
        index+=step;
        if(index>this.props.img.length){//到最后一张了
            this.slider.style.transitionDuration = '0s';
            this.slider.style.left=0;
            //重新计算
            getComputedStyle(this.slider,null).left;
            this.slider.style.transitionDuration=this.props.speed+'s';
            index=1;
        }
        if(index<0){//到第一张了
            this.slider.style.transitionDuration = '0s';
            this.slider.style.left=(this.props.img.length)*-300+'px';
            //重新计算
            getComputedStyle(this.slider,null).left
            this.slider.style.transitionDuration=this.props.speed+'s';
            index=this.props.img.length-1
        }
        this.setState({index})
    }
    getSlider(dom){

        this.slider=dom;

    }

    render(){

        return (
            <div className="wrapper" onMouseOver={()=>{this.props.pause?clearInterval(this.timer):()=>{}}} onMouseOut={this.props.pause?this.fn:()=>{}}>

                <SliderItems {...this.props} {...this.state} get={this.getSlider}/>
                {
                    this.props.arrow?<Arrows {...this.props} fn={this.turn}/>:''
                }
                {
                    this.props.dots?<SliderDots {...this.props} fn={this.turn} index={this.state.index}/>:''
                }

            </div>
        )
    }
}
Slider.propTypes={
        auto:PropTypes.bool,
        speed:PropTypes.number,
        delay:PropTypes.number,
        arrow:PropTypes.bool,
        dots:PropTypes.bool,
        pause:PropTypes.bool,
        img:PropTypes.array
    }
Slider.defaultProps={
        auto:true,
        speed:1,
        delay:3,
        arrow:true,
        dots:true,
        pause:true
    }
export default Slider;