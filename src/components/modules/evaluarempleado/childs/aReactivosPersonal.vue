<template>
  <div>
    <v-toolbar dark color="blue ">
      <v-toolbar-title class="white--text ">
        <h6 class="text-pre-wrap font-weight-bold">{{g_empEvaluar.empleadoInfo.Category}}</h6>
      </v-toolbar-title>
    </v-toolbar>

    <v-layout v-resize="onResize" column style="padding-top:10px" class="text-justify">
      <v-data-table :headers="headers" :items="g_empEvaluar.indicatorConfig" 
        :hide-headers="isMobile" :class="{mobile: isMobile}" hide-actions>
        <template slot="items" slot-scope="props">
          <tr v-if="!isMobile">
            <td class="miw-3 p-3">{{props.item.Description}} </td>
            <v-rating v-model="props.item.Result" background-color="orange" color="orange"></v-rating>
          </tr>
          <tr v-else>
            <td>
              <ul class="flex-content">
                <li class="d-inline-block text-truncate" style="max-width: 200px;" data-toggle="tooltip"
                  data-placement="top">
                  {{props.item.Description}}
                </li>
                <li class="" data-label="Puntuación">
                  <v-rating v-model="props.item.Result" background-color="orange" color="orange" small></v-rating>
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
    name: 'aReactivosPersonal',
    data() {
      return {
        pagination: {
          sortBy: 'histodisc'
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