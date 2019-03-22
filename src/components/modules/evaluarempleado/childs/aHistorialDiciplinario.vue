<template>
  <div>     

    <v-toolbar dark color="blue ">
      <v-toolbar-title class="white--text ">
        <h6 class="text-pre-wrap font-weight-bold"> DESEMPEÑO A EVALUAR</h6>
      </v-toolbar-title>          
    </v-toolbar>    
   
    <v-layout v-resize="onResize" column style="padding-top:10px" class="text-justify" >
      <v-data-table :headers="headers" :items="g_empEvaluar.indicatorTress" 
        :pagination.sync="pagination" :hide-headers="isMobile" :class="{mobile: isMobile}" hide-actions>
        <template slot="items" slot-scope="props">
          <tr  v-if="!isMobile">
            <td class="miw-3  p-3">{{props.item.Description}} </td>                       
             <v-rating  v-model="props.item.Result" background-color="orange" color="orange" readonly="readonly"></v-rating>
          </tr>
          <tr v-else>
            <td>
              <ul class="flex-content">
                <li class="flex-item">{{props.item.Description}}</li>
                <li class="" data-label="Puntuación">
                  <v-rating   v-if="!isMobile" v-model="props.item.Result" background-color="orange" color="orange" readonly="readonly" small></v-rating>                
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
  export default {
    name: 'aHistorialDiciplinario',
    data() {
      return {
        rrating: 5,
        readonly :true,
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
      g_empEvaluar() {
        return this.$store.getters.g_loginUser.empleadoaEvaluar;
      }
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
      this.mostrarEnviar = (this.$store.getters.g_loginUser.Subordinates.filter(e => e.Status === "COMPLETADO")
        .length ==
        this.$store.getters.g_loginUser.Subordinates.length);
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
</style>