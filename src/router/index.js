import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: ()=>import('../views/Login.vue')
  },
  {
    path: '/',
    component: Home
  },
  {
    path: '/info',
    component: ()=>import("../views/Info.vue")
  },
  {
    path: '/getstart',
    component: ()=>import('../views/Getstart.vue')
  },
  {
    path: '/api',
    component: ()=>import('../views/Api.vue')
  },
  {
    path: '/about',
    component: ()=>import('../views/About.vue')
  },
  
  {
    path:'/inner/:topicId',
    name:'inner',
    component:()=>import('../views/Inner.vue'),
  },
  {
    path:'/user/:loginname',
    name:'user',
    component:()=>import('../views/User.vue')
  },
  {
    path:'/create/:paramsTopicId',
    name:"create",
    component:()=>import('../views/create.vue')
  },
  {
    path: '/:tab',
    component: Home
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to,from,next)=>{
//   // 获取登录状态，控制路由跳转
//   const isLogin=Boolean(localStorage.getItem('isLogin'))
//   // if(isLogin|| to.path==="/login"){
//   //   // 如果登录了或者目标页面为 login 则全部放行
//   //   next()
//   // }else{
//   //   next('/login')
//   // }
//   if(to.path!=='/login' && isLogin===false) next('/login')
//     next()
// })

export default router
