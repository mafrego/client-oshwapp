<template>
  <div>
    <div>
      <h1>Tree view</h1>
      <v-btn-toggle v-model="toggle_exclusive" rounded class="ml-2">
        <v-btn>
          <v-icon>account_tree</v-icon>
        </v-btn>
        <v-btn>
          <v-icon>device_hub</v-icon>
        </v-btn>
      </v-btn-toggle>
    </div>
    <div>
      <product-tree-view-images v-if="toggle_exclusive" :node="root" />
      <product-tree-view-text v-else :node="root" />
    </div>
  </div>
</template>

<script>
import ProductService from "@/services/ProductService";
import ProductTreeViewImages from "./ProductTreeViewImages";
import ProductTreeViewText from "./ProductTreeViewText";

export default {
  name: "ProductTreeView",
  components: {
    ProductTreeViewImages,
    ProductTreeViewText
  },

  data() {
    return {
      root: {},       //not null otherwise vue error!
      toggle_exclusive: 0
    };
  },
  async created() {
    const productId = this.$store.state.route.params.productId;
    this.root = (await ProductService.getTree(productId)).data;

    //!!!!!DO NOT DELETE the following code, it could be useful later
    // this.node = (await ProductService.show(productId)).data;
    // this.node.type = this.node._labels.find(ret => {
    //   return ret == "Compound" || ret == "Atom";
    // });
  },
  methods: {}
};
</script>

<style scoped>
h1{
  display: inline;
}
</style>