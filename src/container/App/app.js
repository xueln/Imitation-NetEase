import React from "react";
import "./app.less"
import {HashRouter as Router, Route, NavLink} from "react-router-dom"
import {ConnectedRouter} from 'react-router-redux'
import createHistory from 'history/createHashHistory'

import Home from "../Home/index";
import Profile from "../Profile/index.js";
import Login from '../Login/index.js'
import Register from '../Register/index.js'
import RegSuc from '../RegSuc/index.js'
import Cart from "../Cart/index";
import Classify from "../Classify/index";
import Tab from "../../components/Tab/tab";
import Forget from '../Forget/index'
import Addr from '../Profile/Addr/index'
import AddrDetail from '../Profile/Addr/Detail/index'
import Custom from '../Profile/Custom/index'



const history = createHistory();
export default class App extends React.Component {
    render() {
      
        return (
            <ConnectedRouter history={history}>


                <div>
                    {/* <Route exact path="/" component={Home}/> */}
                    <Route path="/classify" component={Classify}/>
                    <Route path="/cart" component={Cart}/>
                    <Route path="/profile" component={Profile} exact/>
                    
                    <Route path="/profile/addr" component={Addr} exact></Route>
                    <Route path="/profile/addr/detail" component={AddrDetail}></Route>
                    <Route path="/profile/custom" component={Custom}></Route>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/regsuc" component={RegSuc}/>
                    <Route path="/forget" component={Forget}/>
                   

                    <Tab/>
                </div>

            </ConnectedRouter>
        )
    }
}