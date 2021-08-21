import { createStore } from 'vuex'

export default createStore({
  state: {
    empresa: {}
  },
  mutations: {
    editEmpresa(state, empresa) {
      localStorage.setItem('infoEmpresa', JSON.stringify(empresa))
      state.empresa = empresa;
    },
    loadEmpresa(state, empresa) {
      state.empresa = empresa;
    }
  },
  actions: {
    editEmpresa({ commit }, empresa) {
      commit('editEmpresa', empresa);
    },

    loadEmpresa({ commit }) {
      if (localStorage.getItem('infoEmpresa')) {
        commit('loadEmpresa', JSON.parse(localStorage.getItem('infoEmpresa')) );
      } else {
        commit('loadEmpresa', null);
      }      
    },
  },
  modules: {

  }
})
