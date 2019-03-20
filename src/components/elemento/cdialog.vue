<template>

  <v-layout row justify-center>

    <v-dialog v-model="gsw_dialog" persistent  width="500">


      <v-card>
        <v-card-title class="headline blue darken-1 text-white" primary-title>
          <h4>Evaluar Empleado</h4>
        </v-card-title>

        <v-card-text>
          <v-flex x12>
            <h3>¿Estás Seguro de evaluar al siguiente empleado?</h3>
          </v-flex>

          <v-flex xl12 text-center>
            <img :src="g_cDialog.Image"  class="icondialog rounded-circle mt-1 mb-1 " />
          </v-flex>
          <v-flex xl12 text-center>
            <p class="title">{{g_cDialog.PrettyName}}</p>
          </v-flex>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="gray" flat @click="act_regresar">
            Regresar
          </v-btn>
          <v-btn color="blue darken-2" dark large @click="act_continuar">
            continuar
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
  export default {
    name: 'cdialog',
    props: {},
    data() {
      return {       
      }
    },
    methods: {
      act_continuar: function(){
       
           this.$store.dispatch('GetEvaluationEmployee', empleadoSelectInfo);
      },
      act_regresar: function(){
          this.$store.dispatch('sw_dialog', false);
      }
      
    },
    computed: {
      g_cDialog() {
        return this.$store.getters.g_cDialog;
      },
      gsw_dialog(){
        return this.$store.getters.gsw_dialog;
      },
      Image(){
        return "data:image/png;base64," + this.$store.getters.g_cDialog.Image;
      }     
    },
  }
</script>

<style>
  @import '../../assets/css/global.css';
  @import '../../assets/css/media_query.css';
</style>