import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import InstantSearch from 'vue-instantsearch';
import App from './App.vue'
import router from './router'

import './style.css'

const app = createApp(App)

// app.use(InstantSearch)
app.use(createPinia())
app.use(router)

app.mount('#app')

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('service worker registered', reg))
        .catch(err => console.log('service worker not registered', err));
}