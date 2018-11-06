import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  error:require('./assets/img/error.gif'),
  loading:require('./assets/img/loadbaby.gif')
  
})

import axios from "axios";
Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://111.230.232.110:8899";
axios.defaults.withCredentials = true;

import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)

import Vuex from 'vuex'
Vue.use(Vuex)

import $ from "jquery";
Vue.prototype.$$ = $;

import moment from "moment";
// filters: {
//   beautifyTime(value,str,str2) {
//     //   if(value)
//     console.log(value);
//     return moment(value).format(`YYYY${str}MM${str}DD日`);
//     //   return 'y';
//   }
// }
Vue.filter('beautifyTime',function(value,str,str2,str3){
    return moment(value).format(`YYYY${str}MM${str2}DD${str3}`);
})
Vue.filter('beautifyTimePro',function(value,formatStr){
  return moment(value).format(formatStr);
})

import vueRouter from 'vue-router'

import index from './components/index.vue'
import detail from './components/detail.vue'
import shopcart from './components/shopcart.vue'
import checkOrder from './components/checkOrder.vue'
import login from './components/login.vue'
import getOrder from './components/getOrder.vue'

Vue.use(vueRouter)

Vue.config.productionTip = false

const routes = [
  {
    path: '/',
    component: index,
    meta:{
      zhName:"首页"
    }
  },
  {
    path: '/index',
    component: index,
    meta:{
      zhName:"首页"
    }
  },
  {
    path: '/detail/:goodId',
    component: detail,
    meta:{
      zhName:"商品详情"
    }
  },
  {
    path: '/shopcart',
    component: shopcart,
    meta:{
      zhName:"购物车"
    }
  },
  {
    path: '/checkOrder/:ids',
    component: checkOrder,
    meta:{
      zhName:"订单详情",
      checkLogin: true
    }
  },
  {
    path: '/login',
    component: login,
    meta:{
      zhName:"登录"
    }
  },
  {
    path: '/getOrder',
    component: getOrder,
    meta:{
      zhName:"订单详情"
    }
  }
 
]

const router = new vueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  // console.log(to);
  window.document.title = to.meta.zhName;
  if(to.meta.checkLogin==true){
    axios.get('site/account/islogin').then(response=>{
      // console.log(response);
      if(response.data.code == 'nologin'){
          router.push('/login');
      }else{
          next();
      }
      
  })
  }else{
    next();
  }
  
  
  
})

router.afterEach((to,from)=>{
  window.scroll(0,0)
})

const store = new Vuex.Store({
  state:{
    shopCartData: JSON.parse(window.localStorage.getItem('cartData'))||{},
    isLogin: false
  },
  // 方法
  mutations: {
    addCart (state,opt) {
      // console.log(state);
      // console.log(opt);
     if(state.shopCartData[opt.id]==undefined){
      //  state.shopCartData[opt.id]= opt.buycount
      Vue.set(state.shopCartData,opt.id,opt.buycount);

     }else{
       state.shopCartData[opt.id]+=opt.buycount;
     }
      
      
    },

    updateCart(state,opt){
      //更新购物车数据
      state.shopCartData[opt.id] = opt.newCount;
    },

    delCart(state,id){
      //根据id删除购物车数据
      Vue.delete(state.shopCartData,id);
    },

    changeLoginState(state,loginState){
        state.isLogin = loginState;
    }
  },
  //计算属性
  getters: {
    cartGoodCount: state => {
      let totalCount = 0;
      for (const key in state.shopCartData) {
        totalCount += state.shopCartData[key];
          
        }
        return totalCount;
      }
    }
  
})

new Vue({
  render: h => h(App),
  router,
  store,
  created(){
    axios.get('site/account/islogin').then(response=>{
      // console.log(response);
      if(response.data.code=="nologin"){
        store.commit('changeLoginState',false);
      }else{
        store.commit('changeLoginState',true);
      }
      
    })
  }
}).$mount('#app')

window.onbeforeunload = function(){
  window.localStorage.setItem('cartData',JSON.stringify(store.state.shopCartData))
}
