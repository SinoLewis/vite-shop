<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import { TransitionRoot } from '@headlessui/vue'
import { defineComponent, ref, toRaw, watchEffect } from 'vue'
import { useShopStore, initShop } from '@/stores/shop'
import { supabase } from "@/server/supabase";
import { storeToRefs } from 'pinia'
import router from './router'

const shop = useShopStore()
initShop()
// TODO: While loop to check if products is Empty to fetch data
while (toRaw(shop.products).length === 0) {
    setTimeout(()=>{
      console.warn('Products state Empty')
    }, 5000)
}

const { loading } = storeToRefs(shop)
let timeout: NodeJS.Timeout;

// TODO: Route loaders & Scroll Behaviour
// scrollBehavior(to, from, savedPosition) {
//   if (savedPosition) {
//     return savedPosition
//   } else {
//     return { top: 0 }
//   }
//   },
// router.afterEach((to, from) => {
//   const toDepth = to.path.split('/').length
//   const fromDepth = from.path.split('/').length
//   to.meta.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
// })

// router.afterEach((to, from) => {
//   // show for at least 400ms
//   loading.value = true
//   console.log('Before routing', loading.value)
//   clearTimeout(timeout);
//   setTimeout(() => {
//     loading.value = false
//     console.log('After routing', loading.value)
//   }, 4000)
// })

// const { getProducts } = shop
// console.log('App.vue', getProducts)

shop.$subscribe(
  async (mutation, state) => {
    mutation.type
    mutation.storeId
    state = state
    state.user = supabase.auth.user();
    // const { data: { user } } = await supabase.auth.getUser()
    // state.user = user
    await supabase.auth.onAuthStateChange((event: any, session: any) => {
      if (event == "SIGNED_OUT") {
        state.user = null;
      } else {
        state.user = session.user;
        console.log("User: ", state.user)
      }
    })

    // TODO: Offline Cart Items getters = localStorage.setItem('CartProducts')
    // TODO: Cart data read from above getter
    // await localStorage.setItem('Cart', JSON.stringify(state.cart))
    // await localStorage.setItem('ItemsQty', JSON.stringify(state.itemsQuantity))
    // console.log('Cart state change')
  },
  { detached: true }
)


</script>

<template>
  <div>
    <!-- <progress class="progress progress-secondary w-56" value="40" max="100"></progress> -->
    <NavBar />
    <router-view v-slot="{ Component, route }">
      <!-- Use any custom transition and fallback to `fade` -->
      <!-- <transition :name="route.meta.transition"  mode="out-in">
        <component :is="Component" />
      
      </transition> -->
      <!-- <transition name="transition-opacity ease-out" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition> -->
      <transition name="transition duration-1000 ease-in-out" mode="out-in">
        <div :key="route.name || undefined">
          <component :is="Component"></component>
        </div>
      </transition>

      <!-- <transition :name="route.meta.transitionName" mode="out-in">
        <component :is="Component" />
      </transition> -->
    </router-view>
    <div class="divider"></div>
    <!-- TODO: Footer stick to bottom -->
    <div class="relative">
      <!-- <Footer /> -->
    </div>
  </div>
</template>
