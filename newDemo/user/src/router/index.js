import Vue from 'vue'
import Router from 'vue-router'
import Home from "../view/home/home"
import Register from "../view/register/register"
import NavMenu from "../view/navMenu/navMenu"
import Word from "../view/word/word"
import Uploader from "../view/uploader/uploader"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:"/Register",
      name:"Register",
      component:Register
    },
    {
      path:"/navMenu",
      name:"navMenu",
      component:NavMenu
    },
    {
      path:"/Word",
      name:"Word",
      component:Word
    },
    {
      path:"/Uploader",
      name:"Uploader",
      component:Uploader
    }
  ]
})
