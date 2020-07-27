<template>
  <v-toolbar fixed class="cyan" color="primary">
    <v-toolbar-items class="mt-10 mr-4">
      <router-link class="home" tag="span" :to="{name: 'home'}">Home</router-link>
    </v-toolbar-items>

    <v-toolbar-items class="mt-10 mr-4">
      <router-link class="home" tag="span" :to="{name: 'About'}">About</router-link>
    </v-toolbar-items>

    <v-toolbar-items class="mt-10 mr-4">
      <router-link class="home" tag="span" :to="{name: 'products'}">Browser</router-link>
    </v-toolbar-items>

    <v-toolbar-items
      v-if="isUserLoggedIn && currentRoles.includes('assembler')"
      class="mt-10 mr-4"
    >
      <router-link class="home" tag="span" :to="{name: 'assembler'}">Board Assembler</router-link>
    </v-toolbar-items>

    <v-toolbar-items
      v-if="isUserLoggedIn && currentRoles.includes('admin')"
      class="mt-10 mr-4"
    >
      <router-link class="home" tag="span" :to="{name: 'admin'}">Board Admin</router-link>
    </v-toolbar-items>

    <v-toolbar-items v-if="isUserLoggedIn" class="mt-10 mr-4">
      <router-link class="home" tag="span" :to="{name: 'profile'}">profile</router-link>
    </v-toolbar-items>

    <v-toolbar-items v-if="isUserLoggedIn" class="mt-10 mr-4">
      <router-link class="home" tag="span" :to="{name: 'projects'}">projects</router-link>
    </v-toolbar-items>

    <v-toolbar-items
      v-if="isUserLoggedIn && currentRoles.includes('admin')"
      class="mt-10 mr-4"
    >
      <router-link class="home" tag="span" :to="{name: 'experiments'}">experiments</router-link>
    </v-toolbar-items>

    <v-toolbar-items
      v-if="isUserLoggedIn && currentRoles.includes('admin')"
      class="mt-10 mr-4"
    >
      <router-link class="home" tag="span" :to="{name: 'todos'}">todos</router-link>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items
      v-if="isUserLoggedIn"
      class="mt-10 mr-4"
    >hi {{user.username}}!</v-toolbar-items>

    <v-toolbar-items>
      <v-btn v-if="!isUserLoggedIn" text dark :to="{name: 'login'}">Login</v-btn>
    </v-toolbar-items>

    <v-toolbar-items>
      <v-btn v-if="!isUserLoggedIn" text dark :to="{name:'register'}">Sign Up</v-btn>
    </v-toolbar-items>

    <v-toolbar-items>
      <v-btn v-if="isUserLoggedIn" text dark @click="logout">Log Out</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import {mapActions, mapState} from 'vuex' 

export default {
  methods: {
    ...mapActions(["setUser", "setToken"]),
    // ...mapActions('users',[
    //   'setUser',
    //   'setToken'
    // ]),
    logout() {
      this.setUser(null)
      this.setToken(null)
      // this.$store.dispatch("setToken", null);
      // this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "products"
      });
    }
  },
  computed: {
      ...mapState(["user", "token", "isUserLoggedIn"]),
      // ...mapState({
      //   currentUser: state => state.users.user,
      //   isUserLoggedIn: state => state.users.isUserLoggedIn
      //   }),

    // currentRoles() {
    //   // if-else to avoid Vue warn in case user is not logged in
    //   if (this.$store.state.user.has_role) {
    //     let roles = this.$store.state.user.has_role;
    //     return roles.map(el => el.node).map(el => el.name);
    //   } else {
    //     return [];
    //   }
    // },

    currentRoles() {
      // if-else to avoid Vue warn in case user is not logged in
      if (this.user.has_role) {
        let roles = this.user.has_role;
        return roles.map(el => el.node).map(el => el.name);
      } else {
        return [];
      }
    },
  }
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