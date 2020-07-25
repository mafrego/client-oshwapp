<template>
  <div class="container">
    <p>
      <strong>username:</strong>
      {{currentUser.username}}
    </p>
    <p>
      <strong>email:</strong>
      {{currentUser.email}}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="(role,index) in currentUser.has_role" :key="index">{{role.node.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
    currentToken() {
      return this.$store.state.token;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  }
};
</script>
