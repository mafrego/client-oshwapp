<template>
  <div class="about">
    <h1>mode: {{mode}}</h1>
    <v-btn color="primary" @click="test">test</v-btn>
    <p>{{this.response}}</p>
  </div>
</template>

<script>
import TestService from '@/services/TestService'

export default{
  data(){
    return {
      mode: process.env.NODE_ENV,
      title: process.env.VUE_APP_TITLE,
      response: "ciao"
    }
  },
  methods: {
    async test(){
      try {
      const response = await TestService.test()
      this.response = response.data.msg
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  }
}
</script>