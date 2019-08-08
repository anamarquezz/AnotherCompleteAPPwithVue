<template>
  <v-container grid-list v-resize="onResize" class="text-center">

    <div v-if="!isMobile">
      <v-flex xs12>
        <v-card dark color="indigo" class="white--text pt-1">
          <v-flex>
            <div class=" text-center mt-2">
              <img class="elevation-5 iconinfo rounded-circle " :src="g_empleadoaEvaluar.Image" />
            </div>
          </v-flex>
          <v-divider light></v-divider>
          <v-flex xs12 class="text-center white">
         <!--   <v-rating medium v-model="g_userRating" background-color="orange" color="orange" readonly="readonly"
              class=" ml-xl-5"></v-rating> -->
          </v-flex>
          <v-card-actions class="font-weith-bold title white black--text">
            <v-flex xs12 class=" white" subheading>
              <div class="subheading p-1 "><h4></h4>
              </div>
              <div class="headline p-1 mb-2"><b>#{{g_empleadoaEvaluar.Number}}, </b><b class="">{{g_empleadoaEvaluar.Name}} {{g_empleadoaEvaluar.PaternalSurname}},</b> 
              </div>
              <div class="subheading pb-2">Fecha de ingreso  :<b> {{g_empleadoaEvaluar.AdmissionDateFormat}}</b></div>
              <div class="subheading p-1">Puesto: <b>{{g_empleadoaEvaluar.Position}}</b></div>
                          <div class="subheading p-1">Salario: <b > ${{g_empleadoaEvaluar.Salary}}</b></div>
              <div class="subheading p-1">Departamento:<b> {{g_empleadoaEvaluar.Department}}</b></div>
              <div class="subheading p-1">Planta: <b>{{g_empleadoaEvaluar.Planta}} </b> </div>
              <div class="subheading p-1">Supervisor: <b>{{g_empleadoaEvaluar.SupervisorName}}, {{g_empleadoaEvaluar.SupervisorPaternalSurname}} </b></div>
              <div class="subheading p-1">Clasificación:<b> {{g_empleadoaEvaluar.Clasification}}</b></div>

            </v-flex>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-flex>

    </div>


    <div v-else>

      <v-flex xs12>
        <v-card dark color="indigo" class="white--text pt-1">
          <v-flex>
            <div class=" text-center mt-5">
              <img class="elevation-5 iconinfo rounded-circle " :src="g_empleadoaEvaluar.Image" />
            </div>
          </v-flex>
          <v-divider light></v-divider>
          <v-flex xs12 class="text-center white">
          <!--  <v-rating medium v-model="g_userRating" background-color="orange" color="orange" readonly="readonly"
              class=" ml-xl-5"></v-rating> -->
          </v-flex>
          <v-card-actions class="font-weith-bold title white black--text">
             <v-flex xs12 class=" white" subheading>
              <div class="subheading p-1 "><h4></h4>
              </div>
              <div class="headline p-1 mb-2"><b>#{{g_empleadoaEvaluar.Number}}, </b><b class="">{{g_empleadoaEvaluar.Name}} {{g_empleadoaEvaluar.PaternalSurname}},</b> 
              </div>
              <div class="subheading pb-2">Fecha de ingreso  :<b> {{g_empleadoaEvaluar.AdmissionDateFormat}}</b></div>
              <div class="subheading p-1">Puesto: <b>{{g_empleadoaEvaluar.Position}}</b></div>
                          <div class="subheading p-1">Salario: <b > ${{g_empleadoaEvaluar.Salary}}</b></div>
              <div class="subheading p-1">Departamento:<b> {{g_empleadoaEvaluar.Department}}</b></div>
              <div class="subheading p-1">Planta: <b>{{g_empleadoaEvaluar.Planta}} </b> </div>
              <div class="subheading p-1">Supervisor: <b>{{g_empleadoaEvaluar.SupervisorName}}, {{g_empleadoaEvaluar.SupervisorPaternalSurname}} </b></div>
              <div class="subheading p-1">Clasificación:<b> {{g_empleadoaEvaluar.Clasification}}</b></div>

            </v-flex>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-flex>


    </div>

    <!--
    <v-layout v-if="!isMobile" wrap class="white">

      <v-toolbar dark>
        <h5>Información del Empleado</h5>
      </v-toolbar>


      <v-layout row wrap>
        <v-flex xs3 sm4 mdl4 lg4 xl5 class="mb-2">
          <v-text-field disabled outline label="Num Emp" :value="g_empleadoaEvaluar.Number"
            prepend-inner-icon="fas fa-hashtag"></v-text-field>
        </v-flex>

        <v-flex xs9 sm8 mdl8 lg8 xl7 class="mb-2">
          <v-text-field disabled outline label="Planta" :value="g_empleadoaEvaluar.Clasification"
            prepend-inner-icon="fas fa-address-card"></v-text-field>
        </v-flex>

        <v-flex xs12 sm12 mdl12 lg12 xl12 class="mb-2">
          <v-text-field disabled outline label="Nombre:" :value="g_empleadoaEvaluar.PrettyName"
            prepend-inner-icon="fa fa-user"></v-text-field>
        </v-flex>

        <v-flex xs6 sm7 mdl7 lg7 xl7 class="mb-2">
          <v-text-field disabled outline label="Departamento" :value="g_empleadoaEvaluar.Department"
            prepend-inner-icon="fas fa-users"></v-text-field>
        </v-flex>
        <v-flex xs6 sm5 mdl5 lg5 xl5 class="mb-2">
          <v-text-field disabled outline label="Fecha de Ingreso" :value="g_empleadoaEvaluar.AdmissionDate"
            prepend-inner-icon="far fa-calendar-alt"></v-text-field>
        </v-flex>

        <v-flex xs6 sm7 mdl7 lg7 xl7 class="mb-2">
          <v-text-field disabled outline label="Puesto Actual" :value="g_empleadoaEvaluar.Position"
            prepend-inner-icon="fas fa-address-book"></v-text-field>
        </v-flex>
        <v-flex xs6 sm5 mdl5 lg5 xl5 class="mb-2">
          <v-text-field disabled outline label="Salario Actual" value="$" prepend-inner-icon="fas fa-dollar-sign">
          </v-text-field>
        </v-flex>



        <v-flex xs12 sm12 mdl12 lg12 xl12>
          <v-text-field disabled outline label="Supervisor" :value="g_empleadoaEvaluar.SupervisorPrettyName"
            prepend-inner-icon="fas fa-user-tie"></v-text-field>
        </v-flex>

      </v-layout>
    </v-layout>

    <v-layout v-else>
      <v-container fluid class="indigo accent-3 white--text ">
        <v-layout row>
          <v-flex xs6>
            <img :src="g_empleadoaEvaluar.Image" class="icondialog rounded-circle mt-1 mb-1 " />
          </v-flex>
          <v-flex xs6>
            <h5 class="mt-2">{{g_empleadoaEvaluar.Name}}</h5>
            <h5 class="mt-3 font-weight-bold">{{g_empleadoaEvaluar.Department}}</h5>
          </v-flex>

        </v-layout>
      </v-container>
    </v-layout>
    -->
  </v-container>


</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "infoEmpleado",
  props: {},
  data() {
    return {
      isMobile: false,
      readonly: true
    };
  },
  methods: {
    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    }
  },
  computed: {
    g_empleadoaEvaluar() {
      return this.$store.getters.g_empleadoaEvaluar.empleadoInfo[0];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../../../assets/css/global.css";

@import "../../../../assets/css/media_query.css";
</style>