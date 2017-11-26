/**
 * Created by xueln on 2017/11/5.
 */
import React,{Component} from 'react';
export default class SliderDots extends Component{

    tab=(e,index)=>{
        this.props.fn(index-this.props.index)
    }
    render(){
        return (

                <ul className='dots'>
                    {this.props.img.map((item,index)=><li key={index}  onClick={(e)=>{this.tab(e,index)}} className={(index==this.props.index||(index==0 && this.props.index==this.props.img.length))?'active':''}></li>)}
                </ul>

        )
    }
}