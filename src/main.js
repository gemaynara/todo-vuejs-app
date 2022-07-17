import { createApp } from 'vue'
import App from './App.vue'

import routes from './routes/routes';
import axios from "./axios";
import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'

window.toastr = require('toastr')


createApp(App).use(routes, VueToastr2, axios).mount('#app')
