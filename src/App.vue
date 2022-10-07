<script lang="ts">
import { RouterView } from 'vue-router'
import { defineComponent, onUpdated, onMounted } from 'vue'
import { useShopStore } from '@/stores/shop'
import { supabase } from "@/server/supabase";
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import { storeToRefs } from "pinia";

export default defineComponent({
  name: 'Default',
  components: { NavBar, Footer },
  setup() {
    const shop = useShopStore()
    const { user } = storeToRefs(shop)

    onMounted(() => {
      console.log('In layout')
      // var isAuthenticated = JSON.stringify(user.value) === '{}' ? false : true;
      // router.beforeEach((to, from) => {
      //   if (
      //     // make sure the user is authenticated
      //     !isAuthenticated && to.name === 'checkout'
      //   ) {
      //     // redirect the user to the login page
      //     return { name: 'login-signin' }
      //   }
      // })
      // user from Sessionstorage
      supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth state changed')
      })
      // Cart to Localstorage
      shop.$subscribe(
        async (mutation, state) => {
          mutation.type
          mutation.storeId

          await localStorage.setItem('Cart', JSON.stringify(state.cart))
          console.log('Cart state change')

          // TODO: async update supa DB /w cart, delivery, order, transaction states
        },
        { detached: true }
      )
    })
  },
})
</script>

<template>
  <div>
    <NavBar />
    <RouterView />
    <!-- TODO: Footer stick to bottom -->
    <Footer />
  </div>
</template>