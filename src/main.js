import './assets/main.sass';

import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
app.config.devtools = true;

createApp(App).mount('#app');
