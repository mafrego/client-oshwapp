<template>
  <div>
    <!-- <ul>
      <li v-for="(value, name) in atom" :key="name">
        {{name}}: {{value}} -->
        <ul>
          <!-- <li>name: {{atom.name}}</li> -->
          <!-- <li>uuid: {{atom.uuid}}</li> -->
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
        </ul>
      <!-- </li>
    </ul> -->
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