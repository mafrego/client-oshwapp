<template>
  <div>
    <v-btn :to="{ name: 'adminboard'}" color="blue">admin board</v-btn>
    <ul>
      <li v-for="(value, name, index) in user" :key="index">{{name}}: {{value}}</li>
    </ul>
  </div>
</template>

<script>
import AdminService from "@/services/AdminService.js";

export default {
  name: "AdminUser",
  data() {
    return {
      user: {},
    };
  },
  async created() {
    try {
      this.user = (
        await AdminService.getUser(this.$store.state.route.params.userId)
      ).data;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
</style>