<template>

  <div>

    <v-toolbar dark color="blue ">
      <v-toolbar-title class="white--text ">
        <h6 class="text-pre-wrap font-weight-bold title"> DESEMPEÑO A EVALUAR</h6>       
      </v-toolbar-title>
       <v-spacer></v-spacer>
      <h6 class="text-pre-wrap font-weight-bold title">  PERIODO: {{g_loginUser.minYear}} - {{g_loginUser.maxYear}}</h6>
    </v-toolbar>

    <v-layout v-resize="onResize" column  class="text-justify">
          <v-toolbar light="" color="">
      <v-toolbar-title class="white--text ">          
      </v-toolbar-title>
      <h5><b class="  deep-orange--text text--accent-2 mr-1">NOTA!!  </b> Estos campos no se pueden modificar</h5>
       <v-spacer></v-spacer>

    </v-toolbar>
      <v-data-table :headers="headers" :items="g_loginUser.empleadoaEvaluar.indicatorTress" :pagination.sync="pagination"
        :hide-headers="isMobile" :class="{mobile: isMobile}" hide-actions>
        <template slot="items" slot-scope="props">
          <tr v-if="!isMobile">
            <td class="miw-3  p-3 font-sizes"><b>{{props.item.Description}}</b>,</td>

             <v-radio-group v-model="props.item.Result" row class="mt-2">
              <v-radio label="1" :value="1" color="grey lighten-1" readonly="readonly"></v-radio>
              <v-radio label="2" :value="2" color="grey lighten-1" readonly="readonly"></v-radio>
              <v-radio label="3" :value="3" color="grey lighten-1" readonly="readonly"></v-radio>
              <v-radio label="4" :value="4" color="grey lighten-1" readonly="readonly"></v-radio>
              <v-radio label="5" :value="5"  color="grey lighten-1" readonly="readonly"></v-radio>
            </v-radio-group>

            <!-- <v-rating  v-model="props.item.Result" background-color="orange" color="orange" readonly="readonly"></v-rating> -->
          </tr>
          <tr v-else>
            <td>
              <ul class="flex-content">
                <li class="flex-item font-sizes">{{props.item.Description}}</li>
                <li class="" data-label="Puntuación">
                  <v-radio-group v-model="row" column class="mt-2">
                    <v-radio :label="i" :value="i" v-for="i in props.item.Result" :key="i" color="blue darken-3">
                    </v-radio>
                  </v-radio-group>
                  <!-- <v-rating  v-model="props.item.Result" background-color="orange" color="orange" readonly="readonly" small></v-rating>                 -->
                </li>
              </ul>
            </td>
          </tr>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
    </v-layout>
  </div>

</template>

<script>
import { mapGetters } from 'vuex';


  export default {
    name: 'aHistorialDiciplinario',
    data() {
      return {
        rrating: 5,
        readonly: true,
        pagination: {
          descending: true,
          page: 1,
          rowsPerPage: 10, // -1 for All
          sortBy: 'histodisc',
        },
        mostrarEnviar: false,
        selected: [],
        search: '',
        isMobile: false,
        font: 'font-size: 20px !important;',
        headers: [{
            text: 'Historial Disciplinario',
            value: 'Description'
          },
          {
            text: 'Puntuación',
            value: 'Puntuación'
          }

        ],

      }
    },
     computed: {       
            ...mapGetters(["g_loginUser"]),
            
    }, 
    methods: {
      onResize() {
        if (window.innerWidth < 770)
          this.isMobile = true;
        else
          this.isMobile = false;
      },
      toggleAll() {
        if (this.selected.length) this.selected = []
        else this.selected = this.g_loginUser.Subordinates.slice()
      },
      changeSort(column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      },
      EvaluarEmpleado(empleadoSelectInfo) {
        var condition = empleadoSelectInfo.Status == 'COMPLETADO' ? 'Editar' : 'Evaluar';
        var esnuevo = empleadoSelectInfo.Status == 'COMPLETADO' ? false : true;

        var dialog = {
          Value: true,
          Title: condition + " Empleado",
          Subtitle: "¿Estás Seguro de " + condition + " al siguiente Empleado?",
          contieneImagen: true,
          Image: empleadoSelectInfo.Image,
          Paragraph: empleadoSelectInfo.PrettyName,
          esNuevo: esnuevo
        };

        this.$store.dispatch('sw_dialog', dialog);
        this.$store.dispatch('set_cDialog', empleadoSelectInfo);
      }
    },
    mounted: function () {
     var a = this;
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../../assets/css/global.css';
  @import '../../../../assets/css/media_query.css';

  .theme--dark.v-toolbar {
    background-color: #1e88e5 !important;
    color: #fff !important;
  }

  .font-sizes {
    font-size: 17px;
  }

</style>
