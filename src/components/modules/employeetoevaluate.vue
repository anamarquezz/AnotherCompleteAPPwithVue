<template>
  <div class="mt-5">

    <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text">Empleados a evaluar</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      <v-menu offset-y :nudge-left="190" :nudge-top="240" :close-on-content-click="false">
        <v-btn icon slot="activator">
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="(item, index) in headers" :key="item.value" @click="changeSort(item.value)">
            <v-list-tile-title> {{ item.text }} <v-icon v-if="pagination.sortBy === item.value">{{pagination.descending
                ? 'arrow_downward':'arrow_upward'}}</v-icon>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-layout v-resize="onResize" column>
      <v-data-table :headers="headers" :items="g_loginUser.Subordinates" :search="search" :pagination.sync="pagination"
        :hide-headers="isMobile" :class="{mobile: isMobile, font:font}">
        <template slot="items" slot-scope="props">
          <tr v-if="!isMobile">
            <td class=""><img :src="props.item.Image" class="iconsize rounded-circle mt-1 mb-1" /></td>
            <td class="">{{ props.item.PrettyName }} , <b>Num Emp. #{{props.item.Number}}</b> </td>
            <td class="">{{ props.item.Clasificacion }}</td>
            <td class="">{{ props.item.Position}}</td>
            <td class="">
             <v-btn color="light-blue darken-4 w-100 mb-2" dark large>Evaluar</v-btn>
            <!--  <v-btn color="orange darken-1 w-100 mb-2" dark large>Evaluar</v-btn> -->
               
            </td>
          </tr>
          <tr v-else>
            <td>
              <ul class="flex-content">
                <div class="row">
                  <div class="col-4 col-sm-3">
                    <img :src="props.item.Image" class="iconsize rounded-circle" />
                  </div>
                  <div class="col-7 col-sm-8 ml-2">
                    {{props.item.Name}},<b>Emp # {{props.item.Number}}</b>,   {{ props.item.Position}}                
                        <!-- <button type="button" class="btn btn btn-primary w-100">Editar</button>    -->
                  </div>                 
                <div  class="col-12 ml-2">
                    <v-btn color="light-blue darken-4 w-100 mb-2" dark large>Evaluar</v-btn>
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
    name: 'employeetoevaluate',
    data() {
      return {
        pagination: {
          sortBy: 'name'
        },
        selected: [],
        search: '',
        isMobile: false,
        font: 'font-weight-bold',
        headers: [{
            text: '',
            value: 'Image'
          },
          {
            text: 'Name',
            value: 'PrettyName'
          },
          {
            text: 'Clasificacion',
            value: 'Clasificacion'
          },
          {
            text: 'Position',
            value: 'Position'
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
        console.log(column);
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../assets/css/global.css';
  @import '../../assets/css/media_query.css';
</style>