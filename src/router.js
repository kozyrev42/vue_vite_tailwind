import { createRouter, createWebHistory } from 'vue-router';

import HomeComponent from './components/HomeComponent.vue';
import FruitsComponent from './components/FruitsComponent.vue';

// роуты
const routes = [
    { path: '/', component: HomeComponent, name: 'home' },
    { path: '/fruits', component: FruitsComponent, name: 'fruits' },
    { path: '/user/login', component: () => import('@/components/User/UserLogin.vue'), name: 'user.login' },
    { path: '/user/registration', component: () => import('@/components/User/UserRegistration.vue'), name: 'user.registration' },
];

// создание экземпляра маршрутизатора и передача опций `routes`
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// используем router.beforeEach() для перенаправления на страницу логина, если пользователь не авторизован
router.beforeEach((to, from, next) => {

    const accessToken = localStorage.getItem('social_access_token');

    // Если роут НЕ является 'user.login' И 'user.registration' И у пользователя нет токена, то перенаправляем на страницу логина
    if ((to.name !== 'user.login' && to.name !== 'user.registration') && !accessToken) {
        next({ name: 'user.login' });
    }

    // если роут user.login и есть токен, то перенаправляем на главную страницу
    if (to.name === 'user.login' && accessToken) {
        next({ name: 'home' });
    }

    // если роут user.registration и есть токен, то перенаправляем на главную страницу
    if (to.name === 'user.registration' && accessToken) {
        next({ name: 'home' });
    }

    // если пользователь захочет перейти на несуществующий роут, то перенаправляем на главную страницу
    if (!to.matched.length) {
        next({ name: 'home' });
    }

    next();
});

export default router;