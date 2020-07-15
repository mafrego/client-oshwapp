<template>
<div>
  <div>
    <span v-show="showSpan">
      Parent Component
    </span>
    <Child v-if="showChild" />
  </div>
    <div>
      <Son v-for="id in [1, 2 ,3]" :key="id" />
    </div></div>
</template>

<script>
import Child from "./Child.vue"
import Son from "./Son.vue"

export default {
  name: "Parent",

  components: { Child, Son },

  data() {
    return {
      showSpan: false,
      showChild: false
    }
  }
}
</script>
