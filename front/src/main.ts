import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/styles/index.scss';
// import '@/assets/icons_flat/rocketpot-icons.css';

export const app = createApp(App)


app.use(router)

// Mounting the app
app.mount('#app')
