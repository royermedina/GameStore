// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Productos from '../views/Productos.vue';
import Consolas from '@/views/consolas.vue';
import Videojuegos from '@/views/videojuegos.vue';
import Accesorios from '@/views/accesorios.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/productos',
    name: 'Productos',
    component: Productos
  },
  {
    path: '/consolas',
    name: 'Consolas',
    component: Consolas
  },
  {
    path: '/videojuegos',
    name: 'Videojuegos',
    component: Videojuegos
  },
  {
    path: '/accesorios',
    name: 'Accesorios',
    component: Accesorios
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
