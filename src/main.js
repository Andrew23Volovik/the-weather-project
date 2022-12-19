import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import mdiVue from 'mdi-vue/v2';
import * as mdijs from '@mdi/js';

Vue.use(mdiVue, {
  icons: mdijs,
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
