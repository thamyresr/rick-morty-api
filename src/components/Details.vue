<template>
<div>
    <div>
      <router-link tag="button" class="btn btn-outline-dark btn-sm" :to="{name: 'Index'}">Voltar para listagem</router-link>
    </div>
    <div>
    <b-row v-if="getCharacter != undefined">
        <b-col class="col-lg-6 mb-4">
            <img v-if="getCharacter.image !== ''" :src="getCharacter.image" alt="">
            <img v-else src="../assets/logo.png" alt="">
        </b-col>
        <b-col class="col-lg-4 mb-4">
            <div>
                <h3><strong> {{getCharacter.name}} </strong> </h3>
            </div>
            <div>
                <p><strong>Status:</strong> {{getCharacter.status}} </p>
            </div>
            <div>
                <p><strong>Species:</strong> {{getCharacter.species}} </p>
            </div>
            <div>
                <p><strong>Gender:</strong> {{getCharacter.gender}} </p>
            </div>
            <div>
                <p><strong>Created:</strong> {{returnDate(getCharacter.created)}} </p>
            </div>
        </b-col>
        <hr>
    </b-row>
    <b-col v-else>
      <h2>Error: Dados não encontrados</h2>
    </b-col>
    </div>
    <Edit :character="getCharacter"/>
</div>

</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Edit from './Edit.vue';
import moment from 'moment';
//tela de detalhar sem muitos detalhes
export default {
    name: "Details",
    components:{
      Edit
    },
    computed: {
        ...mapGetters(["character"]),
        getCharacter: function(){  //função para obter o personagem pelo id
            let id = this.$route.params.id
            this.byId(id)
            return this.character
        }
    },methods:{
        ...mapActions(["getCharacters","byId"]),
        returnDate(date){  //função para padronizar as datas dos personagens criados e os da API
            return moment(String(date)).format('DD/MM/YYYY')
        }
    }
};
</script>
<style scoped>
</style>
