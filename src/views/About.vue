<template>
  <div class="about">
    <h1>{{title}}</h1>
    <v-btn color="primary" @click="test">test</v-btn>
  </div>
</template>

<script>
import TestService from '@/services/TestService'

export default{
  data(){
    return {
      title: process.env.VUE_APP_TITLE
    }
  },
  methods: {
    async test(){
      try {
      const response = await TestService.test()
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  }
}
</script>