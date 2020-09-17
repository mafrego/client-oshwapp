<template>
  <v-container fluid>
    <v-btn @click="toggle">users</v-btn>
    <div v-if="isOpen">
      <div v-for="user in users" :key="user.uuid">
        {{user.username}}: {{user.uuid}}
        <v-btn :to="{name: 'adminuser', params: { userId: user.uuid}}" color="blue">show</v-btn>
        <v-btn @click="delUser(user.uuid)" color="red">delete</v-btn>
      </div>
    </div>
    <!-- <div v-for="user in users" :key="user.uuid">{{user}}</div> -->
  </v-container>
</template>

<script>
import AdminService from "@/services/AdminService.js";

export default {
  name: "AdminBoardUsers",
  data() {
    return {
      users: [],
      isOpen: false,
    };
  },
  methods: {
    toggle: function () {
      this.isOpen = !this.isOpen;
    },
    async delUser(userID) {
      const ret = await AdminService.deleteUser(userID);
      if (ret.status === 200) {
        this.users = (await AdminService.getAllUsers()).data;
      }
    },
  },
  async created() {
    try {
      this.users = (await AdminService.getAllUsers()).data;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
</style>