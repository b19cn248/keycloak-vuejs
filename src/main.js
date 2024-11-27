import './assets/main.css'

import {createApp} from 'vue';
import App from './App.vue';
import keycloak from './keycloak';

keycloak
    .init({onLoad: 'login-required', checkLoginIframe: false}) // Bắt buộc phải login trước
    .then(() => {
        const app = createApp(App);
        app.provide('keycloak', keycloak); // Truyền keycloak vào toàn bộ ứng dụng
        app.mount('#app');
    })
    .catch((err) => {
        console.error('Failed to initialize Keycloak', err);
    });
