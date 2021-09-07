import { createStore } from 'vuex';
import router from '../router/index.js';

export default createStore({
  state: {
    //empresa: {},
    empresa: null,
    departamentos: [],
    cargos: [],
    colaboradores: [],
    usuarios: [],
    areas: [],
    restricoes: [],

    /* ||||||||||||||||||||||||||||||||||||||
    |||||||||||| Autenticação ;) ||||||||||||
    |||||||||||||||||||||||||||||||||||||| */
    userAllowed: false,
    userName: null
  },
  mutations: {
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Empresa mutations
    editEmpresa(state, empresa) {
      state.empresa = empresa;
      localStorage.setItem('empresa', JSON.stringify(empresa));
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
      localStorage.setItem('departamentos', JSON.stringify(state.departamentos));
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
  localStorage.setItem('cargos', JSON.stringify(state.cargos));
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
  localStorage.setItem('colaboradores', JSON.stringify(state.colaboradores));
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
  localStorage.setItem('usuarios', JSON.stringify(state.usuarios));
},
deleteUsuario(state, id) {
  state.usuarios.splice(id, 1);
  localStorage.setItem('usuarios', JSON.stringify(state.usuarios));
},
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Área/Áreas mutations
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
  localStorage.setItem('areas', JSON.stringify(state.areas));
},
deleteArea(state, id) {
  state.areas.splice(id, 1);
  localStorage.setItem('areas', JSON.stringify(state.areas));
  },
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Restrição/Restrições mutations
addRestricao(state, newRestricao) {
  if (state.restricoes) {
    state.restricoes.push(newRestricao);
    localStorage.setItem('restricoes', JSON.stringify(state.restricoes));
  } else {
    var restricoes = [];
    restricoes.push(newRestricao);
    state.restricoes = restricoes;
    localStorage.setItem('restricoes', JSON.stringify(state.restricoes));
  }
  alert('Restrição adicionada com sucesso.');
},  
loadRestricoes(state, restricoes) {
  state.restricoes = restricoes;
},
editRestricao(state, objForEditing) {
  state.restricoes[objForEditing.idOfNewRestricao] = objForEditing.restricaoForEditing;
  localStorage.setItem('restricoes', JSON.stringify(state.restricoes));
},
deleteRestricao(state, id) {
  state.restricoes.splice(id, 1);
  localStorage.setItem('restricoes', JSON.stringify(state.restricoes));
},
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Registro/Registros mutations
addRegistro(state, newRegistro) {
  if (state.registros) {
    state.registros.push(newRegistro);
    localStorage.setItem('registros', JSON.stringify(state.registros));
  } else {
    var registros = [];
    registros.push(newRegistro);
    state.registros = registros;
    localStorage.setItem('registros', JSON.stringify(state.registros));
  }
},  
loadRegistros(state, registros) {
  state.registros = registros;
},
deleteRegistro(state, id) {
  state.registros.splice(id, 1);
  localStorage.setItem('registros', JSON.stringify(state.registros));
},
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Autenticação mutations
checkAuthenticity(state, obj) {
  state.userAllowed = obj.resultado;
  state.userName = obj.nomeDoCara;
},
logOff(state){
  state.userAllowed = false;
  state.userName = null;
}
},

  actions: {
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Empresa actions
    editEmpresa({ commit }, empresa) {
      commit('editEmpresa', empresa);
      commit('addArea', empresa.area);
    },

    loadEmpresa({ commit }) {
      if (localStorage.getItem('empresa')) {
        commit('loadEmpresa', JSON.parse(localStorage.getItem('empresa')) );
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
},
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Restrição/Restrições actions
addRestricao({ commit }, newRestricao) {
  if (localStorage.getItem('restricoes') && 
       JSON.parse(localStorage.getItem('restricoes')).find(element => element.titulo == newRestricao.titulo.trim())) {
        alert('Erro: o título inserido já existe.');
  } else {
    commit('addRestricao', newRestricao);
  }
},
loadRestricoes({ commit }) {
  if (localStorage.getItem('restricoes')) {
    commit('loadRestricoes', JSON.parse(localStorage.getItem('restricoes')) );
  } else {
    commit('loadRestricoes', null);
  } 
},
editRestricao({ commit }, objForEditing) {
  commit('editRestricao', objForEditing);
},
deleteRestricao({ commit }, id) {
  commit('deleteRestricao', id);
},
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Registro/Registros actions
addRegistro({ commit }, newRegistro) {
    commit('addRegistro', newRegistro);
},
loadRegistros({ commit }) {
  if (localStorage.getItem('registros')) {
    commit('loadRegistros', JSON.parse(localStorage.getItem('registros')) );
  } else {
    commit('loadRegistros', null);
  } 
},
deleteRegistro({ commit }, id) {
  commit('deleteRegistro', id);
},
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Autenticação actions
checkAuthenticity({ commit }, usuarioEsenha) {
  // alert('Verificando credenciais...');

    var usuarios      = JSON.parse(localStorage.getItem('usuarios'));
    var colaboradores = JSON.parse(localStorage.getItem('colaboradores'));
    
    // console.log(usuarios);
    //   console.log(colaboradores);
    //     console.log(usuarioEsenha);    

    let autorizado = false;
    let nomeDoUsuario = null;

  if (usuarios && colaboradores) {
      
      usuarios.forEach(u => {
        if ( colaboradores.find(c => { return c.id == u.usuario }).matricula == usuarioEsenha.usuario &&
             u.senha == usuarioEsenha.senha &&
            (u.eadm == '1' ||
             u.eadm == 1)) {
                autorizado = true;
                nomeDoUsuario = colaboradores.find(c => { return c.id == u.usuario }).nome;
            }
      });

      if (autorizado) {
        // alert('Verificação de credenciais concluída: credenciais válidas.');
        // alert('Bem vindo(a), ' + nomeDoUsuario + '!');
        router.push('/pagina_inicial');
        commit('checkAuthenticity', {resultado: autorizado, nomeDoCara: nomeDoUsuario});
      } else {
        alert('Erro: credenciais inválidas.');
        commit('checkAuthenticity', {resultado: autorizado, nomeDoCara: nomeDoUsuario});
      }
             
      } else {
        alert('Erro: nenhum usuário e/ou colaborador cadastrado.');
        commit('checkAuthenticity', {resultado: autorizado, nomeDoCara: nomeDoUsuario});
      }
},
logOff({commit}) {
  commit('logOff');
}
},

  modules: {

  }
})
