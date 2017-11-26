

/**
 * Created by xueln on 2017/11/19.
 */
import {push} from 'react-router-redux'
import * as types from '../action-type'
import {post,get} from '../../api/index'
export default {
    login(msg){
        //点击登录 触发此函数 msg参数是表单信息 请求接口 登录失败停在该页，登录成功跳转到个人中心 接口个人信息存放在payload里，个人中心页挂载后，如取不到数据就重定向到登录页
        return function(dispatch,getState){
            post('/login',msg).then(res=>{
                if(res.code==0){//登录成功
                    dispatch({
                        type:types.GET_USER,
                        payload:res.user
                    });
                    dispatch(push('/profile'))
                }else{
                    //登录失败
                    dispatch({
                        type:types.LOGIN_STATUS,
                        payload:res.error
                    });
                }
            })

        }


    },
    register(msg){
        //点击注册，msg是表单信息，请求接口，注册失败停在此页，注册成功，跳到注册成功欢迎页
        let {username}=msg;
        return function(dispatch,getState){
            post('/signup',msg).then(res=>{
                if(res.code==0){//注册成功
                    dispatch(push('/regsuc/?'+username))
                }else{
                    //注册失败
                    dispatch({
                        type:types.REGISTER_STATUS,
                        payload:res.error
                    });
                }
            })

        }
    },
    resetPsw(msg){
        return function(dispatch,getState){//点击重置密码 msg是新信息 请求接口 重置失败停在此页，重置成功，跳到登录页
            post('/reset',msg).then(res=>{
                if(res.code==0){
                    dispatch(push('/login'))
                }else{
                    dispatch({
                        type:types.RESETPSW,
                        payload:res.error
                    })
                }
            })

        }
    },
    saveAddr(msg,index){//保存地址
        if(index>=0){//更新地址
            return {
                type:types.UPDATE_ADDR,
                payload:msg,
                index
            }
        }else{//新建地址
            return {
                type:types.SAVE_ADDR,
                payload:msg
                
            }
        }
        
    },
    validate(){//判断是否登陆过
        return {
            type:types.VALIDATE,
            payload:get('/validate')
        }
    },
    logout(){//退出登录
        return {
            type:types.LOGOUT,
            payload:get('/logout')
        }
    },
    callback(str){//第三方qq登录
        return{
            type:types.QQ,
            payload:get('/callback'+str)
        }

    }


}