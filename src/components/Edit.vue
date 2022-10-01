<template>
<div>
    <b-col class="col-lg-6 mb-4 m-auto">
        <h2>Edit character</h2>
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
        <b-button variant="primary" class="btn-md w-25" @click="characterEdit()">Save</b-button>
      </div>
    </b-form>
    </b-col>
</div>

</template>

<script>
import { mapActions, mapGetters } from "vuex";
//tela de edição (aparece junto com a de detalhe)
export default {
    name: "Edit",
    props:{
        character: Object  //recebe o objeto do personagem pelo props
    },
    data() {
    return {
      name: "",  //lê os dados inputados no form
      species: "",
      gender: "",
      selected: null,
      options: [
        { value: "Alive", text: "Alive" },
        { value: "Dead", text: "Dead" },
        { value: "unknown", text: "unknown" },
      ],
    };
  },
  methods: {
    ...mapActions(["updateCharacter"]),
    characterEdit() {  //edita os dados do personagem garantido que se um ou mais campos n forem preenchidos ele mantem o valor antigo
      let character = this.character  //não altera id/foto/data de criaçaõ
      character.name = this.name
      character.species = this.species
      character.gender = this.gender
      character.status = this.selected
      this.updateCharacter(character);  //função de atualizar o personagem
    }
  },
  computed: {
    ...mapGetters(["allCharacters"]),
    state() {
      return this.name.length >= 4;
    },
    invalidFeedback() {
      if (this.name.length > 0) {
        return "Enter at least 4 characters.";
      }
      return "Please enter something.";
    },
  },
};
</script>
<style scoped>
</style>
