<template>
  <div>
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="border-4 border-secondary-focus rounded-lg">
          <img src="@/assets/girl.jpg" class="w-72 h-full p-4 object-cover object-center rounded-lg shadow-2xl" />
        </div>
        <div class="grid grid-rows-3 gap-y-8 text-center">
          <div>
            <span
              class="box-decoration-slice bg-gradient-to-r from-accent-focus to-info text-white px-2 text-6xl uppercase shadow-2xl">
              Welcome
            </span>
          </div>
          <div>
            <p class="text-2xl">From Drippy
              <span class="text-accent-focus uppercase animate-pulse">Hoodies</span> to Colorful
              <span class="text-info uppercase animate-pulse">Dashiki</span>.
              <br /> We Deliver
            </p>
          </div>
          <div>
            <p class="text-3xl animate-bounce">🤝</p>
          </div>
        </div>
      </div>
    </div>
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content flex-col lg:flex-row">
        <div class="border-4 border-secondary-focus rounded-lg">
          <img src="@/assets/girl.jpg" class="w-72 h-full p-4 object-cover object-center rounded-lg shadow-2xl" />
        </div>
        <div class="grid grid-rows-4 gap-y-8 text-center">
          <h1 class="text-5xl font-bold uppercase">Dashiki Drip 🧕</h1>
          <p class="">Keepin Straight Up with best Dashiki prints you ever wear.</p>
          <p class="animate-bounce">No Jokes!</p>
          <button class="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content">
        <div class="grid grid-rows-4 gap-y-8 text-center">
          <h1 class="text-5xl font-bold uppercase">For da Kidz 🐵</h1>
          <p class="">Family drip for everyone, even your precious yungins.</p>
          <p class="animate-bounce">For da Muchasos 😹</p>
          <button class="btn btn-primary">Browse</button>
        </div>
      </div>
    </div>
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="grid grid-rows-3 gap-y-8 lg:text-left">
          <h1 class="text-5xl font-bold uppercase">Login now!</h1>
          <p class="">Join us now, To start shoping for your favourite Drip set.</p>
          <p class="animate-bounce">Drip mode, on 😎</p>
        </div>
        <Auth />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Auth from "@/components/login/Auth.vue";
const categories = ['Hoodies', 'Mens', 'Ladies', 'Kids', 'Jewellery', 'Shoals']

</script>