import Vue from 'vue'
import App from './App.vue'
import VueCryptojs from 'vue-cryptojs'

import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'

import './registerServiceWorker'
import { func } from './decode.js'









Vue.prototype.$func = func

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

Vue.use(VueCryptojs)


new Vue({
    router,
    render: h => h(App),
   
}).$mount('#app')