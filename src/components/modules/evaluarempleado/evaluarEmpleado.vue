<template>
  <v-container fluid grid-list-xs>

    <div class="row mb-3">
      <div class="row">
        <div class="col text-left"></div>
        <v-btn color="light-blue darken-4 mnl-5" dark large @click="RegresarUsuarios()"><b>
            <h4 class="dinline mr-2"><i class="fas fa-arrow-left mt-2"></i></h4>Regresar
          </b>
        </v-btn>
        <h6 class="text-pre-wrap font-weight-bold headline ml-5">EVALUACI&#211;N DE DESEMPEÑO {{g_loginUser.EvalYear}}
        </h6>
      </div>
    </div>

    <v-layout wrap>
      <v-flex xs12 sm12 md8 lg8 xl8>
        <div class="mt-xl-4 mt-md-4">
          <v-btn fixed right bottom color="indigo darken-2" class="z-idx shadowborder  " dark large
            v-on:click="GuardarEvaluacion">
            <v-icon dark class="blink_me">fas fa-save </v-icon>
            <b class="ml-3 ">Guardar</b>
          </v-btn>
        </div>
        <aHistorialDiciplinario></aHistorialDiciplinario>
        <aReactivosPersonal class="mt-1"></aReactivosPersonal>

        <v-layout wrap class="text-center">

          <v-flex xs12 sm11 md5 lg5 xl5 class="mr-2">
            <v-toolbar dark color="blue">
              <h3><i class="fas fa-comments"></i></h3>
              <v-toolbar-title class="white--text ">
                Comentarios Evaluador {{setComments}}
              </v-toolbar-title>
            </v-toolbar>
            <v-textarea v-model="g_loginUser.empleadoaEvaluar.saveUpdateUser.comments" id="textareaComment" box name="input-7-4"
              label="Retroalimentación por parte del evaluador" class="" color="blue"
              :disabled="disabledComments"> 
              :value="g_empleadoaEvaluar.saveUpdateUser.comments">
            </v-textarea>
          </v-flex>
          <v-flex xs12 sm11 dl5 lg5 xl5 class="ml-xl-5 ">
            <v-toolbar dark color="blue">
              <h3><i class="fas fa-comments"></i></h3>
              <v-toolbar-title class="white--text ">
                Comentarios Empleado
              </v-toolbar-title>
            </v-toolbar>

            <v-textarea v-model="g_loginUser.empleadoaEvaluar.saveUpdateUser.feedback_comments" id="textareaFeedback" box name="input-7-4"
              label="Comentarios por parte del empleado." :value="g_empleadoaEvaluar.saveUpdateUser.feedBack_Comments"
              :disabled="disabledComments"
              class="" color="blue">
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

          <v-flex xs12 sm11 md5 lg5 xl5 class="mr-2 mt-3">
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
              <v-text-field :disabled="!g_loginUser.empleadoaEvaluar.signatureInfo[3].allowSignature" class="m-3 mb-4" 
                outline label="Usuario" v-model="usuarioSup" prepend-icon="fas fa-user" :rules="validarcampos">
              </v-text-field>
              <v-text-field :disabled="!g_loginUser.empleadoaEvaluar.signatureInfo[3].allowSignature" class="m-3" 
                outline autocomplete="current-password" label="Contraseña" type="password"
                @keyup.enter.native="firma('SUP', {usuario:'usuarioSup',contrasena:'contrasenaSup'})"
                v-model="contrasenaSup" prepend-icon="fas fa-key" :rules="validarcampos"></v-text-field>
              <v-btn color="indigo darken-2" dark large class="mt-lg-4 mt-xl-4"
                @click="firma('SUP', {usuario:'usuarioSup',contrasena:'contrasenaSup'})" :disabled="disabledSup"><b>
                  <h4 class="dinline"></h4> Firmar
                </b>
              </v-btn>
            </v-form>
          </v-flex>


          <v-flex xs12 sm11 md5 lg5 xl5 class="ml-xl-5 mt-xl-3">
            <v-toolbar dark color="light-blue darken-4">
              <h3><i class="fas fa-user-tie"></i></h3>
              <v-toolbar-title class="white--text ">
                {{g_loginUser.empleadoaEvaluar.signatureInfo[1].TypeDescription }}
              </v-toolbar-title>
            </v-toolbar>
            <h4 class="mt-3" v-if="g_loginUser.empleadoaEvaluar.signatureInfo[1].IsSignature">
              {{g_loginUser.empleadoaEvaluar.signatureInfo[1].Name}}</h4>
            <v-form ref="form" v-if="!g_loginUser.empleadoaEvaluar.signatureInfo[1].IsSignature">
              <v-text-field :disabled="!g_loginUser.empleadoaEvaluar.signatureInfo[1].allowSignature"  class="m-3 mb-4"
                outline label="Usuario" v-model="usuarioGere" prepend-icon="fas fa-user" :rules="validarcampos">
              </v-text-field>
              <v-text-field :disabled="!g_loginUser.empleadoaEvaluar.signatureInfo[1].allowSignature" class="m-3" 
                outline autocomplete="current-password" label="Contraseña" type="password"
                @keyup.enter.native="firma('GEAR', {usuario:'usuarioGere',contrasena:'contrasenaGere'})"
                v-model="contrasenaGere" prepend-icon="fas fa-key" :rules="validarcampos"></v-text-field>
              <v-btn color="indigo darken-2" dark large class="mt-lg-4 mt-xl-4"
                @click="firma('GEAR',{usuario:'usuarioGere',contrasena:'contrasenaGere'})" :disabled="disabledGer"><b>
                  <h4 class="dinline"></h4> Firmar 
                </b>
              </v-btn>
              
            </v-form>
          </v-flex>



        </v-layout>
        <v-layout wrap class="text-center">
          <v-flex xs12 sm11 md5 lg5 xl5 class="mr-2 mt-5">
            <v-toolbar dark color="light-blue darken-4 mt-4">
              <h3><i class="fas fa-user-tie"></i></h3>
              <v-toolbar-title class="white--text ">
                {{g_loginUser.empleadoaEvaluar.signatureInfo[2].TypeDescription }}
              </v-toolbar-title>
            </v-toolbar>
            <h4 class="mt-3" v-if="g_loginUser.empleadoaEvaluar.signatureInfo[2].IsSignature">
              {{g_loginUser.empleadoaEvaluar.signatureInfo[2].Name }}</h4>
            <v-form ref="form" v-if="!g_loginUser.empleadoaEvaluar.signatureInfo[2].IsSignature">
              <v-text-field class="m-3 mb-4" outline 
                :disabled="!g_loginUser.empleadoaEvaluar.signatureInfo[2].allowSignature" label="Usuario" 
                v-model="usuarioRH" prepend-icon="fas fa-user" :rules="validarcampos"></v-text-field>
              <v-text-field class="m-3" outline 
                :disabled="!g_loginUser.empleadoaEvaluar.signatureInfo[2].allowSignature"
              autocomplete="current-password" label="Contraseña" type="password"
                @keyup.enter.native="firma('GERH',{usuario:'usuarioRH',contrasena:'contrasenaRH'})"
                v-model="contrasenaRH" prepend-icon="fas fa-key" :rules="validarcampos"></v-text-field>
              <v-btn color="indigo darken-2" dark large class="mt-lg-4 mt-xl-4"
                @click="firma('GERH',{usuario:'usuarioRH',contrasena:'contrasenaRH'})"  :disabled="disabledRH"><b>
                  <h4 class="dinline"></h4> Firmar
                </b>
              </v-btn>
            </v-form>



          </v-flex>


          <v-flex xs12 sm11 md5 lg5 xl5 class="ml-xl-5">
            <!-- :disabled="g_loginUser.descriptionPeriod == 'Evaluación'"  -->
            <v-switch v-if="!g_loginUser.empleadoaEvaluar.signatureInfo[0].IsSignature" id="switchchange" 
            :disabled="(g_empleadoaEvaluar.empleadoInfo[0].Status =='COMPLETADO') == true? false:true"
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
                <v-text-field class="m-3 mb-4" 
                  :disabled="!g_loginUser.empleadoaEvaluar.signatureInfo[0].allowSignature" outline
                  label="Usuario" v-model="usuarioEmp" prepend-icon="fas fa-user" :rules="validarcampos"></v-text-field>
                <v-text-field class="m-3" :disabled="!g_loginUser.empleadoaEvaluar.signatureInfo[0].allowSignature"
                  outline label="Contraseña" type="password"
                  @keyup.enter.native="firma('EMP',{ usuario:'usuarioEmp', contrasena:'contrasenaEmp'})"
                  autocomplete="current-password" v-model="contrasenaEmp" prepend-icon="fas fa-key"
                  :rules="validarcampos"></v-text-field>
                <v-btn color="indigo darken-2" dark large class="mt-lg-4 mt-xl-4"
                  @click="firma('EMP',{usuario:'usuarioEmp', contrasena:'contrasenaEmp'})" :disabled="disabledEmp"><b>
                    <h4 class="dinline"></h4> Firmar
                  </b>
                </v-btn>

              </v-form>
            </v-flex>



          </v-flex>
        </v-layout>


      </v-flex>

      <v-flex xs12 sm12 md4 lg4 xl4>
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
      returnTo: "returnTo"
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
    },
    setComments() {
      this.comments = this.g_empleadoaEvaluar.saveUpdateUser.comments;
      this.feedback_comments = this.g_empleadoaEvaluar.saveUpdateUser.feedback_comments;
    },
    disabledComments() {
      return !this.g_empleadoaEvaluar.evaluationResult.allowEditComments;
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

      esto.$store.dispatch("cambiarmenu", {
        code: esto.returnTo,
        show: false
      });
    },
    firma(por, code) {
      var esto = this,
        Num = "";

      if (!this.disabledEval || !this.disabledEmp) {
        Num = this.g_empleadoaEvaluar.signatureInfo[
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
          numberSign: Num,
          codeSignature: por,
          numberEvaluated: this.g_empleadoaEvaluar.empleadoInfo[0].Number
        };

        esto.$store.dispatch("set_saveUpdateUser", {
          comments: esto.comments,
          feedback_comments: esto.feedback_comments
        });

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
  created() {
    var esto = this;

    /*  (g_loginUser.descriptionPeriod == 'Evaluación' && (g_empleadoaEvaluar.empleadoInfo[0].Status =='NO INICIADO' || g_empleadoaEvaluar.empleadoInfo[0].Status =='INICIADO'))
     var myHub = $.hubConnection("http://localhost:49014/signalr", {
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
      "https://intranet.valuout.com/CloverServices/signalr" //https://intranet.valuout.com/CloverServices/signalr
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

.z-idx {
  z-index: 10;
}

.v-btn--bottom:not(.v-btn--absolute) {
  bottom: 35px !important;
  margin-left: -138px !important;
}

.fontsihuella {
  font-size: 4em;
}

.shadowborder {
  /* will-change: box-shadow; */
  /* -webkit-box-shadow: 0 3px 1px -2px rgb(80, 255, 110), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12); */
  box-shadow: 10px 13px 1px -2px rgba(69, 91, 217, 0.37),
    0 2px 2px 0 rgba(0, 0, 0, 0.14), 7px 7px 5px 0 rgba(41, 125, 134, 0.59) !important;
}

.blink_me {
  animation: blinker 3s linear infinite;
}

@keyframes blinker {
  60% {
    opacity: 0.3;
  }
}
</style>
