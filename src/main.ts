import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from './i18n'
import vue3GoogleLogin from 'vue3-google-login'

import './assets/main.css'
import router from './router'

createApp(App).use(router).use(i18n).use(vue3GoogleLogin, {
  clientId: '1063463680190-oi81jpdoivdq48t1orog7v2m4vd1hcsb.apps.googleusercontent.com'
}).mount('#app') 
