<template>
  <div class="container-fluid">.
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