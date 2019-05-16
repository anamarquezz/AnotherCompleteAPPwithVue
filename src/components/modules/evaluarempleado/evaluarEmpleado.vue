<template>
  <v-container fluid grid-list-xs>

    <div class="row mb-3">
      <div class="row">
        <div class="col text-left"></div>
        <v-btn v-if="isregresar == 'true'" color="light-blue darken-4 mnl-5" dark large @click="RegresarUsuarios()"><b>
            <h4 class="dinline mr-2"><i class="fas fa-arrow-left mt-2"></i></h4>Regresar
          </b>
        </v-btn>
        <h6 class="text-pre-wrap font-weight-bold headline ml-5">EVALUACION DE DESEMPEÑO {{g_loginUser.EvalYear}}</h6>
      </div>
    </div>

    <v-layout>
      <v-flex xs12 sm8 md8 lg8 xl8>
        <div class="text-right">
          <v-btn color="light-blue darken-4" dark large v-on:click="GuardarEvaluacion"><b>Guardar</b></v-btn>
        </div>
        <aHistorialDiciplinario></aHistorialDiciplinario>
        <aReactivosPersonal class="mt-1"></aReactivosPersonal>

        <v-layout wrap class="text-center">

          <v-flex xs12 sm5 md5 lg5 xl5 class="mr-2">
            <v-toolbar dark color="blue">
              <v-toolbar-title class="white--text ">
                Comentarios Evaluador
              </v-toolbar-title>
            </v-toolbar>
            <v-textarea v-model="comments" id="textareaComment" box name="input-7-4"
              label="Retroalimentación por parte del evaluador" class="" color="blue"
              :value="g_empleadoaEvaluar.saveUpdateUser.comments" :disabled="g_loginUser.allowESign=='false'">
            </v-textarea>
          </v-flex>
          <v-flex xs12 sm5 mdl5 lg6 xl5 class="ml-5 ">
            <v-toolbar dark color="blue">
              <v-toolbar-title class="white--text ">
                Comentarios Empleado
              </v-toolbar-title>
            </v-toolbar>

            <v-textarea v-model="feedback_comments" id="textareaFeedback" box name="input-7-4"
              label="Comentarios por parte del empleado." :value="g_empleadoaEvaluar.saveUpdateUser.feedBack_Comments"
              class="" color="blue" :disabled="g_loginUser.allowESign=='false'">
            </v-textarea>
          </v-flex>
        </v-layout>
        <v-layout wrap class="text-center" >
          <v-flex xs12 sm5 md5 lg5 xl5 class="mt-4 mr-2">
            <v-toolbar dark color="light-blue darken-4">
              <i class="fas fa-file-signature"></i>
              <v-toolbar-title class="white--text ">
                Firma Evaluador
              </v-toolbar-title>
            </v-toolbar>
            <h4 class="mt-3" v-if="g_loginUser.empleadoaEvaluar.isloginfirmaEva">{{g_empleadoaEvaluar.saveUpdateUser.nombreEvaluador}}</h4>
            <v-form ref="form"  v-if="!g_loginUser.empleadoaEvaluar.isloginfirmaEva">               
              <v-text-field :disabled="g_loginUser.allowESign == 'false'" class="m-3" outline label="Usuario" v-model="usevaluador" prepend-icon="fas fa-user"  :rules="validarcampos"  ></v-text-field>
              <v-text-field :disabled="g_loginUser.allowESign == 'false'" class="m-3" outline label="Contraseña" type="password"  @keyup.enter.native="firma('SUP')"  v-model="contravaluador" prepend-icon="fas fa-key"  :rules="validarcampos" ></v-text-field>
              <v-btn color="indigo darken-2" dark large @click="firma('SUP')" :disabled="disabledEval"><b>
                  <h4 class="dinline"></h4>  Firmar
                </b>
              </v-btn>           
            </v-form>
          </v-flex>
          <v-flex xs12 sm5 md5 lg5 xl5 class="ml-5 " mt-4>
            <v-toolbar dark color="light-blue darken-4">
              <i class="fas fa-file-signature"></i>
              <v-toolbar-title class="white--text ">
                Firma Empleado
              </v-toolbar-title> 
            </v-toolbar>
             <h4 class="mt-3" v-if="g_loginUser.empleadoaEvaluar.isloginfirmaEmp"  >{{g_empleadoaEvaluar.saveUpdateUser.nombreEmpleado}}</h4>
            <v-form ref="form" v-if="!g_loginUser.empleadoaEvaluar.isloginfirmaEmp"> 
                
              <v-text-field :disabled="g_loginUser.allowESign == 'false'" class="m-3" outline label="Usuario" v-model="useEmpleado" prepend-icon="fas fa-user" :rules="validarcampos" ></v-text-field>
              <v-text-field :disabled="g_loginUser.allowESign == 'false'" class="m-3" outline label="Contraseña" type="password"  @keyup.enter.native="firma('EMP')"  v-model="contraEmpleador" prepend-icon="fas fa-key"  :rules="validarcampos"></v-text-field>
               <v-btn color="indigo darken-2" dark large @click="firma('EMP')"   :disabled="disabledEmp"><b>
                  <h4 class="dinline"></h4>  Firmar
                </b>
              </v-btn>
             
            </v-form>
          </v-flex>

        </v-layout>
      
      </v-flex>

      <v-flex xs12 sm4 md4 lg4 xl4>
        <infoEmpleado class=""></infoEmpleado>
        <v-container>
          <v-toolbar color="light-blue darken-4 " dark>
            <v-toolbar-title class="ml-1">Escala General de Calificacion</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <expansionlist :list="g_loginUser.empleadoaEvaluar.categoryValue " headertitle="ValueDefinition"
            subtitletext1="Evaluación" subtitletext2="Score" subtitletext3="Min" subtitletext4="Max"
            cardtext="Descripcion"></expansionlist>
        </v-container>
        <calificacionpuntuacion></calificacionpuntuacion>
      </v-flex>
    </v-layout>
  </v-container>


</template>

<script>
  import {
    mapState,
    mapActions,
    mapGetters
  } from 'vuex';

  import infoEmpleado from './childs/infoEmpleado.vue';

  import expansionlist from '../../elemento/expansionlist.vue'

  import aHistorialDiciplinario from './childs/aHistorialDiciplinario.vue';
  import aReactivosPersonal from './childs/aReactivosPersonal.vue';

  import calificacionpuntuacion from './childs/calificacionpuntuacion.vue';

  export default {
    name: 'evaluarEmpleado',
    components: {
      infoEmpleado,
      aHistorialDiciplinario,
      aReactivosPersonal,
      calificacionpuntuacion,

      expansionlist
    },
    data() {
      return {
        comments: '',
        feedback_comments: '',

        usevaluador: '',
        contravaluador: '',
        useEmpleado: '',
        contraEmpleador: ''
      }
    },
    computed: {    
      ...mapState({
        isregresar:'isregresar'
      }),
      ...mapGetters(["g_loginUser", "g_empleadoaEvaluar"]),
      validarcampos() {
        return [              
           v => !!v || 'El campo es requerido'
        ];
      },  
       disabledEval() {
        return !(this.usevaluador != "" && this.contravaluador != "");
      },
      disabledEmp() {
        return !(this.useEmpleado != "" && this.contraEmpleador != "");
      }    
    },
    methods: {
      GuardarEvaluacion: function () {
        var esto = this;
        esto.$store.dispatch("s_Loading", {
            value: 0,
            show: true
          }),
          esto.$store.dispatch('saveUpdateUser', {
            comments: esto.comments,
            feedback_comments: esto.feedback_comments
          });


      },
      RegresarUsuarios() {

        var esto = this;
        esto.$store.dispatch("s_Loading", {
          value: 0,
          show: true
        });
        esto.$store.dispatch('GetSubordinateByUser');

      },
      firma(por){   
        if(!this.disabledEval || !this.disabledEmp) {  
          var Num = this.g_empleadoaEvaluar.signatureInfo[this.g_empleadoaEvaluar.signatureInfo.findIndex(el => el.TypeCode == por )].Number;        

        var datos = por == "SUP" ? { usuario : this.usevaluador, contrasena : this.contravaluador, por : por, extra:Num } 
        : { usuario : this.useEmpleado, contrasena : this.contraEmpleador, por : por,extra:Num };
     

         this.$store.dispatch('firmas', datos);
        }
      },   
      /*GuardarEvaluacion() {
        var esto = this;
      esto.$store.dispatch("s_Loading", { value: 0, show: true });
          esto.$store.dispatch('GetSubordinateByUser').then(() =>
            esto.$router.push('/mempleadosaevaluar')            
          ).catch(err => console.log(err));
        
      }*/

    },
    created: function () {
      if (this.g_loginUser.empleadoaEvaluar.empleadoInfo.length < 0)
        this.$router.push("/mempleadosaevaluar");
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../assets/css/global.css';
  @import '../../../assets/css/media_query.css';
/*=
  .theme--dark.v-toolbar {
    background-color: #1e88e5 !important;
    color: #fff !important;
  }*/

</style>
