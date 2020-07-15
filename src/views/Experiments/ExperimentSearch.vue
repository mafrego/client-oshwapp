<!-- <template>
   <panel title="Search">
        <v-text-field
          v-model="search"
          label="Search by atom name or material"
        ></v-text-field>
   </panel> 
</template>-->

<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="6" sm="6">
          <v-text-field
            label="search guinea pig by name"
            v-model="search"
            filled
            shaped    
            >
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
// import GuineaPigService from '@/services/GuineaPigService'

export default {
    name: 'ExperimentSearch',
    data(){
        return{

        }
    }
    
}
</script>

<style scoped>

</style>