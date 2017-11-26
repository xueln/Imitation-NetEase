import  * as types from "../action-type"
let initState={
    sliders:[]
}
export default function getslider(state=initState,action) {
    if(action.type==types.FETCH_SLIDERS){
        return {
            ...state,
            sliders:action.payload.sliders
        }
    }else {
        return state
    }
}