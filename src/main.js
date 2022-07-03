import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './store'

// 引入样式
import './styles/index.less'

// 引入组件
import ToutiaoIcon from './components/ToutiaoIcon'

// 注册全局组件
Vue.component('ToutiaoIcon', ToutiaoIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
