import Vue from 'vue'

import './components'
import './registerServiceWorker'

// Plugins
import vuetify from './plugins/vuetify'
import { sync } from 'vuex-router-sync'

// Application imports
import App from './App.vue'
import router from './router'
import store from './store'

// Init and sync store
sync(store, router)

Vue.config.productionTip = false

// Init app
new Vue({
  vuetify,
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')
