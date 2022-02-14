import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faQuestionCircle,faBars,faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faDiscord} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { BootstrapVue } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import './scss/app.scss'
library.add(faUserSecret, faTwitter, faDiscord, faQuestionCircle,faBars,faLightbulb )
import globalMixins from "@/mixins/globalMixins";
Vue.mixin(globalMixins)

import VueLogger from 'vuejs-logger';
Vue.use(VueLogger, {
  isEnabled: true, //
  logLevel: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: '|',
  showConsoleColors: true
});

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(Loading, {
  container: document.querySelector("[loading-container]"),
  color: '#ffffff',
  loader: 'dots',
  width: 100,
  height: 100,
  backgroundColor: '#ffffff',
  opacity: 0,
  zIndex: 99999,
  blur: '0',
});

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2, {
  confirmButtonColor: '#74c05a',
  denyButtonColor: '#7770a6',
  cancelButtonColor: '#ff7674',
});

// DayJs
import dayjs from "dayjs"; 
require('dayjs/locale/uk')
dayjs.locale('en')
dayjs.extend(require('dayjs/plugin/relativeTime'))
dayjs.extend(require('dayjs/plugin/utc'))
dayjs.extend(require('dayjs/plugin/timezone'))

Vue.prototype.$date = dayjs; // this.$date...
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false;
Vue.prototype.$eventBus = new Vue(); // Global event bus
Vue.use(BootstrapVue)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
