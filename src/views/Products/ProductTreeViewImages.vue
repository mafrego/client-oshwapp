<template>
<div>
    <div @click="nodeClicked" class="node">
      <span>
              <img :title="node.name" class="product-image" :src="node.imageUrl" />
      </span>
    </div>
        
    <div v-if="expanded" class="d-flex">
      <product-tree-view-images
        class="container"
        v-for="child in node.assembled_from"
        :key="child.uuid"
        :node="child"
        :depth="depth + 1"
        @onClick="(node) => $emit('onClick', node)"
      />
    </div>
    </div>
</template>

<script>
export default {
  name: "ProductTreeViewImages",
  props: {
    node: Object,
    depth: {
      type: Number,
      default: 0
    }
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
        this.$emit("onClick", this.node);
      }
    },
  },
};
</script>

<style scoped>
.node {
  text-align: left;
  font-size: 18px;
  width: 100%;
}
.type {
  margin-right: 10px;
}
.product-image{
  cursor: pointer;
  /* fix img size relate to screen size */
  display: block;
  width: 10%;
  height: auto;
  /* center img */
  margin-left: auto;
  margin-right: auto;
  /* transition duration when mouseon */
  transition: 1.5s;
}
.product-image:hover{
  -ms-transform: scale(1.5); /* IE 9 */
  -webkit-transform: scale(1.5); /* Safari 3-8 */
  transform: scale(1.5); 
}
.container{
  flex-direction: row;
  flex-wrap: nowrap;
}
</style>