<template>

      <div class="white elevation-2 font">
        <v-toolbar flat dense rounded class="cyan">
          <v-toolbar-title>{{title}}</v-toolbar-title>
          <slot name="action" />
        </v-toolbar>

        <div class="pl-4 pr-4 pt-2 pb-2" >
            <slot>
            </slot>
            <!-- <slot name="view"></slot> -->
        </div>
      </div>

</template>

<script>
export default {
 props: [
     'title'
 ]   
}
</script>

<style>
.font {
  font-family: monospace;
}
</style>