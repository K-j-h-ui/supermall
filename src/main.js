import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from './store'

import toast from 'components/common/toast'
import FastClick from "fastclick"
import VueLazyLoad from "vue-lazyload"

Vue.config.productionTip = false

Vue.use(toast)

Vue.prototype.$bus = new Vue()

FastClick.attach(document.body)

Vue.use(VueLazyLoad,{
  loading:require("./assets/images/common/placeholder.png")
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
