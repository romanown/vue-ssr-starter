import Vue from 'vue';
import App from '../../src/app.vue';

const root = new Vue({ render: h => h(App) });

root.$mount(document.body.querySelector('[server-rendered]'));