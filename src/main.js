import Vue from 'vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import App from './App.vue'
import Routes from './routes';
import { store } from './store/store';


Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
  mode: "history"
});

new Vue({
  store: store,
  el: '#app',
  render: h => h(App),
  router: router
});
