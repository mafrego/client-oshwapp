<template>
  <v-layout column>
    <v-flex xs6>
      <panel title="all products" v-if="getAllProducts.length" class="font">
        <div v-for="product in getAllProducts" :key="product.uuid">
          <v-layout>
            <v-flex xs6>
              <div class="product-name">{{product.name}}</div>
              <!-- <div class="product-description">{{product.description}}</div> -->
              <!-- <div class="product-material">{{product.material}}</div> -->
              <v-btn
                class="cyan"
                :to="{
              name: 'product',
              params: {
                productId: product.uuid
              } 
              }"
              title="view"
              ><v-icon>pageview</v-icon></v-btn>
            </v-flex>

            <v-flex xs6>
              <img class="product-image" :src="product.imageUrl" :alt="product.name" />
            </v-flex>
          </v-layout>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  computed: {
    ...mapGetters(['getBom', 'getProject', 'getAllProducts'])
  },
  methods: {
    ...mapActions(['fetchAllProducts'])
  },
  created(){
    this.fetchAllProducts()
  },
}
</script>

<style scoped>
.font {
  font-family: monospace;
}
.product-name {
  font-size: 100%;
}
.product-description {
  font-size: 12px;
}
.product-material {
  font-size: 24px;
}
.product-image {
  width: 100px;
  height: 100px;
}
</style>