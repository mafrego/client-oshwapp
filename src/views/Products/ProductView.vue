<template>
  <panel :title="productType">
    <v-toolbar-items slot="action">
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        class="cyan ml-2"
        :to="{name: 'atoms-create'}"
        title="create atom"
        light
      >
        <v-icon>add_circle</v-icon>
      </v-btn>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        class="cyan ml-2"
        :to="{name: 'assemblies-create'}"
        title="create assembly"
        light
      >
        <v-icon>group_work</v-icon>
      </v-btn>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        class="cyan ml-2"
        @click="del"
        title="delete product"
        light
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </v-toolbar-items>
    <v-row>
      <v-col md6>
        <div class="product-name">{{product.name}}</div>
        <div class="product-description">{{product.description}}</div>
        <div class="product-material">{{product.material}}</div>
        <div class="product-weigth">{{product.weight}} {{product.weightUnit}}</div>
      </v-col>
      <v-col md6>
        <img
          id="img"
          :title="product.name +'\n'+ product.description"
          class="product-image"
          :src="product.imageUrl"
        />
      </v-col>
    </v-row>
    <!-- <div v-if="productType==='Compound'"> -->
    <div v-if="productType==='Assembly'">
      <v-btn @click="isToggled = !isToggled">
        <span v-if="isToggled">hide parts</span>
        <span v-if="!isToggled">show parts</span>
      </v-btn>
      <div class="mt-5" v-if="isToggled">
        <div v-for="part in parts" :key="part.uuid">
          <v-layout>
            <v-flex xs6>
              <span class="part-name">{{part.name}}</span>
              <img class="part-image ml-5" :src="part.imageUrl" />
            </v-flex>
          </v-layout>
        </div>
      </div>
    </div>
  </panel>
</template>

<script>
import ProductService from "@/services/ProductService";

export default {
  data() {
    return {
      product: {},
      children: [],
      productType: null,
      parts: null,
      isToggled: false
    };
  },
  async mounted() {
    const productId = this.$store.state.route.params.productId;
    this.product = (await ProductService.show(productId)).data;
    this.productType = this.product._labels.find(ret => {
      // return ret == "Compound" || ret == "Atom";
      return ret == "Assembly" || ret == "Atom";
    });
    this.parts = this.product.assembled_from.map(rel => rel.node);
    console.log(this.product);
  },
  methods: {
    async del() {
      try {
        await ProductService.delete(this.product.uuid);
        this.$router.push({
          name: "products"
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.product-name {
  font-size: 30px;
}
.part-image{
  width: 10%;
  height: auto;
}
.product-description {
  font-size: 12px;
}
.product-material {
  font-size: 24px;
}
</style>