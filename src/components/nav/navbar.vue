<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Evaluación Desempeño</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample03">
        <ul class="navbar-nav mr-auto">
        </ul>
        <form class="form-inline my-2 my-md-0">
          <div class="row">
            <div class="col-2">
              <img :src="g_loginUser.UserPic" class="iconsize rounded-circle" />
            </div>
            <div class="col-5">
              <h6 class="ml-3 text-white">{{g_loginUser.Name}}</h6>
            </div>
          </div>
          <div class="row">
            <div class="col">
                 <h6 class="ml-3 text-white">{{g_loginUser.Puesto}}</h6>
                  <h6 class="ml-3 text-white">{{g_loginUser.area}}</h6>
            </div>
          </div>



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
  @import "../../assets/css/global.css"
</style>