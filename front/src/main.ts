import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/styles/index.scss';
import { store } from './store';
import '@/assets/icons_flat/icons.css';
import { VueQueryPlugin } from "vue-query";

export const app = createApp(App)

app.use(router)
app.use(store)
app.use(VueQueryPlugin)

app.mount('#app')
