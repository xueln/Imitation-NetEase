/**
 * Created by xueln on 2017/11/19.
 */
import {createStore,applyMiddleware} from 'redux';
import promise from 'redux-promise'
import createHistory from 'history/createHashHistory'
import {routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import logger from 'redux-logger'
import reducer from './reducers/index';

const history = createHistory()
const middleware = routerMiddleware(history)

let store =createStore(reducer,applyMiddleware(thunk,promise,middleware,logger));
export default store;