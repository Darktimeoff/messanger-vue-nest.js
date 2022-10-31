import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/styles/index.scss';
import { store } from './store';
import '@/assets/icons_flat/icons.css';
import { VueQueryPlugin, VueQueryPluginOptions } from "vue-query";
import { notification } from 'ant-design-vue';

export const app = createApp(App)

const vueQueryPluginOptions: VueQueryPluginOptions = {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    },
};

app.use(router)
app.use(store)
app.use(VueQueryPlugin, vueQueryPluginOptions)

app.mount('#app')


notification.config({
  placement: 'topRight',
  duration: 3,
})