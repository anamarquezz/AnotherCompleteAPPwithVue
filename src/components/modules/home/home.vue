<template>
  <v-layout row class="mt-5">
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
          <div class="text-center">
         <img src="../../../assets/img/logow.png"  />
          </div>
        <v-card-title primary-title >
          <div>
            <h2 class="">Bienvenido al Sistema de Evaluación de desempeño</h2>
            <h4 class="grey--text">Clover Wireless</h4>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
  </template>


  <script>
    export default {
      name: 'home',
      props: {},
      data() {
        return {
          data: {
             show: false,
            username: '',
            password: ''
          }
        }
      },
      methods: {}
    }
  </script>

<style>
    @import '../../../assets/css/global.css';
  @import '../../../assets/css/media_query.css';
</style>
      