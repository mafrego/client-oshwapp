<template>

<v-app>

  <v-app-bar app>
    <page-header/>
  </v-app-bar>

  <v-content>
    <v-container fluid>
      <router-view>
      </router-view>
    </v-container>
  </v-content>

  <v-footer app>
  </v-footer>
</v-app>

</template>

<script>
// import HelloWorld from './components/HelloWorld';
import PageHeader from '@/components/PageHeader'

export default {
  name: 'App',

  components: {
    PageHeader,
  },

  data: () => ({
    //
  }),
};
</script>
