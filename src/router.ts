import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Result from './views/Result.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/teacher-say',
      name: 'home',
      component: Home,
    },
    {
      path: '/result',
      name: 'result',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Result
    },
  ],
});
