<template>
  <div class="container-fluid">

    <v-toolbar dark color="blue" >
      <v-toolbar-title class="white--text">Empleados a evaluar</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="mostrarEnviar" color="blue darken-1  mb-2" dark large data-toggle="tooltip" data-placement="top"
        title="Enviar Evaluaciones"><b>ENVIAR</b></v-btn>
    </v-toolbar>


    <v-toolbar light color="" class="">

      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-toolbar>
    <v-layout v-resize="onResize" column>
      <v-data-table :headers="headers" :items="g_loginUser.Subordinates" :search="search" :pagination.sync="pagination"
        :hide-headers="isMobile" :class="{mobile: isMobile}">

        <template slot="items" slot-scope="props">
          <tr v-if="!isMobile">
            <td class="">
              <img :src="props.item.Image" class="iconsize rounded-circle mt-1 mb-1 " /></td>
            <td class="">{{ props.item.PrettyName }} , <b>Num Emp. #{{props.item.Number}}</b> </td>
            <td class="">{{ props.item.Clasificacion }}</td>
            <td class="">{{ props.item.Position}}</td>
            <td>
              <i v-if="props.item.Status != 'COMPLETADO'" class="fas fa-times-circle red--text text--darken-3 fntsi50px"></i>
              <i v-else class="fas fa-check-circle green--text  fntsi50px"></i>
            </td>
            <td class="">
              <v-btn v-if="props.item.Status != 'COMPLETADO'" color="blue darken-2 w-50 mb-2" dark large @click="EvaluarEmpleado(props.item)"><b>Evaluar</b></v-btn>
              <v-btn v-else color="blue w-50 mb-2 font-bold" dark large @click="EvaluarEmpleado(props.item)"><b>Editar</b></v-btn>
            </td>

          </tr>
          <tr v-else>
            <td>
              <ul class="container-fluid">
                <div class="row">
                  <div col-1>
                    <i class="fas fa-times-circle amber--text text--darken-3 fntsi50px" v-if="props.item.Status=='NO INICIADO'"></i>
                    <i v-else class="fas fa-check-circle green--text  fntsi50px"></i>
                  </div>
                  <div class="col-3">
                    <img :src="props.item.Image" class="iconsize rounded-circle" />
                  </div>
                  <div class="col-5">
                    {{props.item.Name}},<b>Emp # {{props.item.Number}}</b>, {{ props.item.Position}}
                    <!-- <button type="button" class="btn btn btn-primary w-100">Editar</button>    -->
                  </div>
                  <div class="col-12">
                    <v-btn color="indigo accent-2 w-100 mb-2" dark large>Evaluar</v-btn>
                  </div>

                </div>
              </ul>
            </td>
          </tr>
        </template>
        <v-alert slot="no-results" :value="true" color="red lighten-1" icon="warning ">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
    </v-layout>


  </div>

</template>

<script>
  export default {
    name: 'listaEmpleadosEvaluar',
    data() {
      return {
        pagination: {
          descending: true,
          page: 1,
          rowsPerPage: 10, // -1 for All
          sortBy: 'name',       
        },
        mostrarEnviar: false,
        selected: [],
        search: '',
        isMobile: false,
        font: 'font-size: 20px !important;',
        headers: [{
            text: '',
            value: 'Image'
          },
          {
            text: 'Nombre',
            value: 'PrettyName'
          },
          {
            text: 'Clasificación',
            value: 'Clasificacion'
          },
          {
            text: 'Puesto',
            value: 'Position'
          },
          {
            text: 'Evaluado',
            value: 'Evaluado'
          },
          {
            text: '',
            value: 'actions'
          },
        ],

      }
    },
    computed: {
      g_loginUser() {
        return this.$store.getters.g_loginUser;
      }
    },
    methods: {
      onResize() {
        if (window.innerWidth < 769)
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
         var esnuevo = empleadoSelectInfo.Status == 'COMPLETADO' ? false:true;

        var dialog = {
          Value: true,
          Title: condition + " Empleado",
          Subtitle: "¿Estás Seguro de " + condition + " al siguiente Empleado?",
          contieneImagen: true,
          Image: empleadoSelectInfo.Image,
          Paragraph: empleadoSelectInfo.PrettyName,
          esNuevo: esnuevo,
          Number:empleadoSelectInfo.Number
        };

        this.$store.dispatch('sw_dialog', dialog);
        this.$store.dispatch('set_cDialog', empleadoSelectInfo);
      }
    },
    mounted: function () {
      this.mostrarEnviar = (this.$store.getters.g_loginUser.Subordinates.filter(e => e.Status === "COMPLETADO").length ==
        this.$store.getters.g_loginUser.Subordinates.length);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../assets/css/global.css';
  @import '../../../assets/css/media_query.css';

  .theme--dark.v-toolbar {
    background-color: #1e88e5 !important;
    color: #fff !important;
  }
</style>