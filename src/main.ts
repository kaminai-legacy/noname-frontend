import './bootstrap';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import VueAxios from 'vue-axios';
import axios from '@/axios';
import '@/assets/css/app.css'
import App from './App.vue'
import FontAwesomeIcon from '@/components/font_awesome';
import router from '@/router';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
