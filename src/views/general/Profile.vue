<template>
  <div class="container">
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
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "Profile",
  computed: {
    ...mapState(["user"]),
    // currentUser() {
    //   return this.$store.state.user;
    // },
    // currentToken() {
    //   return this.$store.state.token;
    // }
  },
  mounted() {
    // if (!this.currentUser) {
    //   this.$router.push("/login");
    // }
    if (!this.user) {
      this.$router.push("/login");
    }
  }
};
</script>
