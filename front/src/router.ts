import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
// @ts-ignore - Generated pages doesn't have type configured
import generatedRoutes from 'virtual:generated-pages'
import { useAuth } from './hooks';
import { UnAuthPages } from './const';

const routes = setupLayouts(generatedRoutes)
const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, __, next) => {
    const {isAuth} = useAuth();

    if(!isAuth.value && !UnAuthPages.includes(to.name as string)) {
        next({name: 'Login'})
    } else if(isAuth.value && UnAuthPages.includes(to.name as string)) {
        next({name: "Home"})
    } else next()
})

export default router
