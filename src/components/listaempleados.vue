<template>
  <div class="dtlayout">
    <!-- <v-btn v-if="g_gridby ==='employesScore'" color="blue darken-2 mnl-5" dark large @click="RegresarUsuarios()"><b>
        <h4 class="dinline mr-2"><i class="fas fa-arrow-left mt-2"></i></h4>Regresar
      </b>
    </v-btn> -->

    <v-toolbar light color="" class="" v-if="!hassearch">
      <h5 v-if="from !='EVAL'"><b>{{g_loginUser.position}}, <i class="fas fa-user ml-3"></i></b>
        {{g_loginUser.supervisorSeleccionado}}</h5>
      <v-spacer></v-spacer>
      <v-text-field v-if="!isMobile" v-model="search" append-icon="search" label="buscar" single-line hide-details>
      </v-text-field>


      <!--   <download-excel class="btn btn-default ml-3" :data="json_data" :fields="json_fields" worksheet="My Worksheet"
        name="filename.xls">
        <img src="../assets/img/excel.png" width="30" />
        Descargar Excel
        <i class="fas fa-download "></i> 
      </download-excel> -->


      <download-excel v-if="excelname != ''" class="btn btn-default green lighten-4   font-weight-bold title btnhover ml-3" :data="list"
        :fields="getjsonfields()" worksheet="My Worksheet" :name="excelname">
        <img src="../assets/img/excel.png" width="30" />
        Descargar Excel
        <i class="fas fa-download"></i>

      </download-excel>

    </v-toolbar>

    <v-layout v-resize="onResize" column>
      <v-data-table :dark="dark" v-if="list.length > 0" :headers="headers" :items="list" :search="search"
        :custom-filter="customFilter" :pagination.sync="pagination"  :rows-per-page-items="pagination.rowsPerPageItems"
        :footer-props="{'show-current-page':true }"
        :hide-headers="isMobile" :class="{mobile: isMobile}" class="elevation-1">
      <template slot="headerCell" slot-scope="props">
          <v-tooltip bottom>
            <template slot="activator">
              <span>
                {{ props.header.text }}
              </span>
            </template>
            <span v-if="props.header.tooltip != null">
              {{ props.header.tooltip }}
            </span>
            <span v-else>
              {{ props.header.text }}
            </span>
          </v-tooltip>
        </template>
``
        <template slot="items" slot-scope="props">
          <tr v-if="!isMobile" class="grey lighten-4"> 
            <td v-for="h in headers" :key="h.value" class="text-center">

              <b v-if="h.type ==='text'" class="font-size-17 black--text">
                {{props.item[h.value]}}
              </b>

              <v-btn flat icon color="primary" v-if="h.type ==='icon'" @click="metodo(h,props.item)">
                <v-icon>{{h.iconbtn}}</v-icon>
              </v-btn>



              <v-btn v-if="h.type ==='button'" dark large :class="[conditioncolor(h,props),conditiondisplay(h,props)]" class="w-75 mb-2"
                @click="metodo(h,props.item)">
                <b v-if="h.has_condition">{{conditiontext(h,props)}}</b>
                <b v-else>{{h.btntitle}}</b>
              </v-btn>

            


              <img v-if="h.type ==='image'" :src="props.item[h.value]" class="iconsize rounded-circle mt-1 mb-1 " />


              <v-menu v-if="h.type ==='combo'" lazy :close-on-content-click="true" transition="scale-transition"
                offset-y full-width :nudge-right="40" max-width="190px" min-width="290px">
                <v-btn flat icon color="primary" :v-model="h.value" slot="activator">
                  <v-icon>{{h.iconbtn}}</v-icon>
                </v-btn>
                <v-list style="max-height: 250px">
                  <v-list-tile v-for="item in listacombo(props.item,h.value)" :key="item[h.valuecombo]" v-model="btn">
                    <v-list-tile-title class="black--text" @click="metodo(h,item)">
                      <i class="fas fa-user mr-2 subtitle " style=" z-index:9000"></i>{{ item[h.titlecombo]}}
                    </v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>

            </td>
          </tr>
          <tr v-else>
            <td>
              <ul class="flex-content mb-5 ">
                <li v-for="h in headers" :key="h.text" class=" flex-item mb-3" v-if="h.resize" :data-label="h.text">
                  <img v-if="h.type ==='image'  && h.resize == true" :src="props.item[h.value]"
                    class="iconsize rounded-circle mt--10" />

                  <b v-if="h.type ==='text' && h.resize">
                    {{props.item[h.value]}}
                  </b>

                  <v-btn flat icon color="primary" v-if="h.type ==='icon'" @click="metodo(h,props.item)">
                <v-icon>{{h.iconbtn}}</v-icon>
              </v-btn>



              <v-btn v-if="h.type ==='button'" dark large :class="[conditioncolor(h,props),conditiondisplay(h,props)]" class="w-75 mb-2"
                @click="metodo(h,props.item)">
                <b v-if="h.has_condition">{{conditiontext(h,props)}}</b>
                <b v-else>{{h.btntitle}}</b>
              </v-btn>

                


                  <v-menu v-if="h.type ==='combo'" lazy :close-on-content-click="true" transition="scale-transition"
                    offset-y full-width :nudge-right="40" max-width="190px" min-width="290px">
                    <v-btn flat icon color="primary" :v-model="h.value" slot="activator">
                      <v-icon>{{h.iconbtn}}</v-icon>
                    </v-btn>
                    <v-list>
                      <v-list-tile v-for="item in listacombo(props.item,h.value)" :key="item[h.valuecombo]"
                        v-model="btn">
                        <v-list-tile-title class="black--text" @click="metodo(h,item)">
                          <i class="fas fa-user mr-2 subtitle"></i>{{ item[h.titlecombo]}}</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>

                </li>
              </ul>

            </td>
          </tr>
        </template>
        <v-alert slot="no-results" :value="true" color="red lighten-1" icon="warning ">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
    </v-layout>



  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "listaempleados",
  data() {
    return {
      isMobile: false,
      color: "blue darken-3",
      btn: "btn",
      search: "",
      condition_values: {
        text: "",
        color: "indigo darken-4"
      },
      json_fields: {
        "Complete name": "name",
        City: "city",
        Telephone: "phone.mobile",
        "Telephone 2": {
          field: "phone.landline",
          callback: value => {
            return `Landline Phone - ${value}`;
          }
        }
      },
      json_data: [
        {
          name: "Tony Peña",
          city: "New York",
          country: "United States",
          birthdate: "1978-03-15",
          phone: {
            mobile: "1-541-754-3010",
            landline: "(541) 754-3010"
          }
        },
        {
          name: "Thessaloniki",
          city: "Athens",
          country: "Greece",
          birthdate: "1987-11-23",
          phone: {
            mobile: "+1 855 275 5071",
            landline: "(2741) 2621-244"
          }
        }
      ],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8"
          }
        ]
      ]
    };
  },
  props: [
    "headers",
    "list",
    "from",
    "dark",
    "hassearch",
    "haspagination",
    "excelname",
    "pagination_name"
  ],
  computed: {
    ...mapGetters(["g_loginUser"]),
    pagination: {
      get() {
        if (this.list.length < 10) {
          var newValue = this.$store.state[this.pagination_name];
          newValue.page = 1;
          this.$store.dispatch("set_paginationnumber", {
            newvalue: newValue,
            paginationname: this.pagination_name
          });
        }
        return this.$store.state[this.pagination_name];
      },
      set(newValue) {
        return this.$store.dispatch("set_paginationnumber", {
          newvalue: newValue,
          paginationname: this.pagination_name
        });
      }
    }
  },
  methods: {
    metodo(h, items) {
      this.search = "";
      this.$store.dispatch(h.action, { items: items, headers: h });
    },
    listacombo(items, Nombrearray) {
      var esto = this;
      return items[Nombrearray];
    },
    conditioncolor(h, props) {
      var pr = "";
      var esto = this;
      try {
        if (h.has_condition && props.item[h.condition_property] !== undefined) {
          if (props.item[h.condition_property2] != undefined) {
            pr =
              h.conditionvalues[
                h.conditionvalues.findIndex(
                  el =>
                    el.condition === props.item[h.condition_property2] &&
                    h.getconditiontext
                )
              ];
          }
          if (
            props.item[h.condition_property] != undefined &&
            (pr == undefined || pr == "")
          ) {
            pr =
              h.conditionvalues[
                h.conditionvalues.findIndex(
                  el => el.condition === props.item[h.condition_property]
                )
              ];
          }
          if (pr != undefined) return pr.color;
          else return "transparent";
        } else {
          return h.color;
        }
      } catch (e) {
        console.log(e);
      }
    },
    conditiondisplay(h, props) {
      try {
        if (
          h.conditionClass &&
          h.has_condition &&
          props.item[h.condition_property] !== undefined
        ) {
          var esto = this;
          var pr =
            h.conditionvalues[
              h.conditionvalues.findIndex(
                el => el.condition === props.item[h.condition_property]
              )
            ];
          if (pr != undefined) return pr.class;
          else return "d-none";
        } else {
          return;
        }
      } catch (e) {
        console.log(e);
      }
    },
    conditiontext(h, props) {
      var esto = this,
        pr = "";

      if (props.item[h.condition_property2] != undefined) {
        pr =
          h.conditionvalues[
            h.conditionvalues.findIndex(
              el =>
                el.condition === props.item[h.condition_property2] &&
                h.getconditiontext
            )
          ];
      }
      if (
        props.item[h.condition_property] != undefined &&
        (pr == undefined || pr == "")
      ) {
        pr =
          h.conditionvalues[
            h.conditionvalues.findIndex(
              el =>
                el.condition === props.item[h.condition_property] &&
                h.getconditiontext
            )
          ];
      }

      if (pr != undefined) return pr.text;
      else return;
    },
    getjsonfields() {
      var result = {};
      this.headers
        .filter(x => x.type == "text")
        .forEach(h => (result[h.text] = h.value));

      return result;
    },

    onResize() {
      if (window.innerWidth < 910) this.isMobile = true;
      else this.isMobile = false;
    },
    customFilter(items, search, filter) {
      //this custom filter will do a multi-match separated by a space.
      //e.g

      if (!search) {
        return items;
      } //if the search is empty just return all the items

      function new_filter(val, search) {
        return (
          val !== null &&
          ["undefined", "boolean"].indexOf(typeof val) === -1 &&
          val
            .toString()
            .toLowerCase()
            .replace(/[^0-9a-zA-Z]+/g, "")
            .indexOf(search) !== -1
        );
      }

      let needleAry = search
        .toString()
        .toLowerCase()
        .split(" ")
        .filter(x => x);
      //whenever we encounter a space in our search we will filter for both the first and second word (or third word)

      return items.filter(row =>
        needleAry.every(needle =>
          Object.keys(row).some(key => new_filter(row[key], needle))
        )
      );
      //foreach needle in our array cycle through the data (row[key]) in the current row looking for a match.
      // .some will return true and exit the loop if it finds one it will return false if it doesnt
      // .every will exit the loop if we dont find a match but will return true if all needles match
      // .filter the rows on each match
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.desserts.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    }
  },

  mounted: function() {
    console.log(this.list);
  }
};
</script>

<style scoped>
.btnhover:hover {
  color: rgb(17, 138, 81);
}

table.v-table tbody td:first-child,
table.v-table tbody td:not(:first-child),
table.v-table tbody th:first-child,
table.v-table tbody th:not(:first-child),
table.v-table thead td:first-child,
table.v-table thead td:not(:first-child),
table.v-table thead th:first-child,
table.v-table thead th:not(:first-child) {
  padding: 0px 4px 9px 3px !important;
}
</style>
