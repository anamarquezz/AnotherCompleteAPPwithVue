<template>
  <v-container fluid>
    <v-layout>


      <navbar color="grey darken-4" textcolor="white--text"></navbar>

      <v-flex row xs3 md3 lg3 xl3>
        <menuoptions></menuoptions>
      </v-flex>

      <v-flex row xs12 md11 lg11 xl11 class="mt-5">
        <v-container fluid class="mt-5">
          <v-toolbar dark color="indigo darken-4 white--text">
            <h4><i class="fas fa-user-cog mr-3"></i> Mantenimiento - Configuración</h4>
           
            <v-spacer></v-spacer>
              <h5 class="ml-3">Relacionar los Gerentes - Supervisores - Empleados a Evaluar </h5>
          </v-toolbar>

          <v-form>
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 md2>
                  <v-text-field  v-model="number_approval" label="Numero Gerente"   persistent-hint   :hint="g_loginUser.Nombregerente" @keydown.native="EnterName('number_approval','Nombregerente')"></v-text-field>               
                </v-flex>
                <v-flex xs12 md3>
                  <v-text-field v-model="number_evaluator" label="Numero Supervisor" persistent-hint :hint="g_loginUser.nombreSup" @keydown.native="EnterName('number_evaluator','nombreSup')"></v-text-field>                  
                </v-flex>
                 <v-flex xs12 md2>
                  <v-text-field v-model="number_evaluated" label="Numero Empleado" persistent-hint :hint="g_loginUser.nombreEmp" @keydown.native="EnterName('number_evaluated','nombreEmp')"></v-text-field>                   
                </v-flex>
                <v-flex xs12 sm3>
                  <v-btn color="light-blue darken-4 mnl-5" dark large @click="agregarGerenSup">
                    <h5 class="dinline mr-2"><i class="fas fa-user-plus mr-2"></i>Agregar</h5>
                  </v-btn>
                </v-flex>

              </v-layout>
            </v-container>
          </v-form>


          <v-toolbar dark color="indigo darken-4 white--text">
            <h4><i class="fa fa-users mr-3"></i> Supervisores / Gerentes </h4>
            <v-spacer></v-spacer>
          </v-toolbar>
          <listaempleados :headers="headers" v-if="listamantenimientoevaluadores.length > 0" from='EVAL'
            :list='listamantenimientoevaluadores' excelname="gerentesupervisores.xls">
          </listaempleados>


        </v-container>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

//https://mengxiong10.github.io/vue2-datepicker/demo/index.html
import listaempleados from "../components/listaempleados.vue";
import navbar from "../components/navbar.vue";
import menuoptions from "../components/menuoptions.vue";

export default {
  name: "mconfigurarfechas",
  components: {
    menuoptions,
    navbar,
    listaempleados
  },
  data() {
    return {
      number_approval: "",
      number_evaluator: "",
      number_evaluated: "",
      headers: [
        {
          text: "Gerente",
          type: "text",
          align: "center",
          value: "name_approval",
          resize: false
        },
        {
          text: "Supervisor",
          type: "text",
          align: "center",
          value: "name_evaluator",
          resize: true
        },
        {
          text: "Personal a Evaluar",
          type: "text",
          align: "center",
          value: "name_evaluated",
          resize: true
        },

        {
          text: "",
          type: "button",
          btntitle: "Remover",
          action: "GuardarConfiguracionEvaluadores",
          has_condition: false,
          resize: true,
          color: "red lighten-2",
          condition_property: "",
          value: ""
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["g_loginUser"]),
    ...mapState(["token", "listamantenimientoevaluadores"])
  },
  methods: {
    EnterName(number, by) {
      var esto = this;
      if (esto[number] == "") {
        this.$store.dispatch("set_nombreInput", { Nombre: "", By: by });
      } else {
        if (event.which === 13) {
          var datos = {
            usuario: esto[number],
            contrasena: "",
            extra: "",
            firmapor: "",
            by: by
          };
          this.$store.dispatch("validUser", datos);
        }
      }
    },
    agregarGerenSup() {
      var esto = this;
      esto.$store.dispatch("GuardarConfiguracionEvaluadores", {
        number_approval: esto.number_approval,
        number_evaluator: esto.number_evaluator,
        number_evaluated: esto.number_evaluated,
        active: false
      });
    }
  },
  mounted: function() {
    var esto = this;
    esto.$store.dispatch("s_Loading", {
      value: 0,
      show: true
    }),
      esto.$store.dispatch("GetConfiguracionEvaluadores");
  }
};
</script>

<style scoped>
@import "../assets/css/global.css";
@import "../assets/css/media_query.css";

.mx-calendar {
  float: left;
  color: #fff9f9cf;
  padding: 6px 12px;
  font: 18px/1.5 Helvetica Neue, Helvetica, Arial, Microsoft Yahei, sans-serif;
  background: #000000cf;
}

.cell:hover {
  color: #01579b;
  font-weight: bold;
}

.v-messages__message {
  font-size: 15px;
  font-weight: bold;
  color: #7e7ebd;
}
</style>
