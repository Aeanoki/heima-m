import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/localStorage.js'

Vue.use(Vuex)

const tokenKey = 'USERTOKEN'
export default new Vuex.Store({
  state: {
    user: getItem(tokenKey),
    dynamicLayout: ['LayoutIndex']
  },
  getters: {},
  mutations: {
    xguser(state, data) {
      state.user = data
      setItem(tokenKey, state.user)
    },
    addLayo(state, lay) {
      console.log('add')
      if (!state.dynamicLayout.includes(lay)) {
        state.dynamicLayout.push('LayoutIndex')
      }
    },
    removeLay(state, lay) {
      console.log('remove')

      if (state.dynamicLayout.includes(lay)) {
        const index = state.dynamicLayout.indexOf(lay)

        // state.dynamicLayout.push('LayoutIndex')
        state.dynamicLayout.splice(index, 1)
      }
    }
  },
  actions: {},
  modules: {}
})
