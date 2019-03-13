<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 height100 backgroundfondo">
          <img src="../../assets/img/logow.png" class="mt-5 imgRes" />
          <div class="topcenter">
            <div class="marketing-banner-text">Evaluación de <strong>desempeño</strong>
            </div>


            <form>
              <b-form-group id="inputusername" class="f3 text-white" label="User Name:" label-for="username" description="">
                <b-form-input id="username" type="text" placeholder="User Name" @keyup.enter="onlogin">
                </b-form-input>
              </b-form-group>


              <b-form-group id="inputPassword" class="f3 text-white mb-4" label="Password:" label-for="passw" description="">
                <b-form-input id="password" type="password" placeholder="Password" @keyup.enter="onlogin">
                </b-form-input>
              </b-form-group>

          <b-btn class="btn btn-lg btn-primary btn-block " variant="primary" v-on:click="onloginn()">Sign in</b-btn>
          <p class="mt-5 mb-3 text-muted text-center">© 2019</p>
          </form>




        </div>
      </div>

      <div class="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 height100 text-center banner  d-sm-none d-md-block d-lg-block d-xl-block">

        <div class="banner">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    props: {},
    data() {
      return {
        data: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      onlogin: function (event) {       
        if (event.code == "NumpadEnter") {
          if (this.validLogin) {
            this.$store.dispatch('_token', this.data);
          }
        }
      },
      onloginn: function () {
         
        if (this.validLogin()) {
          this.$store.dispatch('_token', this.data);
        }
      },
      validLogin: function () {
        this.data.username = document.getElementById('username').value,
          this.data.password = document.getElementById('password').value;

        if (this.data.username != "" && this.data.password != "") {
          return true;
        } else {
          return false;
        }

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../assets/css/global.css';

  @import '../../assets/css/media_query.css';
</style>