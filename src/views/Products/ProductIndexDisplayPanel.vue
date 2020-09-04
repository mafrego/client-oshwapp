<template>
  <v-layout column>
    <v-flex xs6>
      <panel title="Product">
        <div v-for="product in products" :key="product.uuid">
          <v-layout>
            <v-flex xs6>
              <div class="product-name">{{product.name}}</div>
              <div class="product-description">{{product.description}}</div>
              <!-- TODO add version, link and author -->

              <v-btn
                class="ml-2 cyan"
                :to="{
              name: 'tree',
              params: {
                productId: product.uuid
              } 
              }"
              title="display tree structure"
              ><v-icon>account_tree</v-icon></v-btn>

            </v-flex>

            <v-flex xs6>
              <img class="product-image" :src="product.imageUrl" />
            </v-flex>
          </v-layout>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import productService from "@/services/ProductService";

export default {
  name: "ProductIndexDisplayPanel",
  data() {
    return {
      products: null
    };
  },
  watch: {
    "$route.query.search": {
      immediate: true,
      async handler(value) {
        this.products = (await productService.index(value)).data;
      }
    }
  }
};
</script>

<style scoped>
.product-name {
  font-size: 150%;
  }
.product-description {
  font-size: 100%;
}
.product-image{
  object-fit: contain;
}
</style>