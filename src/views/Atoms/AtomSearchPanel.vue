<template>
   <panel title="Search">
        <v-text-field
          v-model="search"
          label="Search by atom name"
        ></v-text-field>
   </panel> 
</template>

<script>
import _ from 'lodash'

export default {
   data(){
      return{
         search: ''
      }
   },
   watch: {
      search: _.debounce(async function () {
         const route = {
            name: 'atoms'
         }
         if(this.search !== ''){
            route.query = {
               search: this.search
            }
         }
         this.$router.push(route)
      }, 700),
      '$route.query.search': {
         immediate: true,
         handler(value){
            this.search = value
         }
      }
   }
}
</script>

<style scoped>

</style>