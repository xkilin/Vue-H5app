import Vue from 'vue'
import App from './App.vue'
import router from './router'   //引入vue-router模块
import store from './store'   //引入vuex 的js文件

import Vant from 'vant';        //引入vantui框架
import 'vant/lib/index.css';
Vue.use(Vant);        


Vue.config.productionTip = false

new Vue({
  store,
  router, //当把路由对象注入后, 此项目就会开始监听你写的hash值!!!!
  render: h => h(App),
}).$mount('#app')
