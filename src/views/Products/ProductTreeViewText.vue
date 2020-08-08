<template>
  <div>
    <div @click="nodeClicked" :style="{'margin-left': `${depth * 20}px`}" class="node">
      <span class="product-name">{{node.name}}</span>
       <img class="product-image ml-5" :src="node.imageUrl" />
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
      default: 0
    },
    dummy: Boolean
  },
  data() {
    return {
      expanded: false,
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
.node {
  text-align: left; 
  font-size: 18px;
}
.type {
  margin-right: 10px;
}
.product-name{
  font-family: monospace;
  cursor: pointer;
}
.product-image{
  cursor: pointer;
  width: 4%;
  height: auto;
  /* center img */
  margin-left: auto;
  margin-right: auto;
  /* transition duration when mouseon */
  transition: 1.5s;
}
</style>