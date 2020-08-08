<template>
  <v-layout column>
    <v-flex xs6>
      <product-index-search-panel/>
      <product-index-display-panel class="mt-2"/>
    </v-flex>
  </v-layout>
</template>

<script>
import ProductIndexDisplayPanel from './ProductIndexDisplayPanel'
import ProductIndexSearchPanel from './ProductIndexSearchPanel'
import ProductService from "@/services/ProductService"

export default {
  name: "ProductIndex",
  components: {
    ProductIndexDisplayPanel,
    ProductIndexSearchPanel
  },
  data() {
    return {
      products: null,
    };
  },
  async mounted() {
    //do a request to the backend for all products
    this.products = (await ProductService.index()).data;
  }
};
</script>

<style scoped>
.atom-name{
  font-size: 30px;
  }
.atom-description{
  font-size: 18px;
}
.atom-material{
  font-size: 24px;
}
</style>