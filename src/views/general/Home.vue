<template>
  <div class="home">
    <!-- <h1>
      <img src="../../assets/kaki.png" class="logo" />
      KAKI
    </h1> -->
    <h1>
      OSHW APP
    </h1>
    <h2>open source hardware application</h2>
    <br />
    <ul>
      What can you do?
      <br />
      <br />
      <li>
        Search
        <v-btn :to="{name: 'products'}" class="grey" title="search">
          <v-icon>search</v-icon>
        </v-btn> and visualize open source hardware products.
      </li>
      <br />
      <li>Register, upload a BOM, assemble, manage and share your project.</li>
      <br />
      <li>
        Watch the video tutorial
        <v-btn class="grey" :to="{ name: 'videotutorial'}" title="watch video">
          <v-icon>video_settings</v-icon>
        </v-btn> or go to the help page
        <v-btn class="grey" :to="{name: 'help'}" title="help">
          <v-icon>help</v-icon>
        </v-btn>.
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
h1 {
  text-align: center;
}
h2 {
  text-align: center;
}
.logo {
  width: 5%;
}
.home {
  font-family: monospace;
}
</style>
