<template>
<!-- TODO use panel and add btns -->
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
  },
  mounted() {
    if (!this.user) {
      this.$router.push("/login");
    }
  }
};
</script>
