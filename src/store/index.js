import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"


Vue.use(Vuex)

// const store = new Vuex.Store({
//   // Store要大写
//   state:{
//     cartList:[]
//   },
//   mutations:{
//     addCart(state,payload){
//       state.cartList.push(payload)
//     }
//   }
// })
const state = {
  cartList:[]
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
 getters,
})

export default store