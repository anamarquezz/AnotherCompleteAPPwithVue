<template>
  <div v-resize="onResize">
    <v-layout wrap class="text-center">

      <v-flex xs12 class=" text-right">
        <v-btn color="blue darken-2 " dark large @click="updatecommments()"><b>
            <h4 class="dinline mr-2"><i class="fas fa-check-square mt-2"></i></h4>
          </b></v-btn>
      </v-flex>
      <v-flex xs12 sm6 md6 lg6 xl6 class=" mr-2">
        <v-toolbar dark color="blue">
          <v-toolbar-title class="white--text ">
            Comentarios Evaluador
          </v-toolbar-title>
        </v-toolbar>
        <v-textarea id="textareaComment" box name="input-7-4" label="Retroalimentación por parte del evaluador" class=""
          color="blue" :value="g_empleadoaEvaluar.saveUpdateUser.comments">
        </v-textarea>
      </v-flex>


      <v-flex xs12 sm5 mdl5 lg6 xl5 class="ml-5 ">
        <v-toolbar dark color="blue">
          <v-toolbar-title class="white--text ">
            Comentarios Empleado
          </v-toolbar-title>
        </v-toolbar>

        <v-textarea id="textareaFeedback" box name="input-7-4" label="Comentarios por parte del empleado."
          :value="g_empleadoaEvaluar.saveUpdateUser.feedBack_Comments" class="" color="blue">
        </v-textarea>
      </v-flex>
    </v-layout>
  </div>


  <!--  <v-toolbar dark>
        <h5>FIRMAS</h5>
      </v-toolbar>

      <v-layout row wrap>
        <v-flex xs10 sm10 mdl10 lg10 xl10 class="mt-2 mb-2">
          <v-text-field outline label="Firma Empleado:" prepend-inner-icon="fa fa-user"></v-text-field>
        </v-flex>
        <v-flex xs2 sm2 mdl2 lg2 xl2 class="mb-2">
          <v-btn fab dark small class="indigo accent-3">
            <v-icon dark>fas fa-edit</v-icon>
          </v-btn>
        </v-flex>

        <v-flex xs10 sm10 mdl10 lg10 xl10 class="mb-2">
          <v-text-field outline label="Nombre:" prepend-inner-icon="fa fa-user"></v-text-field>
        </v-flex>
        <v-flex xs2 sm2 mdl2 lg2 xl2>
          <v-btn fab dark small class="indigo accent-3">
            <v-icon dark>fas fa-edit</v-icon>
          </v-btn>
        </v-flex>


        <v-flex xs10 sm10 mdl10 lg10 xl10 class="mb-2">
          <v-text-field outline label="Supervisor" prepend-inner-icon="fas fa-user-tie"></v-text-field>
        </v-flex>
        <v-flex xs2 sm2 mdl2 lg2 xl2>
          <v-btn fab dark small class="indigo accent-3">
            <v-icon dark>fas fa-edit</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
-->
</template>

<script>
  export default {
    name: 'firmas',
    props: {},
    data() {
      return {
        isMobile: false,
        rating: 5
      }
    },
    methods: {
      onResize() {
        if (window.innerWidth < 769)
          this.isMobile = true;
        else
          this.isMobile = false;
      },
      updatecommments() {
        this.$store.dispatch("s_comments", {
          comments: document.getElementById('textareaComment').value,
          feedBack_Comments: document.getElementById('textareaFeedback').value
        });
      }
    },
    computed: {
      g_empleadoaEvaluar() {
        return this.$store.getters.g_empleadoaEvaluar;
      },
      g_firmasEMP() {
        var firmas = this.$store.getters.g_empleadoaEvaluar.empleadoaEvaluar.evaluationResultsignatureInfo;
        return firmas.signatureInfo[firmas.signatureInfo.findIndex(el => el.code === 'EMP')].Signature;
      },
      g_firmasGeren() {
        var firmas = this.$store.getters.g_empleadoaEvaluar.empleadoaEvaluar.evaluationResultsignatureInfo;
        return firmas.signatureInfo[firmas.signatureInfo.findIndex(el => el.code === 'GEAR')].Signature;
      },
      g_firmasGerenRH() {
        var firmas = this.$store.getters.g_empleadoaEvaluar.empleadoaEvaluar.evaluationResultsignatureInfo;
        return firmas.signatureInfo[firmas.signatureInfo.findIndex(el => el.code === 'GERH')].Signature;
      },
      g_firmasSup() {
        var firmas = this.$store.getters.g_empleadoaEvaluar.empleadoaEvaluar.evaluationResultsignatureInfo;
        return firmas.signatureInfo[firmas.signatureInfo.findIndex(el => el.code === 'SUP')].Signature;
      },

    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../../assets/css/global.css';



  @import '../../../../assets/css/media_query.css';

</style>
