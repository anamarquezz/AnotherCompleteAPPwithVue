<template>

  <v-layout row justify-center>

    <v-dialog v-model="gsw_dialog.Value" persistent width="500">


      <v-card>
        <v-card-title class="headline blue darken-1 text-white" primary-title>
          <h5>{{gsw_dialog.Title}}</h5>
          
        </v-card-title>

        <v-card-text>
          <v-layout row wrap class="text-xl-center">
            <v-flex x12 >
              <p class="title mb-3">{{gsw_dialog.Subtitle}}</p>
               
            </v-flex>

            <v-flex xl12>
              <img v-if="gsw_dialog.contieneImagen" :src="g_cDialog.Image" class="icondialog rounded-circle mt-1 mb-1 " />
            </v-flex>
            <v-flex xl12>
              <h5 class="mt-3">{{gsw_dialog.Paragraph}}</h5>
            </v-flex>

          </v-layout>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="gray" flat @click="act_regresar">
            Regresar
          </v-btn>
          <v-btn color="blue darken-2" dark large @click="act_continuar">
            continuar
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
  export default {
    name: 'cdialog',
    props: {},
    data() {
      return {}
    },
    methods: {
      act_continuar: function () {

        // this.$store.dispatch('GetEvaluationEmployeeJson', this.g_cDialog);
        this.$store.dispatch('GetEvaluationEmployee', this.g_cDialog);
      },
      act_regresar: function () {
        var dialog = {
          Value: false,
          Title: this.g_cDialog.Title,
          Subtitle: this.g_cDialog.Subtitle,
          contieneImagen: true,
          Image: this.g_cDialog.Image,
          Paragraph:this.g_cDialog.Paragraph
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
  }
</script>

<style>
  @import '../../assets/css/global.css';
  @import '../../assets/css/media_query.css';
</style>