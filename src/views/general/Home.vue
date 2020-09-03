<template>
  <div class="home">
    <h1><img src="../../assets/kaki.png" class="logo">
    KAKI</h1>
    <h2>open source hardware web application</h2>
    <br />
    <p>What can you do?</p>
    <p>search
    <v-btn :to="{name: 'products'}" class="grey" title="search">
      <v-icon>search</v-icon>
    </v-btn>
       and visualize open source hardware products</p>
    <p>register, upload a BOM, assemble, manage and share your project</p>
    <p>
      watch the video tutorial
      <v-btn  class="grey" :to="{ name: 'videotutorial'}" title="watch video">
        <v-icon>video_settings</v-icon>
      </v-btn> or go to the help page
      <v-btn class="grey" :to="{name: 'help'}" title="help">
        <v-icon>help</v-icon>
      </v-btn>
    </p>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.logo {
  width: 5%;
}
.home {
  font-family: monospace;
}
</style>
