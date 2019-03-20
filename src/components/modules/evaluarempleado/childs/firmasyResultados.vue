<template>
  <v-container grid-list-xl>
    <v-layout wrap justify-space-between class="white">
      <v-toolbar dark color="">
        <h5>Firmas y resultados</h5>
      </v-toolbar>

    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'firmasyResultados',
    props: {},
    data() {
      return {
        data: {}
      }
    },
    methods: {},
    computed: {
      g_loginUser() {
        return this.$store.getters.g_loginUser;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../../assets/css/global.css';

  @import '../../../../assets/css/media_query.css';
</style>