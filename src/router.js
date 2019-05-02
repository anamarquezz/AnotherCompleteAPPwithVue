import Vue from 'vue'
import Router from 'vue-router'


import login from '../src/views/login.vue';
import mempleadosaevaluar from '../src/views/mempleadosaevaluar.vue';
import mhome from '../src/views/mhome.vue';
import mevaluarempledo from '../src/views/mevaluarempledo.vue';
import mempleadosevaluadores from '../src/views/mempleadosevaluadores.vue';
import mevaluadosporsupervisor from '../src/views/mevaluadosporsupervisor.vue';
import mconfigurarfechas from '../src/views/mconfigurarfechas.vue';
import mtodosempleados from '../src/views/mtodosempleados.vue'
Vue.use(Router)

export default new Router({
 // mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: "/", //mean the path of the component
      name: 'login', //name of the component
      component: login //the view component
    },
    {
      path: "/mhome",
      name: 'mhome',
      component: mhome
    },
    {
      path: "/mempleadosaevaluar",
      name: 'mempleadosaevaluar',
      component: mempleadosaevaluar
    },{
      path:'/mempleadosaevaluar/mevaluarempledo',
      name: 'mevaluarempledo',
      component:mevaluarempledo
    },
    {
      path:'/mempleadosevaluadores',
      name:'mempleadosevaluadores',
      component:mempleadosevaluadores
    },{
      path:'/mempleadosevaluadores/mevaluadosporsupervisor',
      name:'mevaluadosporsupervisor',
      component:mevaluadosporsupervisor
    },
    {
      path:'/mconfigurarfechas',
      name:'mconfigurarfechas',
      component:mconfigurarfechas
    },
    {
      path:'/mtodosempleados',
      name:'mtodosempleados',
      component:mtodosempleados
    }
    
  ]
});
