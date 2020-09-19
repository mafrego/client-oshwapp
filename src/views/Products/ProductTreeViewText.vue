<template>
  <div class="font">
    <div @click="nodeClicked" :style="{'margin-left': `${depth * indent}px`}" class="node">
      <span class="product-name">{{node.name}}</span>
      <!-- <a v-if="node.vendorUrl" :href="node.vendorUrl" target="_blank">vendor</a>
      <a v-if="node.link" :href="node.link" target="_blank">link</a>-->
      <img
        class="product-image ml-5"
        :src="node.imageUrl"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        @click="fix(node.uuid)"
      />
      <!-- TODO make something similar in AtomsPanel.vue to fix card if cliked -->
      <v-card
        v-if="hover || fixed === node.uuid"
        width="40%"
        outlined
        raised
        dark
        elevation-24
        class="card"
      >
        <v-card-title>
          {{node.name}}
          <v-spacer></v-spacer>
          <v-btn icon class="grey" x-small @click="fix(null)" title="close">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <ul>
          <li>
            <span class="product-details">{{node.description}}</span>
          </li>
          <li v-if="node.unitCost">
            <span class="product-details">{{node.unitCost}} {{node.currency}}</span>
          </li>
          <!-- ATTENTION!!!! access value of key with dot i.e. "assembled_from.quantity"
          using square brackets like so:  node['assembled_from.quantity']-->
          <li v-if="node['assembled_from.quantity']">
            <span
              v-if="node['assembled_from.quantity'] > 1"
              class="product-details"
            >{{node['assembled_from.quantity']}} items</span>
            <span v-else class="product-details">{{node['assembled_from.quantity']}} item</span>
          </li>
          <li v-if="node.instruction">{{node.instruction}}</li>
          <li v-if="node.vendorUrl">
            <a :href="node.vendorUrl" target="_blank">vendor</a>
          </li>
          <li v-if="node.link">
            <a :href="node.link" target="_blank">link</a>
          </li>
          <li>{{path}}</li>
        </ul>
      </v-card>
    </div>
    <div v-if="expanded">
      <product-tree-view-text
        v-for="child in node.assembled_from"
        :key="child.uuid"
        :node="child"
        :depth="depth + 1"
        :path="path + '/' +child.name"
        :indent="indent"
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
    path: String,
    indent: Number,
  },
  data() {
    return {
      expanded: false,
      hover: false,
      fixed: null,
    };
  },
  methods: {
    nodeClicked() {
      this.expanded = !this.expanded;
      if (!this.hasChildren) {
        this.$emit("on-click", this.node);
      }
    },
    fix(uuid) {
      this.fixed = uuid;
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
  width: 8%;
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
.actions {
  word-break: normal;
}
:any-link {
  text-decoration: none;
}
</style>