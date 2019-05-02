<template>
  <v-timeline>
    <v-timeline-item v-for="(year, i) in years" :key="i" :color="year.color" small>
      <template v-slot:opposite>
        <span :class="`headline font-weight-bold ${year.color}--text`" v-text="year.year"></span>
      </template>
      <div class="py-3">
        <h2 :class="`headline font-weight-light mb-3 ${year.color}--text`">Lorem ipsum</h2>
        <div>
          Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire
          principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
        </div>
      </div>
    </v-timeline-item>
  </v-timeline>
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
    props: ['items', 'datoslist'],
    methods: {},
    created: function () {
      var Score = this.datos.Score;
      if (this.datos.Score != undefined) {
        switch (Score) {
          case 2:
            this.color = "red darken-1";
            break;
          case 4:
            this.color = "red lighten-2";
            break;
          case 6:
            this.color = "light-blue lighten-2";
            break;
          case 8:
            this.color = "blue lighten-4";
            break;
          case 10:
            this.color = "blue lighten-2";
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
