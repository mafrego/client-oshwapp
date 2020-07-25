<template>
  <div class="container">
    <header >
      <h3>{{content}}</h3>
    </header>
  </div>
</template>

<script>
import UserService from '@/services/UserService';

export default {
  name: 'Moderator',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getAssemblerBoard().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>
