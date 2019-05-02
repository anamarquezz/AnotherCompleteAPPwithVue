<template>
  <div>
    <v-toolbar dark color="blue">
      <v-toolbar-title class="white--text ">
        <h6 class="text-pre-wrap font-weight-bold title m-3">{{g_empEvaluar.empleadoInfo[0].Category}}</h6>
      </v-toolbar-title>
    </v-toolbar>

    <v-layout v-resize="onResize" column style="padding-top:10px" class="text-justify">
      <v-data-table :headers="headers" :items="g_empEvaluar.indicatorConfig" :hide-headers="isMobile"
        :class="{mobile: isMobile}" :search="search" :pagination.sync="pagination">
        <template slot="items" slot-scope="props">
          <tr v-if="!isMobile">
            <td class="miw-3 p-3 font-sizes">{{props.item.Description}} </td>
            <v-radio-group v-model="props.item.Result" row class="mt-2" @click="ratingReactivo(props.item)">
              <v-radio label="2" :value="2" color="blue darken-3" :disabled="!g_loginUser.allowEvaluation"></v-radio>
              <v-radio label="4" :value="4" color="blue darken-3" :disabled="!g_loginUser.allowEvaluation"></v-radio>
              <v-radio label="6" :value="6" color="blue darken-3" :disabled="!g_loginUser.allowEvaluation"></v-radio>
              <v-radio label="8" :value="8" color="blue darken-3" :disabled="!g_loginUser.allowEvaluation"></v-radio>
              <v-radio label="10" :value="10"  color="blue darken-3"  :disabled="!g_loginUser.allowEvaluation"></v-radio>
            </v-radio-group>
            <!--  <v-rating v-model="props.item.Result" background-color="orange" color="orange"  v-on="ratingReactivo(props.item)"></v-rating> -->

          </tr>
          <tr v-else>
            <td>
              <ul class="flex-content">
                <li class="d-inline-block text-truncate " style="max-width: 200px;" data-toggle="tooltip"
                  data-placement="top ">
                  {{props.item.Description}}
                </li>
                <li class="" data-label="Puntuación">
                  <v-radio-group v-model="props.item.Result" row class="mt-2" @click="ratingReactivo(props.item)">
              <v-radio label="2" :value="2" color="blue darken-3" :disabled="!g_loginUser.allowEvaluation" ></v-radio>
              <v-radio label="4" :value="4" color="blue darken-3" :disabled="!g_loginUser.allowEvaluation" ></v-radio>
              <v-radio label="6" :value="6" color="blue darken-3" :disabled="!g_loginUser.allowEvaluation"></v-radio>
              <v-radio label="8" :value="8" color="blue darken-3" :disabled="!g_loginUser.allowEvaluation"></v-radio>
              <v-radio label="10" :value="10"  color="blue darken-3" ></v-radio>
            </v-radio-group>
                 <!-- <v-rating v-model="props.item.Result" background-color="orange" color="orange" small
                    v-on="ratingReactivo(props.item)"></v-rating>-->
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

  import {
    mapState,
    mapActions,
    mapGetters
  } from 'vuex';

  export default {
    name: 'aReactivosPersonal',
    data() {
      return {
        pagination: {
          descending: true,
          page: 1,
          rowsPerPage: 5, // -1 for All
          sortBy: 'Description',
        },
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
      g_empEvaluar() {
        return this.$store.getters.g_loginUser.empleadoaEvaluar;
      },
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
      ratingReactivo(item) {
        var esto = this;
        if(esto.g_loginUser.allowEvaluation){
          esto.$store.dispatch('calculateRating', item);
        }

      }
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
