import axios from "axios";

//repositori dos personagens
const state = {
    characters:[],  //lista dos personagens
    character: ''  //personagem que vai ser detalhado
  };
  
  const getters = {
    allCharacters: state => state.characters,  //retorna a lista (tipo um get do Java)
    character: state => state.character,    //retorna o personagem que vai ser detalhado
  };

  const actions = {
    getCharacters({ commit }) {  //consumindo a api
        axios.get(
            "https://rickandmortyapi.com/api/character"

          ).then((response) => {
            commit('getCharacters', response.data.results);  //chamada d afunção mutation que altera a lista preenchendo com os personagens da api
        });
    },
    addCharacters({commit} , new_character){
      commit('addCharacters', new_character); //função de add personagens
    },
    deleteCharacters({commit}, id){
        commit('deleteCharacters', id);  //função de deltar
    },
    byId({commit}, id){
      commit('byId', id)  //obter por id
    },
    updateCharacter({ commit }, character) {
      commit("updateCharacter", character);  //alterar dados de um personagem
    },
    
    
  };
  const mutations = {//mutations são usados pelas funções de cima para obter acesso ao state e editar. As edições na lista e no personagem que vai ser exibidos
    getCharacters: (state, characters) => (state.characters = characters), //so podem ser feitas aqui
    addCharacters: (state, new_character) => state.characters.push(new_character),  
    deleteCharacters: (state, id) => state.characters = state.characters.filter(f => f.id !== id),
    byId: (state, id) => state.character = state.characters.filter(f => f.id == id)[0],
    updateCharacter: (state, data) => {
      const index = state.characters.findIndex(t => t.id === data.id)
      if (index !== -1) {
        state.characters.splice(index, 1, data);
        }
      }
  };
 
  export default {
    state,
    getters,
    actions,
    mutations,
  };
  