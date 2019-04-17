<template>
  <v-navigation-drawer fixed clipped class="grey lighten-4" app v-model="drawer">
    <v-list dense class="grey lighten-4">
      <template v-for="(item, i) in items">
        <v-layout row v-if="item.heading" align-center :key="i">
          <v-flex xs6>
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-flex>
          <v-flex xs6 class="text-xs-right">

          </v-flex>
        </v-layout>
        <v-divider dark v-else-if="item.divider" class="my-3" :key="i"></v-divider>
        <v-list-tile :key="i" v-else @click="opcionmenu(item)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="black--text">
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import {
    mapState,
    mapActions,
    mapGetters
  } from 'vuex';

  export default {
    name: 'menuoptions',
    data() {
      return {
        items: [{
            icon: "fas fa-home light-blue--text text--darken-2",
            text: "home",
            code: "mhome"
          },
          {  
            icon: "far fa-list-alt light-blue--text text--darken-2",
            text: "Empleados a Evaluar",
            code: "mempleadosaevaluar"
          },

          {
            icon: "fas fa-sign-out-alt fa-rotate-180 light-blue--text text--darken-2",
            text: "Cerrar sesión",
            code: "#login"
          }
        ]

      }
    },
    computed: {     
      ...mapState({
      drawer: 'drawer',
      loginUser: 'loginUser'
    }),
    
    
    },
    props: [],
    methods: {
      opcionmenu(item) {
        var esto = this,
        metodo='';
           //this.$store.dispatch("s_Loading", { value: 0, show: true });
        switch (item.code) { 
          case 'mempleadosaevaluar':        
              metodo="GetSubordinateByUser";           
            break;
          case 'mempleadosevaluadores':
            metodo= "GetSummarySubordinates";         
            break;
          case '#login':
           metodo= "AUTH_LOGOUT";                            
            break;
        }
        new Promise((resolve, reject) => {
          esto.$store.dispatch(metodo).then(() =>
            resolve('listo!!')).catch(err => console.log(err));
        }).then((successMessage) => {
          esto.$router.push("/"+ item.code);         
        });
      }
    },
    created: function () {
      var esto = this;
      if (esto.loginUser.isRH) {
        esto.items.splice(2, 0, {
          icon: "fa-id-card light-blue--text text--darken-2",
          text: "Empleados que estan Evaluando",
          code: "mempleadosevaluadores",

        });
      }
    }

  }

</script>

<style scoped>

</style>
