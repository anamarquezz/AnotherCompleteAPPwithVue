<template>
  <div class="mt-1">
    <nav class="navbar navbar-expand-md navbar-expand-sm  navbar-expand-lg navbar-dark bg-dark roundnav">
   <img src="../../assets/img/logow.png" width="200px" class="mr-2" />
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarsExample03">
    <ul class="navbar-nav mr-auto">   
    </ul>
    <form class="form-inline my-2 my-md-0 text-white">
      <h6 class="ml-3 ">{{g_loginUser.Name}}</h6>
          <h6 class="ml-3 ">{{g_loginUser.Puesto}}</h6>
          <h6 class="ml-3 ">{{g_loginUser.area}}</h6>
          <img :src="g_loginUser.UserPic" class="iconmenu rounded-circle" />
    </form>
  </div>
</nav>



  </div>

</template>

<script>
  export default {
    name: 'navbar',
    components: {},
    data() {
      return {}
    },
    computed: {
      g_loginUser() {
        return this.$store.getters.g_loginUser;
      }
    },
    methods: {}
  }
</script>

<style>
  @import "../../assets/css/global.css";
  @import "../../assets/css/navbar.css";
</style>