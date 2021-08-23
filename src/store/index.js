import { createStore } from 'vuex'

export default createStore({
  state: {
    empresa: {},
    departamentos: [],
    cargos: []
  },
  mutations: {
    editEmpresa(state, empresa) {
      localStorage.setItem('infoEmpresa', JSON.stringify(empresa))
      state.empresa = empresa;
      alert('Informações da empresa salvas com sucesso.');
    },
    loadEmpresa(state, empresa) {
      state.empresa = empresa;
    },
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    addDepartamento(state, departamento) {
      if (state.departamentos) {
          state.departamentos.push(departamento);
          localStorage.setItem('departamentos', JSON.stringify(state.departamentos));
      } else {
          var deptos = [];
          deptos.push(departamento);
          state.departamentos = deptos;
          localStorage.setItem('departamentos', JSON.stringify(state.departamentos));
      }
      alert('Departamento adicionado com sucesso.');
    },
    loadDepartamentos(state, departamentos) {
      state.departamentos = departamentos;
    },
    deleteDepartamento(state, id) {
      state.departamentos.splice(id, 1);
      localStorage.setItem('departamentos', JSON.stringify(state.departamentos));
    },
    editDepartamento(state, objForEdition) {
      state.departamentos[objForEdition.idOfNewDepartment].nome = objForEdition.newDepartamento.nome;
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
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  addDepartamento({ commit }, departamento) {

    if (localStorage.getItem('departamentos') &&
         JSON.parse(localStorage.getItem('departamentos')).find(element => element.nome == departamento.nome.trim())) {
          alert('Erro: departamento já existe.');
    } else {
      commit('addDepartamento', departamento);
    }

  },
  loadDepartamentos({ commit }) {
    if (localStorage.getItem('departamentos')) {
      commit('loadDepartamentos', JSON.parse(localStorage.getItem('departamentos')) );
    } else {
      commit('loadDepartamentos', null);
    }      
  },
  deleteDepartamento({ commit }, id) {
    commit('deleteDepartamento', id);
  },
  editDepartamento({ commit }, objForEdition) {
    commit('editDepartamento', objForEdition);
  }
  
  },
  modules: {

  }
})
