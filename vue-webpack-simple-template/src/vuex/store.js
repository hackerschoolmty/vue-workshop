import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  categories: {
    all: []
  }
}

const getters = {
  getAllCategories: state => state.categories.all
}

const mutations = {
  setCategories (state, categories) {
    state.categories.all = categories
  },
  selectCategory (state, category) {
    category.selected = !category.selected
  }
}
const actions = { 
  fetchCategories: ({ commit }) => {
    var url = 'https://raw.githubusercontent.com/jesuslerma/vuejs101-guide/master/categories.json'
    axios.get(url).then(function (response) {
      commit('setCategories', response.data)
    })
  },
  selectCategory({ commit }, category) {
    commit('selectCategory', category)
  }
}

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: debug
})