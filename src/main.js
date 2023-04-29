import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App).use(router).use(VueAxios, axios)

fetch(process.env.BASE_URL + "config.json")
  .then((response) => response.json())
  .then((config) => {
    app.config.globalProperties.$config = config
    app.mount("#app")
  })
