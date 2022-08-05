import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue'
import router from './router'
import '@/styles/index.scss';
import { store } from './store';
// import '@/assets/icons_flat/rocketpot-icons.css';

export const app = createApp(App)

app.use(Antd)
app.use(router)
app.use(store)

app.mount('#app')
