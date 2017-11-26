

/**
 * Created by xueln on 2017/11/19.
 */
import * as types from '../action-type'
let initState={
    user:{},
    loginStatus:'',
    registerStatus:'',
    resetStatus:'',
    addr:[]
};
export default function getProfile(state=initState,action){
    switch(action.type){
        case types.GET_USER:return {...state,user:{...state.user,...action.payload}};
        case types.LOGIN_STATUS:return {...state,loginStatus:action.payload};
        case types.REGISTER_STATUS:return {...state,registerStatus:action.payload};
        case types.SAVE_ADDR:return {...state,addr:[...state.addr,action.payload]};
        case types.UPDATE_ADDR:
            let newAddr=state.addr.map((item,index)=>{
                if(index==action.index){
                    return action.payload
                }else{
                    return item;
                }
            })
            return {...state,addr:newAddr}
        case types.VALIDATE:
            if(action.payload.code==0){
                return {...state,user:{...state.user,...action.payload.user}}
            }else{
                return state
            };
        case types.RESETPSW:
            return {...state,resetStatus:action.payload}

        case types.LOGOUT:let newState=state;newState.user={};return newState;
        case types.QQ:return {...state,user:{...state.user,...action.payload}}

        default:return state;
    }

}