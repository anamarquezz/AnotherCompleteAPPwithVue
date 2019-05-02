<template>
  <v-container fluid>
    <v-layout>
      <navbar color="grey darken-4" textcolor="white--text"></navbar>
      <v-flex row xs3 md3 lg3 xl3>
        <menuoptions></menuoptions>
      </v-flex>
      <v-flex row xs11 md11 lg11 xl11 >
        <v-container fluid class="mt-5">
          <v-toolbar dark color="indigo darken-4 white--text">
            <h4><i class="far fa-list-alt mr-3"></i>Empleados a evaluar</h4>
            <v-spacer></v-spacer>            
          </v-toolbar>
         <listaempleados :headers="headers" v-if="g_loginUser.Subordinates.length > 0"  :list='g_loginUser.Subordinates' excelname="empleadosEvaluadores.xls" >
          </listaempleados> 
        </v-container>
          <v-container fluid >
          <v-toolbar dark color="blue darken-1 white--text">
            <h4><i class="far fa-list-alt mr-3"></i>Escala de distribución</h4>
            <v-spacer></v-spacer>        
          </v-toolbar>
         <listaempleados from="EVAL"  :headers="headersDistribucion" v-if="g_loginUser.DistributionSuperviser.length > 0" :list='g_loginUser.DistributionSuperviser' excelname="escaladistribuciontodosempleados.xls" >
          </listaempleados> 
      </v-container>
      </v-flex>
    </v-layout>


  </v-container>
</template>

<script>
  import {
    mapState,
    mapActions,
    mapGetters
  } from 'vuex';


  import listaempleados from '../components/listaempleados.vue'
  import navbar from '../components/navbar.vue'
  import menuoptions from '../components/menuoptions.vue'
  import escaladistribucion from '../components/escaladistribucion.vue';


  export default {

    name: 'mempleadosaevaluar',
    components: {
      menuoptions,
      navbar,
      listaempleados,
      escaladistribucion

    },
    data() {
      return {
        color: 'green lighten-1',
        headers: [{
            text: ".",
            type: 'image',
            value: "Image",
            resize: true
          },
          {
            text: "Num Emp",
            type: 'text',
            value: "Number",
            resize: false
          },
          {
            text: "Nombre",
            type: 'text',
            value: "PrettyName",
            resize: true
          },
          {
            text: "Clasificación",
            type: 'text',
            value: "Clasificacion",
            resize: true
          },
          {
            text: "Puesto",
            type: 'text',
            value: "Position",
            resize: true
          },
          {
            text: "Status",
            type: 'text',
            value: "Status",
            resize: true
          },
          {
            text: "Evaluación",
            type: 'text',
            value: "Score",
            resize: true
          },
          {
            text: "",
            type: 'button',
            btntitle: 'Evaluar',
            action: "action_evaluarEmpleado",
            has_condition: true,
            condition_property: 'Status',      
            getconditiontext:true,     
            conditionvalues:[
              {
              condition :'NO INICIADO',
              text:'Evaluar',
              color:'indigo darken-4'
              },
              {
                condition :'EVALUADO',
                text:'Editar',
                color:'blue darken-3'
              },
                {
                condition :'INICIADO',
                text:'Editar',
                color:'blue darken-3'
              },
              {
                condition :'COMPLETADO',
                text:'Editar',
                color:'blue darken-3'
              }
            ],
            resize: true,
            value: ""
          }
        ],
        headersDistribucion:[
          {
            text: "",
            type: 'text',
            value: "ValueDefinition",
            resize: true
          },{
            text: "Puntuación",
            type: 'text',
            value: "Puntuation",
            resize: true
          },
          
          {
            text: "% de Distribución",
            type: 'text',
            value: "Percentage",
            resize: true
          },
          {
            text: "Evaluación",
            type: 'text',
            value: "Score",
            resize: true
          },
          {
            text: "Capacidad Maxima",
            type: 'text',
            value: "Quantity",
            resize: true
          },
          {
            text: "Personas Evaluadas",
            type: 'text',
            value: "Evaluated",
            resize: true
          },
          {
            text: "Nombre Personas",
            type: 'combo',
            value: "distributionByEmployee",
            iconbtn:'fa fa-users',
            titlecombo:'PrettyName',
            valuecombo:'Number',  
            action: "action_evaluarEmpleado",          
            resize: true
            
          }
          ]
       
      }
    },
    computed: {
      ...mapGetters(["g_loginUser"]),
      ...mapState([
        'token'
      ])
    },
    methods: {
      escalaDis(Score) {
        var esto = this;

        var dialog = {
          Value: true,
          Title: " Escala distribucion " + Score.Score + " ",
          Subtitle: Score.ValueDefinition + "  porcentaje " + Score.Percentage + '%',
          contieneImagen: false,
          Image: '',
          Paragraph: '',
          component: {
            type: 'list',
            list: esto.g_loginUser.Subordinates.filter(function (el) {
              return el.Score == Score.Score
            }),
            dindex: 'Number',
            title: 'PrettyName',     
            subtitle: 'Position',       
            avatar: 'Image',     
          }
        };

        this.$store.dispatch('sw_dialog', dialog);
      }
    },
    created() {
      var esto = this;
      esto.$store.dispatch("s_Loading", {
          value: 0,
          show: true
        }),
        esto.$store.dispatch('GetSubordinateByUser');
    }
  }

</script>

<style scope>
  @import '../assets/css/global.css';

  @import '../assets/css/media_query.css';

.mr-10{
  margin-right: 80px
}
</style>
