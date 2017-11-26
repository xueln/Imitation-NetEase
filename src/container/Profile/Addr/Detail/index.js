/**
 * Created by xueln on 2017/11/21.
 */
import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import './index.less'
import {connect} from 'react-redux';
import actions from '../../../../store/actions/profile'
import SubPage from '../../SubPage/index.js'


class SelectAddr extends Component{

    constructor(props){
        super(props)
        this.state={
            city:'请选择',
            region:'',
            level:1

        }
    }
    selectAddr=(e)=>{
        e.stopPropagation();
        if(e.target.tagName=='DD'){//选择具体城市和区县
            if(this.state.level==1){
                this.setState({
                    city:e.target.innerHTML,
                    region:'区县',
                    level:this.state.level+1
                })
            }else if(this.state.level==2){
                this.setState({
                    region:e.target.innerHTML
                })
            }
        }

        if(e.target.className.indexOf('city-name')!=-1){//切换城市
            this.setState({
                level:1,
                region:''
            })
        }
        if(e.target.className.indexOf('region')!=-1){//切换区县
            this.setState({
                level:2
            })
        }
        if(e.target.tagName=='BUTTON'){//点击确定 选择完成
            this.props.setHide();
            let data={city:this.state.city,region:this.state.region}
            this.props.getAddr(data)
        }


    }


    render(){
        const cities=[
            {city:"北京",region:['昌平区','朝阳区','海淀区','西城区','东城区','通州','延庆']},
            {city:"天津",region:['河西区','河北区','津南区','塘沽','北辰','静海','河东区']}
        ]
        return <div className="mask" style={{display:this.props.selected?'none':'block'}} onClick={this.setHide}>
                    <div className="city">
                        <dl onClick={this.selectAddr}>
                            <dt>
                                <span className={(this.state.level==1?'active ':'')+'city-name'}>{this.state.city}</span>
                                <span className={(this.state.level==2?'active ':'')+'region'}>{this.state.region}</span>
                                <button>确定</button>
                            </dt>
                            {
                                this.state.level==1?cities.map((item,index)=><dd key={index}>{item.city}</dd>):cities.find(item=>item.city==this.state.city).region.map((item,index)=><dd key={index}>{item}</dd>)

                            }

                        </dl>
                    </div>
                </div>
    }
}


@connect(state=>state.profile,actions)
export default class Detail extends Component{
    constructor(){
        super();
        this.state={
            city:'',
            region:'',
            road:'',
            name:'',
            tel:'',
            selected:false
        }
    }
    getAddr=(data)=>{
        this.setState(data)
    }
    saveAddr=(e)=>{
        e.preventDefault();
        let data={
            city:this.state.city,
            road:this.state.road,
            name:this.state.name,
            tel:this.state.tel
        }
        this.props.saveAddr(data,this.index);
        this.props.history.goBack();
    }
    setShow=()=>{
        this.setState({
            selected:false
        })
    }
    setHide=()=>{
        this.setState({
            selected:true
        })
    }
    componentDidMount(){
        console.log(this.props)
        this.index=this.props.location.state&&this.props.location.state.index;
        let addr=this.props.addr[this.index]
        if(this.index>=0){
            this.setState({
                ...addr
            })
            
        }
    }
    handleChange=(e,name)=>{
        this.setState({
            [name]:e.target.value
        })
    }
    render(){
        
        
    
        
        return (
            <div className="addr-detail">
                <SubPage title={'新建地址'} url="/profile/addr">
                        <form onSubmit={this.saveAddr}>
                            <ul className="addr-list" >
                                <li onClick={this.setShow}><input type="text"  placeholder="省市、区县、城市" required value={this.state.city+this.state.region}/></li>
                                <li><input onChange={(e)=>this.handleChange(e,'road')} type="text" value={this.state.road} required placeholder="详细地址，如街道、楼牌号等"/></li>
                                <li><input onChange={(e)=>this.handleChange(e,'name')} type="text" value={this.state.name} required placeholder="姓名"/></li>
                                <li><input onChange={(e)=>this.handleChange(e,'tel')} type="tel" value={this.state.tel} required placeholder="手机号码"/></li>
                                <li><input type="checkbox"/>设为默认地址</li>
                                <li><input type="submit" value="保存"/></li>
                            </ul>
                        </form>

                </SubPage>
                <SelectAddr getAddr={this.getAddr} selected={this.state.selected} setHide={this.setHide}/>


            </div>
        )
    }
}