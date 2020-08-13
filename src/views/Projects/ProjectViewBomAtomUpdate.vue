<template>
<div>
    {{atom.name}} {{atom.uuid}}
</div>
</template>

<script>
export default {
    name: "ProjectViewBomAtomDetails",
    props: {
        atom: {
            type: Object,
            required: true,
        }
    }
    
}
</script>

<style scoped>

</style>