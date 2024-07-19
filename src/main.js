import '@fontsource/nunito-sans'
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
