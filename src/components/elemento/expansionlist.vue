  <template>

    <v-layout row wrap>
      <v-flex xs12>
        <v-expansion-panel popout>
          <v-expansion-panel-content v-for="item in list" :key="item.Id">
            <div slot="header" class="title"><i class=""></i> {{ item[headertitle]  }}</div>
            <v-card>
              <v-card-title>
                <div>
                  <span class="title">Evaluación, </span>  <span class="font-weith-bold title">{{item[subtitletext2]}} </span>                 
                    <div class="row subtitle">
                      <div class="col-5">
                          {{subtitletext3}} {{item[subtitletext3]}} 
                      </div>
                      <div class="col-5">
                          {{subtitletext4}}
                          {{item[subtitletext4]}}
                      </div>
                    </div>                   
                </div>
              </v-card-title>
              <v-card-text>               
                  {{item[cardtext]}}
                </v-card-text>
                
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>



  </template>


  <script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "expansionlist",
  props: [
    "list",
    "headertitle",
    "subtitletext1",
    "subtitletext2",
    "subtitletext3",
    "subtitletext4",
    "cardtext"
  ],
  data() {
    return {
      notifications: false,
      sound: true,
      widgets: false
    };
  },
  methods: {},
  computed: {
    ...mapGetters(["g_loginUser"])
  },
  mounted: function() {
    var a = this;
  }
};
</script>

  <style>
@import "../../assets/css/global.css";
@import "../../assets/css/media_query.css";

.v-expansion-panel__header {
  background: #d4d9e1 !important;
  font-weight: bold !important;
  font-size: 15px !important;
  color: #282828c2 !important;
  margin: 1px !important;
}
</style>
