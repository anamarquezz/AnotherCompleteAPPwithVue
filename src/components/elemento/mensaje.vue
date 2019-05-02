  <template>
    <v-layout row justify-center>
      <v-dialog v-model="g_showMessage.show" persistent width="500">
        <v-card>
          <v-card-title  :class="[colorThema, fnt16,whitet]" primary-title>
            <p class="h4">{{g_showMessage.title}} </p>
          </v-card-title>
          <v-card-text>
            <v-layout row wrap class="text-center">
              <v-flex xs12 md12 lg12 xl12>
                <p class="title mb-3">{{g_showMessage.message}}</p>
              </v-flex>
            </v-layout>

          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn v-if="g_showMessage.showregresar" color="gray" flat @click="act_regresar" class="font-weight-bold">
              REGRESAR
            </v-btn>
            <v-btn :color="g_showMessage.colorThema" dark large @click="act_aceptar" class="font-weight-bold">
              ACEPTAR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </template>


  <script>
    export default {
      name: 'mensajes',
      props: {},
      data() {
        return {
          colorThema:'',
          fnt16:'h4',
          whitet:'text-white'
        }
      },
      methods: {
        act_aceptar: function () {

          //   this.$store.dispatch('GetEvaluationEmployeeJson', this.g_cDialog);
          var data = {
            colorThema: '',
            show: false,
            message: '',
            title: '',
            showregresar: false
          };
          this.$store.dispatch('set_showMessage', data);
        }

      },
      computed: {        
        g_showMessage() {
          this.colorThema = this.$store.getters.g_showMessage.colorThema;
          return this.$store.getters.g_showMessage;
        },
      }
    }
  </script>

  <style>
    @import '../../assets/css/global.css';
    @import '../../assets/css/media_query.css';
  </style>