import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../plugins/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:null,
    token:"",
    count:0
  },
  mutations: {
    getUserInfo:(state,userInfo)=>{
        state.userInfo=userInfo
    },
    getToken:(state,token)=>{
      state.token=token
    },
    // 获取未读消息数
    getCount:(state,{count})=>{
      state.count=count
    }
  },
  actions: {
    getToken:({commit})=>{
      const res=JSON.parse(localStorage.getItem("token"))
      commit("getToken",res)
    },
    getCount: async ({commit},{token})=>{
      const res = await axios.get(
      `/message/count?accesstoken=${token}`
    )
      commit({type:"getCount",count:res.data})
    }

  }
})
