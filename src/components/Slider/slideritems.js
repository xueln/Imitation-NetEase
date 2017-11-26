/**
 * Created by xueln on 2017/11/5.
 */
import React,{Component} from 'react';
export default class SliderItems extends Component{
    constructor(){
        super();

    }

    render(){

        let style={
            left:this.props.index*-300+'px',
            width:(this.props.img.length+1)*300+'px',
            transitionDuration:this.props.speed+'s'
        }
        return (
            <ul className="box" style={style} ref={dom=>this.props.get(dom)}>
                {
                    this.props.img.map((item,index)=><li className="slider" key={index} ><img src={item} /></li>)
                }
               <li key={this.props.img.length} className="slider">

                   <img src={this.props.img[0]}/>
               </li>
            </ul>
        )
    }
}