import Vue from 'vue';

// modules
import Vuex from 'vuex';
import VueRouter from 'vue-router';

// main layout
import App from './App.vue';

// routes
import MainRoute from './routes/main';
import CreateRoute from './routes/create';
import ViewRoute from './routes/view';
import DeleteRoute from './routes/delete-todo';
import NotFoundRoute from './routes/not-found';

// controllers
import Todos from './controllers/todos';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueRouter);

const store = new Vuex.Store({
  state: {
    Todos: Todos
  }
});

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainRoute
    },
    {
      path: '/create',
      name: 'create-todo',
      component: CreateRoute
    },
    {
      path: '/view/:id',
      name: 'view-todo',
      component: ViewRoute
    },
    {
      path: '/delete/:id',
      name: 'delete-view',
      component: DeleteRoute
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFoundRoute
    }
  ]
});

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app');