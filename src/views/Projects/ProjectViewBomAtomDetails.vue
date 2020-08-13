<template>
  <div>
    <ul>
      <li v-for="(value, name) in atom" :key="name">
        {{name}}: {{value}}
        <!-- <ul>
          <li>name: {{atom.name}}</li>
          <li>uuid: {{atom.uuid}}</li>
          <li>code: {{atom.code}}</li>
          <li>description: {{atom.description}}</li>
          <li>link: {{atom.link}}</li>
          <li>vendor URL:{{atom.vendorUrl}}</li>
          <li>minimum order quantity: {{atom.moq}}</li>
          <li>lead time: {{atom.leadTime}}</li>
          <li>notes: {{atom.notes}}</li>
          <li>quantity: {{atom.quantity}}</li>
          <li>quantity left to assemble: {{atom.quantity_to_assemble}}</li>
          <li>material: {{atom.material}}</li>
          <li>weight: {{atom.weight}}</li>
          <li>weight unit: {{atom.weightUnit}}</li>
          <li>cost per unit: {{atom.costUnit}}</li>
          <li>currency: {{atom.currency}}</li>
          <li>image URL: {{atom.imageUrl}}</li>
        </ul> -->
      </li>
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