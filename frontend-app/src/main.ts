import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Select2 from 'vue3-select2-component';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

const app = createApp(App);
app.use(store).use(router).mount('#app');
app.component('Select2', Select2)
