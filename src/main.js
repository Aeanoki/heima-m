import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/index.less'
import vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import '@/utils/dayjs'
// import vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(vant)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
