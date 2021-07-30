import Vue from 'vue'
import Vuex from 'vuex'
import BoardgameService from '../services/boardgame.service';
import FavoritesService from '../services/favorites.service';
import categories from "./categories";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: true,
    boardgames: [],
    favorites: [],
    boardgame: {},
    categories: categories,
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload
    },
    SET_BOARDGAMES(state, payload) {
      state.boardgames = payload
    },
    SET_FAVORITES(state, payload) {
      state.favorites = payload
    },
    SET_BOARDGAME(state, payload) {
      state.boardgame = payload
    },
  },
  actions: {
    async getFavorites({commit}, category = null) {
      commit('SET_LOADING', true)

      const resp = await FavoritesService.findAll(category)
      const boardgames = resp.data

      commit('SET_LOADING', false)

      if (boardgames == null) return;


      commit('SET_FAVORITES', boardgames)
    },
    async getBoardgames({commit}) {
      commit('SET_LOADING', true)

      const resp = await BoardgameService.findAll()
      const boardgames = resp.data

      commit('SET_LOADING', false)

      if (boardgames == null) return;

      commit('SET_BOARDGAMES', boardgames)
    },
    async getBoardgame({commit}, id) {
      commit('SET_LOADING', true)

      const resp = await BoardgameService.find(id)
      const boardgame = resp.data

      commit('SET_LOADING', false)

      if (boardgame == null) return;

      commit('SET_BOARDGAME', boardgame)
    },
  },
  modules: {
  }
})
