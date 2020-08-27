<template>
  <div>
        <ul>
          <li >item #{{atom.itemNumber}}</li>
          <li v-if="atom.description" >description: {{atom.description}}</li>
          <li>minimum order quantity: {{atom.moq}}</li>
          <li>quantity: {{atom.quantity}}</li>
          <li>cost per unit: {{atom.cost}} {{atom.currency}}</li>
          <li v-if="atom.GTIN">GTIN: {{atom.GTIN}}</li>
          <li v-if="atom.SKU" >SKU: {{atom.SKU}}</li>
          <li v-if="atom.vendorUrl"><a :href="atom.vendorUrl" target="_blank" >vendor</a></li>
          <li v-if="atom.leadTime">lead time: {{atom.leadTime}}</li>
          <li v-if="atom.link" ><a :href="atom.link" target="_blank" >official page</a></li>
          <li v-if="atom.notes">notes: {{atom.notes}}</li>
          <!-- <li><a :href="atom.imageUrl" download target="_blank">download image</a></li> -->
        </ul>
  </div>
</template>

<script>
export default {
  name: "ProjectViewBomAtomDetails",
  props: {
    atom: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
</style>