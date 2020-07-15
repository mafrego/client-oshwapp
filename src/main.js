import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import {sync} from 'vuex-router-sync'
//vue looks for index.js in /store automatically
import store from '@/store'
import Panel from '@/components/globals/Panel'

Vue.config.productionTip = false

Vue.component('panel', Panel)
//ABYME: Now $appName is available on all Vue instances, even before creation using this.$appName
Vue.prototype.$appName = 'OSHW APP'

sync(store, router)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
