import * as types from '../action-type'
import {get} from "../../api/index"
export default {
    //获取轮播图数据
    getSliders(){
        return dispatch=>{
            get('/sliders').then(sliders=>{
                dispatch({
                    type:types.FETCH_SLIDERS,
                    payload:sliders
                })
            })
            
        }
    }
}