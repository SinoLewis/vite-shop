import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import { useShopStore } from "@/stores/shop";
import { createPinia, storeToRefs } from "pinia";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Home',
        // transition: 'transition-opacity ease-out'
      },
    },
    {
      path: '/dashboard',
      name: 'user',
      component: () => import('@/views/User.vue'),
    },
    {
      path: '/category',
      name: 'categories',
      component: () => import('@/views/Categories.vue'),
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('@/views/Product.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/views/Checkout.vue'),
    },
    {
      path: '/testin',
      name: 'testin',
      component: () => import('@/views/Testin.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404', component: () => import('@/views/404.vue'),
    },
  ],
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { top: 0 }
  //   }
  //   },
})
// router.afterEach((to, from) => {
//   const toDepth = to.path.split('/').length
//   const fromDepth = from.path.split('/').length
//   to.meta.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
// })

export default router
