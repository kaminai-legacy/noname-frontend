import './bootstrap'
import '@/assets/css/app.css'

import { createApp } from 'vue'
import VueAxios from 'vue-axios'

import axios from '@/axios'
import FontAwesomeIcon from '@/components/font_awesome'
import router from '@/router'
import store from '@/store'

import App from './App.vue'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.mount('#app')
