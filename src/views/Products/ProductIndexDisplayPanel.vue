<template>
  <v-layout column>
    <v-flex xs6>
      <panel title="Product">
        <!-- <v-btn
          v-if="$store.state.isUserLoggedIn"
          class="cyan ml-2"
          :to="{name: 'atoms-create'}"
          slot="action"
          title="create atom"
          light
        >
          <v-icon>add_circle</v-icon>
        </v-btn>
        <v-btn
          v-if="$store.state.isUserLoggedIn"
          class="cyan ml-2"
          :to="{name: 'assemblies-create'}"
          slot="action"
          title="create assembly"
          light
        >
          <v-icon>group_work</v-icon>
        </v-btn> -->
        <div v-for="product in products" :key="product.uuid">
          <v-layout>
            <v-flex xs6>
              <div class="product-name">{{product.name}}</div>
              <div class="product-description">{{product.description}}</div>
              <div class="product-material">{{product.material}}</div>

              <v-btn
                class="cyan"
                :to="{
              name: 'product',
              params: {
                productId: product.uuid
              } 
              }"
              >View</v-btn>

              <v-btn
                class="ml-2 cyan"
                :to="{
              name: 'tree',
              params: {
                productId: product.uuid
              } 
              }"
              >Tree</v-btn>

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
  font-size: 30
  }
.product-description {
  font-size: 18px;
}
.product-material {
  font-size: 24px;
}
.product-image{
  object-fit: contain;
}
</style>