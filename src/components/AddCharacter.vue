<template>
  <div>
    <h2>Add new character</h2>
    <b-col class="col-lg-6 mb-4 m-auto">
    <b-form>
      <b-form-group
        id="fieldset-1"
        label="Enter character name"
        label-for="input-1"
        :invalid-feedback="invalidFeedback"
        :state="state"
      >
        <b-form-input
          id="input-1"
          v-model="name"
          :state="state"
          trim
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="fieldset-2"
        label="Enter character specie"
        label-for="input-3"
        :state="state"
      >
        <b-form-input id="input-2" v-model="species" trim></b-form-input>
      </b-form-group>
      <b-form-group
        id="fieldset-3"
        label="Enter character gender"
        label-for="input-3"
        :state="state"
      >
        <b-form-input id="input-4" v-model="gender" trim></b-form-input>
      </b-form-group>
      <div>
        <b-form-select v-model="selected" :options="options"></b-form-select>
      </div>
      <div class="m-2">
        <b-button variant="primary" @click="createCharacter()">Save</b-button>
      </div>
    </b-form>
    </b-col>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from 'moment';
//Adicionar um personagem na lista
export default {
  name: "AddCharacter",
  data() {
    return {
      name: "",  //aqui pega os atributos do personagem que foram inputados no html
      species: "",
      gender: "",
      created: moment().format('DD/MM/YYYY'),
      selected: "Alive",
      options: [ //aqui é o cheked box
        { value: "Alive", text: "Alive" },
        { value: "Dead", text: "Dead" },
        { value: "unknown", text: "unknown" },
      ],
    };
  },
  methods: {
    ...mapActions(["addCharacters"]),
    createCharacter() {  //função para criar o personagem e add na lista
      let character = {
        name: this.name,
        id: this.generateId(), //metodo para gerar um id, ele procura o maior id da lista e acrescenta 1 para fazer o novo id
        status: this.selected,
        species: this.species,
        gender: this.gender,
        image: "https://rickandmortyapi.com/api/character/avatar/19.jpeg",
        created: this.created,
      };
      this.addCharacters(character);
    },
    generateId(){  //metodo de pegar o id
        let ids = []
        for(let _ of this.allCharacters){
            ids.push(_.id)
        }
        let id = Math.max.apply(null, ids) + 1
        console.log(id)
        return id
    }
  },
  computed: {
    ...mapGetters(["allCharacters"]),
    state() {
      return this.name.length >= 3;  //verifica se o nome do personagem é >= 3 (acho q é obrigatório)
    },
    invalidFeedback() {
      if (this.name.length > 0) {     //feedback pra caso o nome n tenha 3 letras ou mais
        return "Enter at least 3 characters.";
      }
      return "Please enter something.";
    },
  },
};
</script>
<style scoped>
</style>
