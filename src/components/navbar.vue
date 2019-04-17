 <template>
   <v-toolbar :color="color" :class="textcolor" app absolute clipped-left>

     <v-btn flat dark small color="" class="white--text " @click="ondrawer()">
       <v-icon dark>fas fa-bars</v-icon>
     </v-btn>
     <span class="title ml-3 mr-5 ">
       <h6><b>Evaluación de desempeño, </b><b class="grey--text text--lighten-1">{{loginUser.descriptionPeriod}}, {{loginUser.minPeriod}} - {{loginUser.maxPeriod}}</b></h6>
     </span>
     <v-spacer></v-spacer>
     <span class="mr-3">{{loginUser.Name}}</span>
     <v-btn icon large>
       <v-avatar size="50px" tile>
         <img :src="loginUser.UserPic" class="iconmenu rounded-circle">
       </v-avatar>
     </v-btn>
   </v-toolbar>
 </template>

 <script>
   import {
     mapState,
     mapActions
   } from 'vuex';

   export default {
     name: 'navbar',
     data() {
       return {}
     },
     computed: mapState([
       'loginUser'
     ]),
     props: ['color', 'titulobarra', 'textcolor'],
     methods: {
       ondrawer() {
         var drawer = '';
         if (!this.drawer) {
           drawer = true;
         } else {
           drawer = false;
         }
         var esto = this;
         this.$store.dispatch('set_drawer', drawer);
       }
     }
   }

 </script>

 <style scoped>

 </style>
