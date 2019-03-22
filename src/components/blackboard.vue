<template>

  <div class=" mt-2">

    <!-- MENU PRINCIPAL -->

    <v-navigation-drawer  fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer">
      <v-list dense>
        <template v-for="item in items">
          <v-layout row v-if="item.heading" align-center :key="item.heading">
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
          </v-layout>
          <v-list-group v-else-if="item.children" v-model="item.model" :key="item.text" :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon="">
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                <b>  {{ item.text }} </b>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="(child, i) in item.children" :key="i" @click="clickMenu(child)">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
               {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else @click="clickMenu(item)" :key="item.text">
            <v-list-tile-action>
              <v-icon> {{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
              {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <img src="../assets/img/logow.png" width="200px" class="mr-2" />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="mr-3">{{g_loginUser.Name}},
        {{g_loginUser.Puesto}}</span>
      <v-btn icon large>
        <v-avatar size="50px" tile>
          <img :src="g_loginUser.UserPic" alt="Vuetify" class="iconmenu rounded-circle">
        </v-avatar>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout>
            <!-- Componentes -->
          <listaEmpleadosEvaluar v-if="gsw_uiBlackboard =='employeetoevaluate'"></listaEmpleadosEvaluar>
          
          <home v-if="gsw_uiBlackboard =='home'"></home>
          
          <evaluarempleado v-if="gsw_uiBlackboard =='evaluarEmpleado'"></evaluarempleado>

        

        </v-layout>
      </v-container>
        <cdialog  v-if="gsw_dialog"></cdialog>  
    </v-content>
  <!--  <v-btn fab bottom left color="pink" dark fixed @click.stop="dialog = !dialog">
      <v-icon>add</v-icon>
    </v-btn>
    -->

    <v-dialog v-model="dialog" width="800px">
      dfgdfgdfdfgdfgdfgdfg
    </v-dialog>

  </div>





</template>

<script>

  import listaEmpleadosEvaluar from './modules/listaevaluacion/listaEmpleadosEvaluar.vue';
  import evaluarempleado from './modules/evaluarempleado/evaluarempleado.vue';
  import home from './modules/home/home.vue';
  import cdialog from './elemento/cdialog.vue';
  export default {
    name: 'blackboard',
    components: {

      listaEmpleadosEvaluar,
      evaluarempleado,
      home,
      cdialog
    },
    data() {
      return {
        dialog: false,
        drawer: null,     
        items: [
          {
            icon: 'fas fa-home',
            text: 'home',
            code: 'home'
          },{
            icon: 'far fa-list-alt',
            text: 'Empleados a Evaluar',
            code: 'employeetoevaluate'
          },/*{          
          {
            icon: 'fas fa-user-circle',
            text: 'Evaluar Empleado',
            code: 'evaluarEmpleado'
          }, /*{
            icon: 'fas fa-user-circle',
            text: 'dialog',
            code: 'cdialog'
          },  /*
           {
           icon: 'settings',
            'icon-alt': 'settings',
            text: 'settings',
            model: false,
            children: [{
              icon: 'fas fa-user-cog',
              text: 'Account',
              code:'account'
            }]
          },*/
          {
            icon: 'fas fa-sign-out-alt fa-rotate-180',
            text: 'Cerrar sesión',
            code: 'Salir',
        
          },
        ]
      }
    },
    computed: {
      g_loginUser() {
        return this.$store.getters.g_loginUser;
      },
      gsw_uiBlackboard() {
        return this.$store.getters.gsw_uiBlackboard;        
      },
      gsw_dialog(){
        return this.$store.getters.gsw_dialog;
      }      
    },
    methods: {
      clickMenu(child) {      
         if(child.code =='Salir'){
              this.$store.dispatch('gsw_ui', 'login');
         }else{          
             this.$store.dispatch('sw_uiBlackboard', child.code);
         }
      }
    }
  }
</script>

<style scoped>
  @import '../assets/css/global.css';

  .theme--dark.v-toolbar {
    background-color: black !important;
    color: #fff !important;
  }
</style>