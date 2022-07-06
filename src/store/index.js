import Vue from 'vue'
import Vuex from 'vuex'
import { getLocal, setLocal } from '@/utils/storage'

const toukenKey = 'toutiao_touken'

Vue.use(Vuex)

export default new Vuex.Store({
  // 用于存储全局状态数据
  state: {
    user: getLocal(toukenKey)
  },
  getters: {},
  // 修改状态的唯一入口
  // 只允许有同步状态
  mutations: {
    // 修改state里面的user数据的方法
    setUser(state, user) {
      // 存储到vuex中
      state.user = user
      // 存储本地存储
      setLocal(toukenKey, user)
    }
  },
  // 异步状态修改
  actions: {},
  modules: {}
})
