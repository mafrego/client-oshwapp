<template>
<v-container>
  <div>
        <ul>
          <li >item #{{atom.itemNumber}}</li>
          <li v-if="atom.description" >{{atom.description}}</li>
          <li>m.o.q.: {{atom.moq}}</li>
          <li>quantity: {{atom.quantity}}</li>
          <li>quantity left to assemble: {{atom.quantity_to_assemble}}</li>
          <li>cost per unit: {{atom.unitCost}} {{atom.currency}}</li>
          <li>total cost: {{atom.totalCost}} {{atom.currency}}</li>
          <li v-if="atom.GTIN">GTIN: {{atom.GTIN}}</li>
          <li v-if="atom.SKU" >SKU: {{atom.SKU}}</li>
          <li v-if="atom.vendorUrl"><a :href="atom.vendorUrl" target="_blank" >vendor</a></li>
          <li v-if="atom.leadTime">lead time: {{atom.leadTime}}</li>
          <li v-if="atom.link" ><a :href="atom.link" target="_blank" >official page</a></li>
          <li v-if="atom.notes">notes: {{atom.notes}}</li>
          <!-- <li><a :href="atom.imageUrl" download target="_blank">download image</a></li> -->
        </ul>
  </div>
</v-container>
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
:any-link {
  text-decoration: none;
}
</style>