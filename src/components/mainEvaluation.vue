<template>
  <div class="container-fluid">
    <div class="row mt-2">
      <div class="col-9">
        <!-- <h4 class="mt-2 dinline">Evaluación de <strong>Desempeño</strong></h4> -->
        </div> 
        <div class="col-3 text-right">           
            <v-btn color="light-blue darken-4" dark large>Log Out</v-btn>
        </div>
    
     
     
  </div>
   
    <navbar></navbar>    
    <employeetoevaluate></employeetoevaluate>
  </div>
</template>

<script>
  import navbar from '../components/nav/navbar.vue';
  import employeetoevaluate from '../components/modules/employeetoevaluate.vue';
  export default {
    name: 'mainEvaluation',
    components: {
      navbar,
      employeetoevaluate
    },
    data() {
      return {}
    },
    computed: {
     
    },
    methods: {}
  }
</script>

<style scoped>

</style>