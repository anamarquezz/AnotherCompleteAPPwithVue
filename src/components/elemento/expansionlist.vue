  <template>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-toolbar color="light-blue darken-4 " dark>            
            <v-toolbar-title class="ml-1">Escala General de Calificacion</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-expansion-panel popout>
            <v-expansion-panel-content v-for="item in g_loginUser.empleadoaEvaluar.categoryValue"
              :key="item.CategoryCode">
              <div slot="header" class="title"><i class=""></i> {{item.ValueDefinition}}</div>
              <v-card>
                <v-card-title>
                  <div>
                    <span class="grey--text title">Evaluación (score)</span><br>
                    <span class="subtitle font-weight-bold">Score : {{item.Score}}, Min: {{item.Min}}  Max:  {{item.Max}}</span><br>
                    <span></span>
                  </div>
                </v-card-title>
                <v-card-text>{{item.Descripcion}}</v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
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

    export default {
      name: 'expansionlist',
      props: {},
      data() {
        return {
          notifications: false,
          sound: true,
          widgets: false
        }
      },
      methods: {

      },
      computed: {
        ...mapGetters(["g_loginUser"])
      },
      mounted: function () {
        var a = this;
      }
    }

  </script>

  <style>
    @import '../../assets/css/global.css';
    @import '../../assets/css/media_query.css';

    .v-expansion-panel__header {
  background: #d4d9e1 !important;
    font-weight: bold !important;
    font-size: 15px !important;
    color: #282828c2 !important;
    margin: 1px !important;
}
    

  </style>
