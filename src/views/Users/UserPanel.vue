<template>
  <!-- TODO use panel and add btns -->
  <!-- <div class="container">
    <p>
      <strong>username:</strong>
      {{user.username}}
    </p>
    <p>
      <strong>email:</strong>
      {{user.email}}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="(role,index) in user.has_role" :key="index">{{role.node.name}}</li>
    </ul>
  </div>-->

  <div class="container">
    <v-layout column>
      <v-flex xs6>
        <panel title="Profile">
          <v-toolbar-items slot="action">
            <div>
            <v-btn @click="toggleUpdate" class="yellow ml-2 mt-1" title="update profile" light>
              <v-icon>update</v-icon>
            </v-btn>
            </div>
            <div>
            <v-btn @click="toggleQuestionnaire" class="yellow ml-2 mt-1" title="questionnaire" light>
              <v-icon>feedback</v-icon>
            </v-btn>
            </div>
          </v-toolbar-items>

          <user-panel-update v-if="showUpdate" />

          <div>
            <ul>
              <li>name: {{user.username}}</li>
              <li>email: {{user.email}}</li>
              <li>description: {{user.description}}</li>
              <ul>
                roles:
                <li v-for="(role,index) in user.has_role" :key="index">{{role.node.name}}</li>
              </ul>
            </ul>
          </div>

          <user-panel-questionnaire v-if="showQuestionnaire" />

        </panel>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserPanelUpdate from "./UserPanelUpdate.vue";
import UserPanelQuestionnaire from "./UserPanelQuestionnaire.vue";

export default {
  name: "UserPanel",
  components: {
    UserPanelUpdate,
    UserPanelQuestionnaire,
  },
  data() {
    return {
      showUpdate: false,
      showQuestionnaire: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    toggleUpdate() {
      this.showUpdate = !this.showUpdate;
    },
    toggleQuestionnaire() {
      this.showQuestionnaire = !this.showQuestionnaire;
    },
  },
  mounted() {
    if (!this.user) {
      this.$router.push("/login");
    }
  },
};
</script>
