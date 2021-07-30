import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Games from '../views/Games';
import ShowGame from "../views/ShowGame";
import CreateGame from "../views/CreateGame";
import UpdateGame from "../views/UpdateGame";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/games',
    name: 'Games',
    component: Games
  },
  {
    path: '/create',
    name: 'CreateGame',
    component: CreateGame
  },
  {
    path: '/games/:id',
    name: 'ShowGame',
    component: ShowGame
  },
  {
    path: '/games/:id/edit',
    name: 'UpdateGame',
    component: UpdateGame
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
