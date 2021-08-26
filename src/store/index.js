import { createStore } from 'vuex'

export default createStore({
  state: {
    empresa: {},
    departamentos: [],
    cargos: [],
    colaboradores: []
  },
  mutations: {
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Empresa mutations
    editEmpresa(state, empresa) {
      localStorage.setItem('infoEmpresa', JSON.stringify(empresa))
      state.empresa = empresa;
      alert('Informações da empresa salvas com sucesso.');
    },
    loadEmpresa(state, empresa) {
      state.empresa = empresa;
    },
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Departamento/Departamentos mutations
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
    editDepartamento(state, objForEditing) {
      state.departamentos[objForEditing.idOfNewDepartment].nome = objForEditing.newDepartamento.nome;
    },
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Cargo/Cargos mutations
addCargo(state, cargo) {
  if (state.cargos) {
      state.cargos.push(cargo);
      localStorage.setItem('cargos', JSON.stringify(state.cargos));
  } else {
      var cargos = [];
      cargos.push(cargo);
      state.cargos = cargos;
      localStorage.setItem('cargos', JSON.stringify(state.cargos));
  }
  alert('Cargo adicionado com sucesso.');
},
loadCargos(state, cargos) {
  state.cargos = cargos;
},
deleteCargo(state, id) {
  state.cargos.splice(id, 1);
  localStorage.setItem('cargos', JSON.stringify(state.cargos));
},
editCargo(state, objForEditing) {
  state.cargos[objForEditing.idOfNewRole].nome = objForEditing.newCargo.nome;
},
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Colaborador/Colaboradores mutations
addColaborador(state, newColaborador) {
  if (state.colaboradores) {
    state.colaboradores.push(newColaborador);
    localStorage.setItem('colaboradores', JSON.stringify(state.colaboradores));
  } else {
    var colaboradores = [];
    colaboradores.push(newColaborador);
    state.colaboradores = colaboradores;
    localStorage.setItem('colaboradores', JSON.stringify(state.colaboradores));
  }
  alert('Colaborador adicionado com sucesso.');
},  
loadColaboradores(state, colaboradores) {
  state.colaboradores = colaboradores;
},
editColaborador(state, objForEditing) {
  state.colaboradores[objForEditing.idOfNewColaborador] = objForEditing.colaboradorForEditing;
},
deleteColaborador(state, id) {
  state.colaboradores.splice(id, 1);
  localStorage.setItem('colaboradores', JSON.stringify(state.colaboradores));
}
  },
  actions: {
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Empresa actions
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
// Departamento/Departamentos actions
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
  editDepartamento({ commit }, objForEditing) {
    commit('editDepartamento', objForEditing);
  },
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Cargo/Cargos actions
addCargo({ commit }, cargo) {

  if (localStorage.getItem('cargos') &&
       JSON.parse(localStorage.getItem('cargos')).find(element => element.nome == cargo.nome.trim())) {
        alert('Erro: cargo já existe.');
  } else {
    commit('addCargo', cargo);
  }

},
loadCargos({ commit }) {
  if (localStorage.getItem('cargos')) {
    commit('loadCargos', JSON.parse(localStorage.getItem('cargos')) );
  } else {
    commit('loadCargos', null);
  }      
},
deleteCargo({ commit }, id) {
  commit('deleteCargo', id);
},
editCargo({ commit }, objForEditing) {
  commit('editCargo', objForEditing);
},
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Colaborador/Colaboradores actions
addColaborador({ commit }, newColaborador) {
  if (localStorage.getItem('colaboradores') &&
       JSON.parse(localStorage.getItem('colaboradores')).find(element => element.matricula == newColaborador.matricula.trim())) {
        alert('Erro: matrícula repetida.');
  } else {
    commit('addColaborador', newColaborador);
  }
},
loadColaboradores({ commit }) {
  if (localStorage.getItem('colaboradores')) {
    commit('loadColaboradores', JSON.parse(localStorage.getItem('colaboradores')) );
  } else {
    commit('loadColaboradores', null);
  } 
},
editColaborador({ commit }, objForEditing) {
  commit('editColaborador', objForEditing);
},
deleteColaborador({ commit }, id) {
  commit('deleteColaborador', id);
}
},
  modules: {

  }
})
