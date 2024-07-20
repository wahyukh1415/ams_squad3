import '@fontsource/nunito-sans/200.css';
import '@fontsource/nunito-sans/200-italic.css';
import '@fontsource/nunito-sans/300.css';
import '@fontsource/nunito-sans/300-italic.css';
import '@fontsource/nunito-sans/400.css';
import '@fontsource/nunito-sans/400-italic.css';
import '@fontsource/nunito-sans/500.css';
import '@fontsource/nunito-sans/500-italic.css';
import '@fontsource/nunito-sans/600.css';
import '@fontsource/nunito-sans/600-italic.css';
import '@fontsource/nunito-sans/700.css';
import '@fontsource/nunito-sans/700-italic.css';
import '@fontsource/nunito-sans/800.css';
import '@fontsource/nunito-sans/800-italic.css';
import '@fontsource/nunito-sans/900.css';
import '@fontsource/nunito-sans/900-italic.css';

import './assets/main.css'
import './assets/main.scss'
import 'bootstrap-icons/font/bootstrap-icons.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
