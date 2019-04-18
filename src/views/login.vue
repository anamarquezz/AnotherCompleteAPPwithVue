<template>
  <div class="row containerswiper">
    <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 backgroundfondo ">



      <div class="topcenter">
        <div>
          <img src="../assets/img/logow.png" class="mb-5  ml-5 imgRes  " />
        </div>
        <div class="marketing-banner-text ml-5">Evaluación de <strong>desempeño</strong>
        </div>


        <form>
          <b-form-group id="inputusername" class="f3 text-white ml-5 w-75" label="User Name:" label-for="username"
            description="">
            <b-form-input id="username" type="text" placeholder="User Name" @keydown.native="onlogin" value="" autocomplete="username">
            </b-form-input>
          </b-form-group>


          <b-form-group id="inputPassword " class="f3 text-white mb-4 ml-5 w-75" label="Password:" label-for="passw"
            description="">
            <b-form-input id="password" type="password" placeholder="Password" @keydown.native="onlogin" autocomplete="current-password" value="">
            </b-form-input>
          </b-form-group>
          v-on
          <b-btn class="btn btn-lg btn-primary btn-block ml-5 w-75" variant="primary" v-on:click="onloginn()">Sign in
          </b-btn>
          <p class="mt-5 mb-3 text-muted text-center">© 2019</p>
          <!--<b-btn class="btn btn-lg btn-primary btn-block ml-5 w-75" variant="deep-purple" v-on:click="onloginjson()">log ing with json</b-btn> -->
        </form>




      </div>
    </div>

    <div class="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 height100 ">
      <div class="d-sm-block">
        <img src="../assets/img/evaluationback.png" class="" />
      </div>
    </div>

  </div>

</template>

<script>
  export default {
    name: 'login',
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
        var esto = this;
        if (event.which === 13) {
          if (esto.validLogin()) {
              esto.$store.dispatch("s_Loading", { value: 0, show: true });
           
          this.$store.dispatch('AUTH_REQUEST', {
            username: esto.data.username,
            password: esto.data.password
          }).then(() =>        
            esto.$router.push('/mhome')).catch(err => console.log(err));
        } else {          
           this.$store.dispatch('set_showMessage', {
            message: 'Usuario o Contraseña no capturadas, favor de ingresar los datos correspondientes',
            show: true,
            title: 'Error',
            showregresar: false,
            colorThema: 'red'
          });        
          }
        }
      },
      onloginn: function () {
        var esto = this;
        if (this.validLogin()) {
           esto.$store.dispatch("s_Loading", { value: 0, show: true });
           
          this.$store.dispatch('AUTH_REQUEST', {
            username: esto.data.username,
            password: esto.data.password
          }).then(() => esto.$router.push('/mhome')).catch(err => console.log(err));
        } else {
           esto.$store.dispatch("s_Loading", { value: 0, show: false })
          this.$store.dispatch('set_showMessage', {
            message: 'Usuario o Contraseña no capturadas, favor de ingresar los datos correspondientes',
            show: true,
            title: 'Error',
            showregresar: false,
            colorThema: 'red'
          });
        }
      },
      onloginjson: function () {
        this.$store.dispatch('set_loginwidthjsons', true);
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
  @import '../assets/css/global.css';

  @import '../assets/css/media_query.css';

</style>
