 <template>
   <v-layout row class="">
     <v-flex xs10>
       <v-card >

         <v-list three-line class="blue-grey lighten-5 black--text">
           <template v-for="item in list">
          
            <!-- <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider> -->
             <v-list-tile  :key="item[title]" avatar>
               <v-list-tile-avatar>
                 <img :src="item[avatar]">                 
               </v-list-tile-avatar>

               <v-list-tile-content cl>
                 <v-list-tile-title v-html="item[title]"></v-list-tile-title>
                 <v-list-tile-sub-title class="black--text title" v-html="item[subtitle]"></v-list-tile-sub-title>
                 
               </v-list-tile-content>
             </v-list-tile>
           </template>
         </v-list>
       </v-card>
     </v-flex>
   </v-layout>
 </template>

 <script>
   import {
     mapState,
     mapActions
   } from 'vuex';

   export default {
     name: 'clist',
     data() {
       return {
           header:'', 
       }
     },
     computed: {
       ...mapState({
         loginUser: 'loginUser',
         drawer: 'drawer'
       })
     },
     props: ['dindex','list','title','subtitle','avatar'],
     methods: {
     },
     mounted:function(){
       var me =this;
     }
   }

 </script>

 <style scoped>

 </style>
