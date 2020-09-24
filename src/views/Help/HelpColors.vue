<template>
  <div class="font">
    <br>
    <h1>color-button and CRUD</h1>
    <v-btn class="green ml-2 mt-2">create</v-btn>
    <v-btn class="blue ml-2 mt-2">read</v-btn>
    <v-btn class="yellow ml-2 mt-2">update</v-btn>
    <v-btn class="red ml-2 mt-2">delete</v-btn>
    <v-btn class="grey ml-8 mt-2">service</v-btn>
    <br />
    <h2>examples</h2>
    <v-btn class="green ml-2 mt-2" title="create new resource">
      <v-icon>add</v-icon>
    </v-btn> create, upload file or add new resource
    <br />
    <v-btn class="blue  ml-2 mt-2" title="view resource">
      <v-icon>search</v-icon>
    </v-btn> read, list, search or view resource
    <br />
    <v-btn class="yellow ml-2 mt-2" title="update resource">
      <v-icon>update</v-icon>
    </v-btn> update or modify resource
    <br />
    <v-btn class="red ml-2 mt-2" title="delete resource">
      <v-icon>delete</v-icon>
    </v-btn> delete or dismantle resource
    <br />
    <v-btn class="grey ml-2 mt-2" title="validate resource">
      <v-icon>done</v-icon>
    </v-btn> do something except CRUD
    <br><br>
  </div>
</template>

<script>
export default {
  name: "HelpColors",
};
</script>

<style scoped>
.font {
  font-family: monospace;
}
</style>