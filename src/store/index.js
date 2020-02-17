import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: localStorage.getItem('token') || null
  },
  getters:{},
  mutations:{},
  actions: {
    LOGIN: ({commit}, payload) => {
      return new Promise((resolve, reject) => {
          axios
          .post(`Auth`, payload)
          .then(({data, status}) => {
              if(status === 200) {
                  resolve(data)
              } else if(status === 400) {
                  reject("400")
              }
          }).catch(error => {
              reject(error)
          });
      })
    },
    LOGOUT: (state) => {
      localStorage.removeItem('token');
      state.state.isLoggedIn = '';
      axios.defaults.headers.common['Authorization'] = '';
    }
  }
})