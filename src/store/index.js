import { createStore } from 'vuex'

export default createStore({
  state: {
    empresa: {},
    departamentos: [],
    cargos: [],
    colaboradores: [],
    usuarios: [],
    areas: []
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
},
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Usuário/Usuários mutations
addUsuario(state, newUsuario) {
  if (state.usuarios) {
    state.usuarios.push(newUsuario);
    localStorage.setItem('usuarios', JSON.stringify(state.usuarios));
  } else {
    var usuarios = [];
    usuarios.push(newUsuario);
    state.usuarios = usuarios;
    localStorage.setItem('usuarios', JSON.stringify(state.usuarios));
  }
  alert('Usuário adicionado com sucesso.');
},  
loadUsuarios(state, usuarios) {
  state.usuarios = usuarios;
},
editUsuario(state, objForEditing) {
  state.usuarios[objForEditing.idOfNewUsuario] = objForEditing.usuarioForEditing;
},
deleteUsuario(state, id) {
  state.usuarios.splice(id, 1);
  localStorage.setItem('usuarios', JSON.stringify(state.usuarios));
},
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Usuário/Usuários mutations
addArea(state, newArea) {
  if (state.areas) {
    state.areas.push(newArea);
    localStorage.setItem('areas', JSON.stringify(state.areas));
  } else {
    var areas = [];
    areas.push(newArea);
    state.areas = areas;
    localStorage.setItem('areas', JSON.stringify(state.areas));
  }
  alert('Área adicionada com sucesso.');
},  
loadAreas(state, areas) {
  state.areas = areas;
},
editArea(state, objForEditing) {
  state.areas[objForEditing.idOfNewArea] = objForEditing.areaForEditing;
},
deleteArea(state, id) {
  state.areas.splice(id, 1);
  localStorage.setItem('areas', JSON.stringify(state.areas));
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
},
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Usuário/Usuários actions
addUsuario({ commit }, newUsuario) {
  if (localStorage.getItem('usuarios') &&
       JSON.parse(localStorage.getItem('usuarios')).find(element => element.usuario == newUsuario.usuario)) {
        alert('Erro: usuário já existe.');
  } else {
    commit('addUsuario', newUsuario);
  }
},
loadUsuarios({ commit }) {
  if (localStorage.getItem('usuarios')) {
    commit('loadUsuarios', JSON.parse(localStorage.getItem('usuarios')) );
  } else {
    commit('loadUsuarios', null);
  } 
},
editUsuario({ commit }, objForEditing) {
  commit('editUsuario', objForEditing);
},
deleteUsuario({ commit }, id) {
  commit('deleteUsuario', id);
},
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Área/áreas actions
addArea({ commit }, newArea) {
  if (localStorage.getItem('areas') &&
       JSON.parse(localStorage.getItem('areas')).find(element => element.titulo == newArea.titulo.trim())) {
        alert('Erro: o título inserido já existe.');
  } else {
    commit('addArea', newArea);
  }
},
loadAreas({ commit }) {
  if (localStorage.getItem('areas')) {
    commit('loadAreas', JSON.parse(localStorage.getItem('areas')) );
  } else {
    commit('loadAreas', null);
  } 
},
editArea({ commit }, objForEditing) {
  commit('editArea', objForEditing);
},
deleteArea({ commit }, id) {
  commit('deleteArea', id);
}
},
  modules: {

  }
})
