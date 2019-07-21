import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'

import 'buefy/dist/buefy.css'

Vue.use(Buefy);
Vue.use(require('vue-resource'));

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
