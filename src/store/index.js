import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userName: 'Yoga'
  },
  mutations: {
    updateUserName(state, payload) {
      state.userName = payload
    }
  },
  actions: {
    doUpdateUserName({commit}, payload) {
      commit('updateUserName', payload)
    }
  },
  getters: {
    getUserName(state) {
      return state.userName
    }
  }
})