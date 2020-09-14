<template>
  <div class="font">
    <div @click="nodeClicked" :style="{'margin-left': `${depth * 20}px`}" class="node">
      <span class="product-name">{{node.name}} </span>
        <a v-if="node.vendorUrl" :href="node.vendorUrl" target="_blank">vendor </a>
        <a v-if="node.link" :href="node.link" target="_blank">link</a>
      <img
        class="product-image ml-5"
        :src="node.imageUrl"
        @mouseover="hover = true"
        @mouseleave="hover = false"
      />

      <v-card v-if="hover" width="40%" dark elevation-24 class="card">
          <ul>
            <li>
              <span class="product-details">{{node.description}}</span>
            </li>
            <li v-if="node.unitCost">
              <span class="product-details">{{node.unitCost}} {{node.currency}}</span>
            </li>
            <li>
              <!-- ATTENTION!!!! access value of key with dot i.e. "assembled_from.quantity"
              using square brackets like so:  node['assembled_from.quantity']-->
              <span class="product-details">{{node['assembled_from.quantity']}} items</span>
            </li>
            <li v-if="node.instruction">{{node.instruction}}</li>
          </ul>
      </v-card>
    </div>
    <div v-if="expanded">
      <product-tree-view-text
        v-for="child in node.assembled_from"
        :key="child.uuid"
        :node="child"
        :depth="depth + 1"
        @onClick="(node) => $emit('on-click', node)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductTreeViewText",
  props: {
    node: Object,
    depth: {
      type: Number,
      default: 0,
    },
    dummy: Boolean,
  },
  data() {
    return {
      expanded: false,
      hover: false,
    };
  },
  methods: {
    nodeClicked() {
      this.expanded = !this.expanded;
      if (!this.hasChildren) {
        this.$emit("on-click", this.node);
      }
    },
  },
};
</script>

<style scoped>
.font {
  font-family: monospace;
}
.node {
  text-align: left;
  font-size: 18px;
}
.type {
  margin-right: 10px;
}
.product-name {
  cursor: pointer;
}
.product-image {
  cursor: pointer;
  width: 5%;
  height: auto;
  /* center img */
  margin-left: auto;
  margin-right: auto;
  /* transition duration when mouseon */
  transition: 1.5s;
}
.card {
  position: fixed;
  right: 5%;
  top: 15%;
  font-size: 84%;
}
:any-link {
  text-decoration: none;
}
</style>