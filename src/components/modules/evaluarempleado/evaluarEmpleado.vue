<template>
  <v-container fluid grid-list-xs>

    <div class="row mb-3">
      <div class="row">
        <div class="col text-left"></div>
        <v-btn color="light-blue darken-4 mnl-5" dark large @click="RegresarUsuarios()"><b>
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
              <h3><i class="fas fa-comments"></i></h3>
              <v-toolbar-title class="white--text ">
                Comentarios Evaluador
              </v-toolbar-title>
            </v-toolbar>
            <v-textarea v-model="comments" id="textareaComment" box name="input-7-4"
              label="Retroalimentación por parte del evaluador" class="" color="blue"
              :value="g_empleadoaEvaluar.saveUpdateUser.comments" :disabled="(g_loginUser.descriptionPeriod == 'Retroalimentación') == true? false:true">
            </v-textarea>
          </v-flex>
          <v-flex xs12 sm mdl5 lg5 xl5 class="ml-5 ">
            <v-toolbar dark color="blue">
              <h3><i class="fas fa-comments"></i></h3>
              <v-toolbar-title class="white--text ">
                Comentarios Empleado
              </v-toolbar-title>
            </v-toolbar>

            <v-textarea v-model="feedback_comments" id="textareaFeedback" box name="input-7-4"
              label="Comentarios por parte del empleado." :value="g_empleadoaEvaluar.saveUpdateUser.feedBack_Comments"
              class="" color="blue" :disabled="(g_loginUser.descriptionPeriod == 'Retroalimentación') == true? false:true">
            </v-textarea>
          </v-flex>
        </v-layout>

        <v-layout wrap class="text-center">
          <v-flex xs11 class="mr-2 mt-5">
            <v-toolbar dark color="grey darken-2">
              <h3><i class="fas fa-signature"></i></h3>
              <v-toolbar-title class="white--text ">
                Firmas
              </v-toolbar-title>
            </v-toolbar>
          </v-flex>

          <v-flex xs12 sm5 md5 lg5 xl5 class="mr-2 mt-3">
            <v-toolbar dark color="light-blue darken-4">
              <h3><i class="fas fa-user-edit"></i></h3>
              <v-toolbar-title class="white--text ">
                {{g_loginUser.empleadoaEvaluar.signatureInfo[3].TypeDescription }}
              </v-toolbar-title>
            </v-toolbar>
            <h4 class="mt-3" v-if="g_loginUser.empleadoaEvaluar.signatureInfo[3].IsSignature">
              {{g_loginUser.empleadoaEvaluar.signatureInfo[3].Name}}
            </h4>
            <v-form ref="form" v-if="!g_loginUser.empleadoaEvaluar.signatureInfo[3].IsSignature">
              <v-text-field :disabled="(g_loginUser.descriptionPeriod == 'Evaluación') == true? false:true"  class="m-3" outline
                label="Usuario" v-model="usuarioSup" prepend-icon="fas fa-user" :rules="validarcampos"></v-text-field>
              <v-text-field :disabled="(g_loginUser.descriptionPeriod == 'Evaluación') == true? false:true"  class="m-3" outline
               autocomplete="current-password" label="Contraseña" type="password" @keyup.enter.native="firma('SUP', {usuario:'usuarioSup',contrasena:'contrasenaSup'})" v-model="contrasenaSup"
                prepend-icon="fas fa-key" :rules="validarcampos"></v-text-field>
              <v-btn color="indigo darken-2" dark large @click="firma('SUP', {usuario:'usuarioSup',contrasena:'contrasenaSup'})" :disabled="disabledSup"><b>
                  <h4 class="dinline"></h4> Firmar
                </b>
              </v-btn>
            </v-form>
          </v-flex>


          <v-flex xs12 sm5 md5 lg5 xl5 class="ml-5 mt-3">
            <v-toolbar dark color="light-blue darken-4">
              <h3><i class="fas fa-user-tie"></i></h3>
              <v-toolbar-title class="white--text ">
                {{g_loginUser.empleadoaEvaluar.signatureInfo[1].TypeDescription }}
              </v-toolbar-title>
            </v-toolbar>
            <h4 v-if="g_loginUser.empleadoaEvaluar.signatureInfo[1].IsSignature">
              {{g_loginUser.empleadoaEvaluar.signatureInfo[1].Name}}</h4>
            <v-form ref="form" v-if="!g_loginUser.empleadoaEvaluar.signatureInfo[1].IsSignature">
              <v-text-field :disabled="(g_loginUser.descriptionPeriod == 'Evaluación') == true? false:true" class="m-3" outline
                label="Usuario" v-model="usuarioGere" prepend-icon="fas fa-user" :rules="validarcampos"></v-text-field>
              <v-text-field :disabled="(g_loginUser.descriptionPeriod == 'Evaluación') == true? false:true" class="m-3" outline 
                autocomplete="current-password"  label="Contraseña" type="password" @keyup.enter.native="firma('GEAR', {usuario:'usuarioGere',contrasena:'contrasenaGere'})" v-model="contrasenaGere"
                prepend-icon="fas fa-key" :rules="validarcampos"></v-text-field>
              <v-btn color="indigo darken-2" dark large @click="firma('GEAR',{usuario:'usuarioGere',contrasena:'contrasenaGere'})" :disabled="disabledGer"><b>
                  <h4 class="dinline"></h4> Firmar
                </b>
              </v-btn>
            </v-form>
          </v-flex>



        </v-layout>
        <v-layout wrap class="text-center">
          <v-flex xs12 sm5 md5 lg5 xl5 class="mr-2 mt-5">
            <v-toolbar dark color="light-blue darken-4 mt-4">
              <h3><i class="fas fa-user-tie"></i></h3>
              <v-toolbar-title class="white--text ">
                {{g_loginUser.empleadoaEvaluar.signatureInfo[2].TypeDescription }}
              </v-toolbar-title>
            </v-toolbar>
            <h4 v-if="g_loginUser.empleadoaEvaluar.signatureInfo[2].IsSignature">
              {{g_loginUser.empleadoaEvaluar.signatureInfo[2].TypeDescription }}</h4>
            <v-form ref="form" v-if="!g_loginUser.empleadoaEvaluar.signatureInfo[2].IsSignature">
              <v-text-field  class="m-3" outline :disabled="(g_loginUser.descriptionPeriod == 'Retroalimentación') == true? false:true"
                label="Usuario" v-model="usuarioRH" prepend-icon="fas fa-user" :rules="validarcampos"></v-text-field>
              <v-text-field  class="m-3" outline :disabled="(g_loginUser.descriptionPeriod == 'Retroalimentación') == true? false:true"
               autocomplete="current-password"   label="Contraseña" type="password" @keyup.enter.native="firma('GERH',{usuario:'usuarioRH',contrasena:'contrasenaRH'})" v-model="contrasenaRH"
                prepend-icon="fas fa-key" :rules="validarcampos"></v-text-field>
              <v-btn color="indigo darken-2" dark large @click="firma('GEARH',{usuario:'usuarioRH',contrasena:'contrasenaRH'})" :disabled="disabledRH"><b>
                  <h4 class="dinline"></h4> Firmar
                </b>
              </v-btn>
            </v-form>



          </v-flex>


          <v-flex xs12 sm5 md5 lg5 xl5 class="ml-5">
            <!-- :disabled="g_loginUser.descriptionPeriod == 'Evaluación'"  -->
            <v-switch v-if="!g_loginUser.empleadoaEvaluar.signatureInfo[0].IsSignature" id="switchchange"
              v-model="eshuella" class="font-weight-bold" @change="changefirmahuella"
              label="Firmar: Active Directory/ Huella"></v-switch>

            <v-flex v-if="eshuella">
              <h4 class="light-blue--text text--darken-3"
                v-if="!g_loginUser.empleadoaEvaluar.signatureInfo[0].IsSignature">Favor de colocar tu huella en el
                dispositivo</h4>
              <i class="fontsihuella mt-3 fas fa-fingerprint "></i>
              <h4 class="mt-3" v-if="g_loginUser.empleadoaEvaluar.signatureInfo[0].IsSignature">
                <i class="fas fa-fingerprint "></i>
                {{g_loginUser.empleadoaEvaluar.signatureInfo[0].Name}}</h4>
            </v-flex>
            <v-flex v-else>
              <br v-if="g_loginUser.empleadoaEvaluar.signatureInfo[0].IsSignature">
              <v-toolbar dark color="light-blue darken-4 mt-5"
                v-if="g_loginUser.empleadoaEvaluar.signatureInfo[0].IsSignature">
                <h3><i class="fas fa-user"></i></h3>
                <v-toolbar-title class="white--text ">
                  Firma Empleado
                </v-toolbar-title>
              </v-toolbar>
              <v-toolbar v-if="!g_loginUser.empleadoaEvaluar.signatureInfo[0].IsSignature" dark
                color="light-blue darken-4">
                <h3><i class="fas fa-user"></i></h3>
                <v-toolbar-title class="white--text ">
                  Firma Empleado
                </v-toolbar-title>
              </v-toolbar>
              <h4 class="mt-3" v-if="g_loginUser.empleadoaEvaluar.signatureInfo[0].IsSignature">
                {{g_loginUser.empleadoaEvaluar.signatureInfo[0].Name}}</h4>
              <v-form ref="form" v-if="!g_loginUser.empleadoaEvaluar.signatureInfo[0].IsSignature">
                <v-text-field class="m-3" :disabled="(g_loginUser.descriptionPeriod == 'Retroalimentación') == true? false:true" outline label="Usuario" v-model="usuarioEmp" prepend-icon="fas fa-user"
                  :rules="validarcampos"></v-text-field>
                <v-text-field class="m-3" :disabled="(g_loginUser.descriptionPeriod == 'Retroalimentación') == true? false:true" outline label="Contraseña" type="password" @keyup.enter.native="firma('EMP',{ usuario:'usuarioEmp', contrasena:'contrasenaEmp'})"
                  autocomplete="current-password"  v-model="contrasenaEmp" prepend-icon="fas fa-key" :rules="validarcampos"></v-text-field>
                <v-btn color="indigo darken-2" dark large @click="firma('EMP',{usuario:'usuarioEmp', contrasena:'contrasenaEmp'})" :disabled="disabledEmp"><b>
                    <h4 class="dinline"></h4> Firmar
                  </b>
                </v-btn>

              </v-form>
            </v-flex>



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
import { mapState, mapActions, mapGetters } from "vuex";

import infoEmpleado from "./childs/infoEmpleado.vue";

import expansionlist from "../../elemento/expansionlist.vue";

import aHistorialDiciplinario from "./childs/aHistorialDiciplinario.vue";
import aReactivosPersonal from "./childs/aReactivosPersonal.vue";

import calificacionpuntuacion from "./childs/calificacionpuntuacion.vue";

import "../../../assets/js/jquery-1.6.4.js";
import "../../../assets/js/jquery.signalR.js";

export default {
  name: "evaluarEmpleado",
  components: {
    infoEmpleado,
    aHistorialDiciplinario,
    aReactivosPersonal,
    calificacionpuntuacion,

    expansionlist
  },
  data() {
    return {
      eshuella: false,
      findIP: "",
      validhuella: false,
      comments: "",
      feedback_comments: "",
      myHub: "",
      proxy: "",
      connection: "",

      usuarioGere: "",
      contrasenaGere: "",
      usuarioSup: "",
      contrasenaSup: "",
      usuarioRH: "",
      contrasenaRH: "",
      usuarioEmp: "",
      contrasenaEmp: ""
    };
  },
  computed: {
    ...mapState({
      isregresar: "isregresar",
      returnto: "returnto"
    }),
    ...mapGetters(["g_loginUser", "g_empleadoaEvaluar"]),
    validarcampos() {
      return [v => !!v || "El campo es requerido"];
    },
    disabledGer() {
      return !(this.usuarioGere != "" && this.contrasenaGere != "");
    },
    disabledSup() {
      return !(this.usuarioSup != "" && this.contrasenaSup != "");
    },
    disabledRH() {
      return !(this.usuarioRH != "" && this.contrasenaRH != "");
    },
    disabledEmp() {
      return !(this.usuarioEmp != "" && this.contrasenaEmp != "");
    }
  },
  methods: {
    GuardarEvaluacion: function() {
      var esto = this;
      esto.$store.dispatch("s_Loading", {
        value: 0,
        show: true
      }),
        esto.$store.dispatch("saveUpdateUser", {
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
      if (esto.returnto == "miplantilla") {
        esto.$store.dispatch("GetSubordinateByUser");
      } else if ("Gerentes/Sup") {
        esto.$store.dispatch("cambiarmenu", {
          code: "mempleadosevaluadores",
          show: true
        });
      }
    },
    firma(por, code) {
      var esto = this;
      if (!this.disabledEval || !this.disabledEmp) {
        var Num = this.g_empleadoaEvaluar.signatureInfo[
          this.g_empleadoaEvaluar.signatureInfo.findIndex(
            el => el.TypeCode == por
          )
        ].Number;

        if (Num == undefined) {
          Num = 0;
        }

        var datos = {
          usuario: esto[code.usuario],
          contrasena: esto[code.contrasena],
          extra: Num,
          firmapor: por,
          validby: "usuarioncontrasena"
        };

        this.$store.dispatch("firmas", datos);
      }
    },
    changefirmahuella() {
      var esto = this;
      if (esto.eshuella) {
        esto.findIP
          .then(ip => {
            esto.proxy.invoke("SetMachineNameGroup", ip);
            esto.proxy.invoke(
              "SendEmployeeNum",
              ip,
              esto.g_empleadoaEvaluar.empleadoInfo[0].Number
            );

            esto.$store.dispatch("s_Loading", {
              value: 0,
              show: false,
              showlinear: true
            });
          })
          .catch(e => console.error(e));
      }
    },
    validfirma(valid) {
      var esto = this;

      if (valid) {
        esto.g_loginUser.empleadoaEvaluar.signatureInfo[0].IsSignature = true;
        esto.$store.dispatch("s_Loading", {
          value: 0,
          show: false,
          showlinear: false
        });
        esto.$store.dispatch("set_validhuella", "");
        esto.$store.dispatch("set_signaturepor", "EMP");
      } else {
      }
      esto.$store.dispatch("set_validhuella", "Invalida");
    }
    /*GuardarEvaluacion() {
          var esto = this;
        esto.$store.dispatch("s_Loading", { value: 0, show: true });
            esto.$store.dispatch('GetSubordinateByUser').then(() =>
              esto.$router.push('/mempleadosaevaluar')            
            ).catch(err => console.log(err));
          
        }*/
  },
  mounted() {
    var esto = this;

    if (esto.g_loginUser.empleadoaEvaluar.empleadoInfo.length < 0)
      esto.$router.push("/mempleadosaevaluar");

    /*   var myHub = $.hubConnection("http://localhost:49014/signalr", {
             useDefaultPath: true
           });
           var proxy = myHub.createHubProxy('finger');
           myHub.start({
             transport: 'longPolling',
           });

           esto.proxy = proxy;
           //proxy.invoke('SetMachineNameGroup', ipMachine);

           proxy.on('ReceiveFingerPrint', function (msg) {
             console.log(msg);
           });*/

    esto.$store.dispatch("set_validhuella", "");

    var findIP = new Promise(r => {
      var w = window,
        a = new (w.RTCPeerConnection ||
          w.mozRTCPeerConnection ||
          w.webkitRTCPeerConnection)({
          iceServers: []
        }),
        b = () => {};
      a.createDataChannel("");
      a.createOffer(c => a.setLocalDescription(c, b, b), b);
      a.onicecandidate = c => {
        try {
          c.candidate.candidate
            .match(
              /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g
            )
            .forEach(r);
        } catch (e) {}
      };
    });
    esto.findIP = findIP;

    var connection = $.hubConnection(
      "https://intranet.valuout.com/CloverServices/signalr"
    );
    var proxy = connection.createHubProxy("finger");
    esto.proxy = proxy;
    // receives broadcast messages from a hub function, called "broadcastMessage"
    proxy.on("ReceiveFingerPrint", function(valid) {
      esto.$store.dispatch("set_validhuella", "");
      esto.validfirma(valid);
    });

    // atempt connection, and handle errors
    connection
      .start({
        jsonp: true
      })
      .done(function() {
        console.log("Now connected, connection ID=" + connection.id);
      })
      .fail(function() {
        console.log("Could not connect");
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../../assets/css/global.css";
@import "../../../assets/css/media_query.css";
/*=
  .theme--dark.v-toolbar {
    background-color: #1e88e5 !important;
    color: #fff !important;
  }*/

.fontsihuella {
  font-size: 4em;
}
</style>
