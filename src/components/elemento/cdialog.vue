<template>

  <v-layout row justify-center>
    <v-dialog v-model="gsw_dialog.Value" persistent width="500">
      <v-card>
        <v-card-title class="headline blue darken-1 text-white" primary-title>
          <h3>{{gsw_dialog.Title}}</h3>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap class="text-center">
            <v-flex xs12 md12 lg12 xl12>
              <p class=" mb-3 mt-3 headline">{{gsw_dialog.Subtitle}}</p>
            </v-flex>

            <v-flex xs12 md12 lg12 xl12>
            </v-flex>
            <v-flex xs12 md12 lg12 xl12 class="ml-2">
              <h5 class="mt-3">{{gsw_dialog.Paragraph}}</h5>
              <div v-if="gsw_dialog.component.type === 'list'">
              <clist  :list="gsw_dialog.component.list" class="ml-3"
                :dindex="gsw_dialog.component.dindex"
                :title="gsw_dialog.component.title"
                :subtitle="gsw_dialog.component.subtitle"
                :avatar="gsw_dialog.component.avatar">
              </clist>
              </div>
            </v-flex>

          </v-layout>

        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-2 white--text" @click="act_regresar">
            <b> Aceptar </b>
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
  import clist from '../elemento/clist.vue'

  export default {
    name: 'cdialog',
    components: {
      clist
    },
    props: {},
    data() {
      return {}
    },
    methods: {
      act_regresar: function () {
        var dialog = {
          Value: false,
          Title: "",
          Subtitle: '',
          contieneImagen: false,
          Image: '',
          Paragraph: '',
          component: {
            type: '',
            list: [],
            subtitletext1: '',
            subtitletext2: '',
            cardtext: ''
          }
        };

         this.$store.dispatch('sw_dialog', dialog);

      }

    },
    computed: {
      g_cDialog() {
        return this.$store.getters.g_cDialog;
      },
      gsw_dialog() {
        return this.$store.getters.gsw_dialog;
      },
      Image() {
        return "data:image/png;base64," + this.$store.getters.g_cDialog.Image;
      }
    },
    mounted: function () {
      var a = this;
    }
  }

</script>

<style>
  @import '../../assets/css/global.css';
  @import '../../assets/css/media_query.css';

</style>
