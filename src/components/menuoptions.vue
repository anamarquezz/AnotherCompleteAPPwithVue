<template>
  <v-navigation-drawer fixed clipped class="grey lighten-4" app v-model="g_drawer">
    <v-list dense class="grey lighten-4">
      <template v-for="(item, i) in itemsmenu">
        <v-layout row v-if="item.heading" align-center :key="i">
          <v-flex xs6>
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-flex>
          <v-flex xs6 class="text-xs-right">

          </v-flex>
        </v-layout>
        <v-divider dark v-else-if="item.divider" class="my-3" :key="i"></v-divider>
        <v-list-group v-else-if="item.children" v-model="item.model" :key="item.text"
          :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-for="(child, i) in item.children" :key="i" @click="opcionmenu(item.children[i])" class="ml-4">
            <v-list-tile-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ child.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile v-else @click="opcionmenu(item)" :key="item.text">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "menuoptions",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      loginUser: "loginUser",
      itemsmenu: "itemsmenu"
    }),
    g_drawer: {
      get() {
        return this.$store.getters.g_drawer;
      },
      set(newValue) {}
    }
  },
  props: [],
  methods: {
    opcionmenu(item) {
      var esto = this,
        metodo = "";
      this.$store.dispatch("set_clear_paginado", 0);

      switch (item.code) {
        case "#login":
          metodo = "AUTH_LOGOUT";
          break;
        case "mevaluarempledo":
          this.$store.dispatch("GetEvaluationEmployee", {
            Number: esto.loginUser.userId
          });
          this.$store.dispatch("set_regresar", false);
          break;
      }
      if (item.code != "expand") {
        if (metodo == "") {
          esto.$router.push("/" + item.code);
        } else {
          esto.$store.dispatch("s_Loading", {
            value: 0,
            show: true
          }),
            esto.$store
              .dispatch(metodo)
              .then(
                () => esto.$router.push("/" + item.code)
                //    esto.$store.dispatch("s_Loading", { value: 0, show: false })
              )
              .catch(err => console.log(err));
        }
      }
    }
  }
};
</script>

<style scoped>
</style>
