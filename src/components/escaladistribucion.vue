<template>
  <div>
    <v-toolbar dark :color="color ">

      <v-toolbar-title class="body-1">{{datos.ValueDefinition}}</v-toolbar-title>

      <v-spacer></v-spacer>
      <h3 class="title">{{datos.Score}}</h3>
    </v-toolbar>
    <v-list>
      <v-list-tile v-for="item in datoslist" :key="item.Number" avatar>
        <v-list-tile-action>
          <v-list-tile-title class="body-1" v-text="item.PrettyName" ></v-list-tile-title>
        </v-list-tile-action>

        <v-list-tile-content>

        </v-list-tile-content>

        <v-list-tile-avatar>
          <img :src="item.Image">
        </v-list-tile-avatar>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
  import {
    mapState,
    mapActions,
    mapGetters
  } from 'vuex';

  export default {
    name: "escaladistribucion",
    data() {
      return {
        color: ''
      }
    },
    computed: {
      ...mapGetters(["g_loginUser"]),

    },
    props: ['datos', 'datoslist'],
    methods: {},
    created: function () {
      var Score = this.datos.Score;
      if(this.datos.Score != undefined){
      switch (Score) {
            case 2:
              this.color = "red lighten-2";
              break;
            case 4:
              this.color = "amber darken-3";
              break;
            case 6:
              this.color = "teal darken-1";
              break;
            case 8:
              this.color = "cyan darken-3";
              break;
            case 10:
              this.color = "light-blue accent-4";
              break;
          }
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .font-sizes {
    font-size: 17px;
  }

</style>
