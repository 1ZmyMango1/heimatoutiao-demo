import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './store'

// 引入样式
import './styles/index.less'

// 引入组件
import ToutiaoIcon from './components/ToutiaoIcon'

// 引入rem适配
import 'amfe-flexible'

// 引入axios
import request from './utils/request'

// 引入vant 引入样式
import vant from 'vant'
import 'vant/lib/index.less'

// 测试请求是否可以用
request.get('/v1_0/channels').then((res) => {
  console.log(res.data.data.channels)
})
Vue.use(vant)

// 注册全局组件
Vue.component('ToutiaoIcon', ToutiaoIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
