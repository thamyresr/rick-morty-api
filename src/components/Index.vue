<template>
  <div>
    <b-col class="mb-2">
      <button @click="toggle === false ? toggle = true : toggle = false">New Character</button>
      <div v-show="toggle">
        <AddCharacter />
      </div>
    </b-col>
    <b-col>
      <b-form-input
        type="text"
        id="text-search"
        placeholder="Buscar ..."
        v-model="search"
        class="m-auto w30"
      ></b-form-input>
    </b-col>
    <hr>
    <div class="row mt-2">
      <div class="w-85 m-auto" v-if="filteredCharacters <= 0">
        <h1>Sem dados</h1>
      </div>
      <div
        class="col-lg-3 mb-4"
        v-for="u in filteredCharacters || allCharacters"
        :key="u.id"
      >
        <b-card no-body class="overflow-hidden" style="max-width: 540px">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img
                :src="u.image"
                alt="Image"
                class="rounded-0"
              ></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body :title="u.name">
                <b-card-text>
                 <strong>Gender:</strong>{{ u.gender }}
                </b-card-text>
                 <router-link
                tag="button"
                :to="{ name: 'Details', params: { id: u.id } }"
                class="btn btn-outline-primary btn-sm"
              >Details</router-link>
              <button
                @click="deleteCharacters(u.id)"
                type="button"
                class="btn btn-outline-danger btn-sm"
              >
                Delete
              </button>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AddCharacter from "./AddCharacter";
//pagina da lista de personagens
export default {
  name: "Index",
  data() {
    return {
      search: "",
      toggle: false,
    };
  },
  components: {
    AddCharacter,
  },
  methods: {
    ...mapActions(["getCharacters", "deleteCharacters"]),
  },
  computed: {
    ...mapGetters(["allCharacters"]),
    filteredCharacters: function () {
      //função da pesquisa ( retorna os personagens cujo o nome contem o termo pesquisado)
      var self = this; //no html tem uma verificação pra caso essa função n retorne nada ele exibe uma mensagem de erro
      return this.allCharacters.filter(function (cust) {
        return cust.name.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
      });
    },
  },

  created() {
    this.getCharacters(); //obtém a lista da api para exibir
    console.log(this.allCharacters); //debug pode apagar
  },
};
</script>
<style scoped>
.m2 {
  margin: auto;
}
.w30 {
  width: 30%;
}
.gone{
  display: none;
}
</style>
