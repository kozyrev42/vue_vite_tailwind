import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App);                             // Создание экземпляра приложения Vue

app.use(router);
app.mount('#app');