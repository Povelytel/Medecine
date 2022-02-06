import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/components/pages/main/Home';
import Profile from '@/components/pages/main/Profile';
import UiComponent from '@/components/pages/main/UiComponent';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/ui-component',
    name: 'Ui-component',
    component: UiComponent,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
