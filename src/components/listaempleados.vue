<template>
  <div  class="dtlayout">
     <v-btn v-if="g_gridby ==='employesScore'" color="blue darken-2 mnl-5" dark large @click="RegresarUsuarios()"><b>
            <h4 class="dinline mr-2"><i class="fas fa-arrow-left mt-2"></i></h4>Regresar
          </b>
          </v-btn>

    <v-toolbar dark :color="colortoolbar ">
      <v-toolbar-title class="white--text ">{{titletoolbar}}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <h1><i :class="icontoolbar"></i></h1>
    </v-toolbar>
    

    <v-toolbar light color="" class="">
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="buscar" single-line hide-details></v-text-field>
    </v-toolbar>

    <v-layout v-resize="onResize" column>
      <v-data-table :headers="headers" :items="g_loginUser.Subordinates" :search="search" :custom-filter="customFilter"
        :pagination.sync="pagination" :rows-per-page-items="pagination.rowsPerPageItems" :hide-headers="isMobile"  
        :class="{mobile: isMobile}">

        <template slot="items" slot-scope="props">
         <tr v-if="!isMobile">
            <td class="" v-if="(g_gridby === 'employeetoevaluate') || (g_gridby ==='employesScore')">
              <img  :src="props.item.Image"
                class="iconsize rounded-circle mt-1 mb-1 " /></td>
            <td class=""><b>#{{props.item.Number}}</b> </td>
            <td class="">{{ props.item.PrettyName }} </td>
            <td class="">{{ props.item.Clasificacion }}</td>
            <td class="">{{ props.item.Position}}</td>
            <td class="" v-if="g_gridby === 'employeetoevaluate'">{{ props.item.Status}}</td>
            <td class="" v-if="g_gridby === 'employeetoevaluateRH'">{{ props.item.Initiated }}</td>
            <td class="" v-if="g_gridby === 'employeetoevaluateRH'">{{ props.item.Completed }}</td>
             <td class="" v-if="g_gridby === 'employeetoevaluateRH'">{{ props.item.Evaluated }}</td>
            <td class="" v-if="g_gridby === 'employeetoevaluateRH'">{{ props.item.TotalEvaluate }}</td>
            <td class="" v-if="g_gridby === 'employesScore'">
            <!--  <v-rating v-model="props.item.Score" background-color="orange" color="orange" readonly="readonly" medium>
              </v-rating> -->
               {{props.item.Score}}
            </td>
            <td class="" v-if="g_gridby === 'employeetoevaluate'">
              <v-btn v-if="props.item.Status === 'NO INICIADO'" color="indigo darken-4  w-75" class=" mb-2" dark large
                @click="EvaluarEmpleado(props.item)"><b>EVALUAR</b></v-btn>
              <v-btn v-else color="blue darken-3 mb-2 font-bold  w-75" class="" dark large @click="EvaluarEmpleado(props.item)">
                <b>EDITAR</b></v-btn>
            </td>
            <td v-if="g_gridby === 'employeetoevaluateRH'">
              <v-btn color="blue darken-1 w-75 mb-2" dark large @click="Visualizar(props.item)"><b>Visualizar</b>
              </v-btn>
            </td>
          </tr>
          <tr v-else>
            <td>
              <ul class="flex-content">
                <li class="flex-item mt-2 mb-2"
                  v-if="(g_gridby === 'employeetoevaluate') || (g_gridby ==='employesScore')">
                  <img :src="props.item.Image" class="iconsize rounded-circle" /> </li>
                <li class="flex-item mt-2 mb-2" data-label="Name">{{ props.item.Name }}</li>
                <li class="flex-item mt-2 mb-2" data-label="#Number"> # {{ props.item.Number}}</li>
                <li class="flex-item mb-5" data-label="Position"> {{props.item.Position}} </li>
                <li class="flex-item mt-2 mb-2 " data-label="Status" v-if="g_gridby === 'employeetoevaluate'">
                  {{props.item.Status}}
                </li>
                <li class="flex-item mt-2 mb-2" data-label="Initiated" v-if="g_gridby === 'employeetoevaluateRH'">
                  {{props.item.Initiated}}
                </li>
                <li class="flex-item mt-2 mb-2" data-label="Completed" v-if="g_gridby === 'employeetoevaluateRH'">
                  {{props.item.Completed}}
                </li>
                 <li class="flex-item mt-2 mb-2" data-label="Evaluated" v-if="g_gridby === 'employeetoevaluateRH'">
                  {{props.item.Evaluated}}
                </li>
                <li class="flex-item mt-2 mb-2" data-label="TotalEvaluate" v-if="g_gridby === 'employeetoevaluateRH'">
                  {{props.item.TotalEvaluate}}
                </li>
                <li class="flex-item mt-4 mb-4" v-if="g_gridby === 'employeetoevaluate'">
                  <v-btn v-if="props.item.Status !== 'COMPLETADO'" dark large class="indigo darken-4 w-75 mb-2" 
                    @click="EvaluarEmpleado(props.item)"><b>Evaluar</b></v-btn>
                  <v-btn v-else color="indigo darken-3 w-75 mb-2 font-bold" dark large @click="EvaluarEmpleado(props.item)">
                    <b>Editar</b></v-btn>
                <li>
                <li class="flex-item mt-4 mb-4" v-if="g_gridby === 'employeetoevaluateRH'">
                  <v-btn color="blue darken-2  mb-2" dark large @click="Visualizar(props.item)"><b>Visualizar</b>
                  </v-btn>
                </li>
                <li class="flex-xs12 mt-4 mb-4" v-if="g_gridby === 'employesScore'" data-label="Score">
                  <!-- <v-rating v-model="props.item.Score" background-color="orange" color="orange" readonly="readonly"
                    small>
                  </v-rating> -->
                  {{props.item.Score}}
                </li>
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
  import {
    mapState,
    mapActions,
    mapGetters
  } from 'vuex';

  export default {
    name: "listaempleados",
    data() {
      return {
        isMobile: false,
        search: "",
        pagination: {
          descending: true,
          page: 1,
          rowsPerPage: 10, 
          sortBy: 'name',
          rowsPerPageItems: [10, 50, 100, 150, 200]
        }
      }
    },
    props: ['titletoolbar', 'icontoolbar', 'colortoolbar', 'headers', 'g_gridby'],
    computed:{
    ...mapGetters(["g_loginUser"])
    },
    methods: {

      onResize() {
        if (window.innerWidth < 910) this.isMobile = true;
        else this.isMobile = false;
      },
      customFilter(items, search, filter) {

        //this custom filter will do a multi-match separated by a space.
        //e.g

        if (!search) {
          return items
        } //if the search is empty just return all the items

        function new_filter(val, search) {
          return val !== null && ['undefined', 'boolean'].indexOf(typeof val) === -1 &&
            val.toString().toLowerCase().replace(/[^0-9a-zA-Z]+/g, "").indexOf(search) !== -1
        }

        let needleAry = search.toString().toLowerCase().split(" ").filter(x => x);
        //whenever we encounter a space in our search we will filter for both the first and second word (or third word)

        return items.filter(row => needleAry.every(needle => Object.keys(row).some(key => new_filter(row[key],
          needle))));
        //foreach needle in our array cycle through the data (row[key]) in the current row looking for a match.
        // .some will return true and exit the loop if it finds one it will return false if it doesnt
        // .every will exit the loop if we dont find a match but will return true if all needles match
        // .filter the rows on each match


      },
      toggleAll() {
        if (this.selected.length) this.selected = [];
        else this.selected = this.desserts.slice();
      },
      changeSort(column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending;
        } else {
          this.pagination.sortBy = column;
          this.pagination.descending = false;
        }
      },
  
   Visualizar(item) {    
      var esto = this;
        
            esto.$store.dispatch("s_Loading", { value: 0, show: true }),
          this.$store.dispatch('GetEmployeesBySuperviser',item).then(() =>
           this.$router.push('/mempleadosevaluadores/mevaluadosporsupervisor') ).catch(err => console.log(err));              
      
        

      },
      EvaluarEmpleado(empleadoSelectInfo) {        
       var esto= this;
           esto.$store.dispatch("s_Loading", { value: 0, show: true }),
          this.$store.dispatch('GetEvaluationEmployee',empleadoSelectInfo).then(() =>           
            this.$router.push('/mempleadosaevaluar/mevaluarempledo') ).catch(err => console.log(err));
        
          
        
      },
      RegresarUsuarios() {
        var esto = this;      
       esto.$store.dispatch("s_Loading", { value: 0, show: true }),
          esto.$store.dispatch('GetSummarySubordinates').then(() =>
            esto.$router.push('/mempleadosevaluadores')       
            ).catch(err => console.log(err));   
       
      }
    },
    
      create: function(){
          var a = this;
      }
  }


</script>

<style scoped>

.dtlayout {
  display: inline-block;
  width: 100%;
}



</style>
