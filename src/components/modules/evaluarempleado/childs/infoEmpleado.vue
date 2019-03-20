<template>
  <v-container>
    <v-layout wrap class="white">
      <v-toolbar dark>
        <h5>Información del Empleado</h5>
      </v-toolbar>

      <v-layout row wrap>

        <v-flex xs12 xl4>            
          <v-text-field outline label="Num Emp" :value="g_empleadoaEvaluar.Number"  prepend-inner-icon="fas fa-hashtag"></v-text-field>
        </v-flex>

        <v-flex xs12 xl8>
          <v-text-field outline label="Nombre:" :value="g_empleadoaEvaluar.Name"  prepend-inner-icon="fa fa-user"></v-text-field>
        </v-flex>

        <v-flex xs12 xl7>
          <v-text-field outline label="Departamento" :value="g_empleadoaEvaluar.Department"  prepend-inner-icon="fas fa-users"></v-text-field>
        </v-flex>
        <v-flex xs12 xl5>
          <v-text-field outline label="Fecha de Ingresor" :value="g_empleadoaEvaluar.AdmissionDate"  prepend-inner-icon="far fa-calendar-alt"></v-text-field>
        </v-flex>

        <v-flex xs12 xl7>
          <v-text-field outline label="Puesto Actual" :value="g_empleadoaEvaluar.Position"  prepend-inner-icon="fas fa-address-book"></v-text-field>
        </v-flex>
        <v-flex xs12 xl5>
          <v-text-field outline label="Salario Actual"  value="$" prepend-inner-icon="fas fa-dollar-sign"></v-text-field>
        </v-flex>

        <v-flex xs12 xl4>
          <v-text-field outline label="Planta"  :value="g_empleadoaEvaluar.Clasification" prepend-inner-icon="fas fa-address-card"></v-text-field>
        </v-flex>

        <v-flex xs12 xl8>
          <v-text-field outline label="Supervisor"  :value="g_empleadoaEvaluar.SupervisorPrettyName" prepend-inner-icon="fas fa-user-tie"></v-text-field>
        </v-flex>

      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'infoEmpleado',
    props: {},
    data() {
      return {
        aa: 'aaa'
      }
    },
    methods: {},
    computed: {
      g_empleadoaEvaluar() {
        return this.$store.getters.g_empleadoaEvaluar;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../../assets/css/global.css';

  @import '../../../../assets/css/media_query.css';

  .v-text-field.v-text-field--enclosed .v-text-field__details {
    margin-bottom: -23px !important;
  }

  .theme--light.v-text-field--outline>.v-input__control>.v-input__slot {
    border: 2px solid rgb(204, 204, 204) !important;
  }
</style>