<template>
  <div v-resize="onResize">
    <v-layout v-if="!isMobile">
     
        <v-flex xs12>
          <v-card dark color="blue darken-1" class="white--text">
            <v-layout>
              <v-flex xs3>
                <v-img :src="g_empleadoaEvaluar.Image" class="icondialog rounded-circle mt-4 ml-2"></v-img>
              </v-flex>
              <v-flex xs9>
                <v-card-title primary-title>
                  <div cla>
                    <div class="subheading"><b>{{g_empleadoaEvaluar.Name}}, {{g_empleadoaEvaluar.PaternalSurname}}</b> </div>
                      <div class="subheading">{{g_empleadoaEvaluar.Position}}, {{g_empleadoaEvaluar.Department}}</div>                    
                    <div class="subheading">Fecha de ingreso {{g_empleadoaEvaluar.AdmissionDateFormat}}</div>
                  </div>
                </v-card-title>
              </v-flex>
            </v-layout>
            <v-divider light></v-divider>
            
            <v-card-actions class=" font-weith-bold title white black--text "  >            
            <v-spacer></v-spacer>
                 <v-rating medium v-model="rating" background-color="orange" color="orange" readonly="readonly" class=" ml-xl-5"></v-rating>
            </v-card-actions>
          </v-card>
        </v-flex>

 
    </v-layout>

    <v-layout v-else>
     
        <v-flex xs12>
          <v-card dark color="blue darken-1" class="white--text">
            <v-layout>
                <v-flex xs3 class="text-center" >
                </v-flex>
              <v-flex xs8 class="text-center" >
                <v-img :src="g_empleadoaEvaluar.Image" class="icondialog rounded-circle  mt-4  ml-xl-2 ml-lg-2 ml-3"></v-img>
              </v-flex>              
            </v-layout>
            <v-divider light></v-divider>
            <v-flex xs12 class="text-center white" >
                 <v-rating medium v-model="rating" background-color="orange" color="orange" readonly="readonly" class=" ml-xl-5"></v-rating>
            </v-flex>          
            <v-card-actions class=" font-weith-bold title white black--text "  >   
              <div class="ml-2">
                    <div class="subheading"><b>{{g_empleadoaEvaluar.Name}}, {{g_empleadoaEvaluar.PaternalSurname}}</b> </div>
                      <div class="subheading">{{g_empleadoaEvaluar.Position}}, {{g_empleadoaEvaluar.Department}}</div>                    
                    <div class="subheading">Fecha de ingreso {{g_empleadoaEvaluar.AdmissionDateFormat}}</div>
                  </div>         
            <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-flex>

 
    </v-layout>

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
  </div>


</template>

<script>
  export default {
    name: 'infoEmpleado',
    props: {},
    data() {
      return {
        isMobile: false,
        readonly:true,
        rating:5
      }
    },
    methods: {
      onResize() {
        if (window.innerWidth < 769)
          this.isMobile = true;
        else
          this.isMobile = false;
      }
    },
    computed: {
      g_empleadoaEvaluar() {
        return this.$store.getters.g_empleadoaEvaluar.empleadoInfo;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../../assets/css/global.css';

  @import '../../../../assets/css/media_query.css';
</style>