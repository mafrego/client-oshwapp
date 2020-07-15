<template>
  <v-layout column>
    <v-flex xs6>
      <product-search-panel/>
      <products-panel class="mt-2"/>
    </v-flex>
  </v-layout>
</template>

<script>
import ProductsPanel from './ProductsPanel'
import ProductService from "@/services/ProductService";
import ProductSearchPanel from './ProductSearchPanel'

export default {
  components: {
    ProductsPanel,
    ProductSearchPanel
  },
  data() {
    return {
      products: null,
    };
  },
  methods:{},
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