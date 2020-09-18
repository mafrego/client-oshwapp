<template>
  <v-toolbar class="cyan" rounded color="primary">
    <v-btn title="home" class="grey" :to="{name: 'home'}">
      <v-icon>home</v-icon>
    </v-btn>

    <v-btn title="search fully assembled" :to="{name: 'products'}" class="grey ml-2">
      <v-icon>zoom_out</v-icon>
    </v-btn>

    <v-btn title="search atoms" :to="{name: 'atoms'}" class="grey ml-2">
      <v-icon>zoom_in</v-icon>
    </v-btn>

    <v-btn
      v-if="!$store.state.isUserLoggedIn"
      title="validate bom.csv"
      :to="{name: 'validate'}"
      class="grey ml-2"
    >
      <v-icon>done</v-icon>
    </v-btn>

    <v-btn class="grey ml-2" :to="{name: 'help'}" title="help">
      <v-icon>help</v-icon>
    </v-btn>

    <v-btn v-if="isUserLoggedIn" :to="{name: 'projects'}" title="projects" class="grey ml-2">
      <v-icon>settings</v-icon>
    </v-btn>

    <v-btn
      title="admin board"
      v-if="isUserLoggedIn && currentRoles.includes('admin')"
      class="grey ml-2"
      :to="{name: 'adminboard'}"
    >
      <v-icon>admin_panel_settings</v-icon>
    </v-btn>

    <v-btn v-if="isUserLoggedIn" :to="{name: 'userPanel'}" title="profile" class="grey ml-2">
      <v-icon>person</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <v-toolbar-items v-if="isUserLoggedIn" class="mt-10 mr-4">
      <router-link class="home" tag="span" :to="{name: 'userPanel'}">
        <v-icon>sentiment_satisfied</v-icon>
        hi {{user.username}}!
      </router-link>
    </v-toolbar-items>

      <div>
        <v-btn v-if="!isUserLoggedIn" class="grey" text :to="{name: 'login'}">Login</v-btn>
      </div>

      <div>
        <v-btn v-if="!isUserLoggedIn" class="grey ml-2" text :to="{name:'register'}">Register</v-btn>
      </div>

      <div>
        <v-btn v-if="isUserLoggedIn" class="grey ml-2" text @click="logout">Log Out</v-btn>
      </div>
  </v-toolbar>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "PageHeader",
  methods: {
    ...mapActions(["setUser", "setToken"]),
    // ...mapActions('users',[
    //   'setUser',
    //   'setToken'
    // ]),
    logout() {
      this.setUser(null);
      this.setToken(null);
      // this.$store.dispatch("setToken", null);
      // this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "products",
      });
    },
  },
  computed: {
    ...mapState(["user", "token", "isUserLoggedIn"]),
    // ...mapState({
    //   currentUser: state => state.users.user,
    //   isUserLoggedIn: state => state.users.isUserLoggedIn
    //   }),

    currentRoles() {
      // if-else to avoid Vue warn in case user is not logged in
      if (this.user.has_role) {
        let roles = this.user.has_role;
        return roles.map((el) => el.node).map((el) => el.name);
      } else {
        return [];
      }
    },
  },
};
</script>

<style scoped>
.home {
  cursor: pointer;
}
.home:hover {
  color: blue;
}
</style>