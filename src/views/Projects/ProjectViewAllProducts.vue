<template>
  <v-layout column>
    <v-flex xs6>
      <panel title="all products" v-if="getAllProducts.length">
        <div v-for="product in getAllProducts" :key="product.uuid">
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
import {mapGetters, mapActions} from 'vuex'

export default {
  computed: {
    ...mapGetters(['getBom', 'getProject', 'getAllProducts'])
  },
  methods: {
    ...mapActions(['fetchBom', 'fetchAssemblableProducts', 'fetchAllProducts'])
  },
  created(){
    // this.fetchBom(this.getProject.uuid),
    this.fetchAllProducts(this.getProject.uuid)
  },
}
</script>

<style scoped>
.product-name {
  font-size: 30px;
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