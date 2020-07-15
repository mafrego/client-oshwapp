<template>
  <div class="about">
    <h1>{{title}}</h1>
  </div>
</template>

<script>
export default{
  data(){
    return {
      title: process.env.VUE_APP_TITLE
    }
  }
}
</script>