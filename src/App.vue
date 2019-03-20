<template>
  <div id="app" class="h-100p">
    <div class="container-fluid h-100p">
      <login v-if="gsw_ui === 'login'"></login>     
      <blackboard v-if="gsw_ui === 'blackboard'" ></blackboard>
    </div>
  </div>
</template>

<script>
  /*APPSS */
  import blackboard from './components/blackboard.vue';
  import login from './components/modules/login/login.vue';

  export default {

    name: 'App',
    components: {
      blackboard,
      login
    },
    data() {
      return {}
    },
    computed: {
      gsw_ui() {
        return this.$store.getters.gsw_ui;
      }
    }

  }
</script>

<style scoped>
  @import './assets/css/global.css';
</style>