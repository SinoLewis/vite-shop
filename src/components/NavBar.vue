<template>
  <div class="py-4 navbar">
    <div class="navbar-start">
      <router-link to="/">
        <FireIcon class="h-8 w-8" />
      </router-link>
    </div>
    <div class="flex gap-4 navbar-center">
      <!-- <Search /> -->
      <router-link to="/category">
        <GiftIcon class="h-8 w-8 btn btn-ghost btn-circle" />
      </router-link>
      <MagnifyingGlassCircleIcon class="h-8 w-8 btn btn-ghost btn-circle" />
    </div>
    <div class="flex gap-1 navbar-end">
      <router-link to="/checkout">
        <div
          class="w-16 flex justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <div class="indicator">
            <img src="../assets/svg/cart.svg" class="h-6 w-6 text-violet-400" aria-hidden="true" />
            <span class="badge badge-xs badge-primary indicator-item">8</span>
          </div>
        </div>
      </router-link>

      <Notifications />

      <div>
        <router-link v-if="authUser" to="/dashboard">
          <div class="avatar online">
            <div class="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="@/assets/girl.jpg" />
            </div>
          </div>
        </router-link>
        <div v-else>
          <label id="loginModal" for="my-modal-2" class="btn modal-button">
            <UserIcon class="h-8 w-8" />
          </label>
          <input type="checkbox" id="my-modal-2" class="modal-toggle" />
          <div class="modal">
            <div class="grid place-content-center modal-box w-10/12 md:w-8/12 lg:w-5/12 h-5/6 max-w-5xl opacity-100">
              <label for="my-modal-2" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
              <h3 class="text-lg font-bold">Login in 💻</h3>
              <div class="divider"></div>
              <Auth />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { FireIcon, UserIcon, MagnifyingGlassCircleIcon, GiftIcon } from '@heroicons/vue/20/solid'
import Auth from "@/components/login/Auth.vue";
import Search from "@/components/Search.vue";
import Notifications from "@/components/Notifications.vue";
import { storeToRefs } from "pinia";
import { useShopStore } from "@/stores/shop";

const router = useRouter()
const shop = useShopStore()
const { authUser } = storeToRefs(shop)

</script>