import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home/home'

Vue.use(Router)

export default new Router({
  routes:[
  	{
			path:'/',
			redirect:'/Home',//重定向 ,多写一个指向目标组件;
      name:'home',
			component:Home	
		},
    {
      path:'/Home',
      name:'home',
      component: Home
    }
  ]
})
