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
      meta: { title: 'Home' },
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('@/views/Products.vue')
    },
    {
      path: '/products/:id',
      name: 'product',
      component: () => import('@/views/Product.vue')
    },
    // checkout
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/views/checkout/Index.vue')
    },
    {
      path: '/checkout/cart',
      name: 'cart',
      component: () => import('@/views/checkout/Cart.vue')
    },
    {
      path: '/checkout/delivery',
      name: 'delivery',
      component: () => import('@/views/checkout/Delivery.vue')
    },
    {
      path: '/checkout/payment',
      name: 'payment',
      component: () => import('@/views/checkout/Payment.vue')
    },
    {
      path: '/checkout/order',
      name: 'order',
      component: () => import('@/views/checkout/Order.vue')
    },
    // login
    ,
    {
      path: '/login/signup',
      name: 'signup',
      component: () => import('@/views/login/Signup.vue')
    },
    {
      path: '/login/signin',
      name: 'signin',
      component: () => import('@/views/login/Signin.vue')
    },
    {
      path: '/testin',
      name: 'testin',
      component: () => import('@/views/Testin.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue')
    },
    { path: '/:pathMatch(.*)*', name: '404', component: () => import('@/views/404.vue') },
  ]
})
const pinia = createPinia()
const { user } = storeToRefs(useShopStore(pinia))
router.beforeEach(async (to, from) => {
  if (
    // TODO: obtain session id from user
    user !== null &&
    // ❗️ Avoid an infinite redirect
    (to.name === 'delivery' || to.name === 'payment' || to.name === 'order')
  ) {
    // TODO: push notification alert for no user login
    console.log('Auth guard executed')
    return { name: 'signin' }
  }
})

export default router
