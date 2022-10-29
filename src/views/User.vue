<template>
    <!-- TODO Get user by session id -->
    <div v-if="authUser">
        <div class="divider"></div>
        <div class="grid grid-col-3 place-content-center">
            <div class="avatar online">
                <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src="@/assets/girl.jpg" />
                </div>
            </div>
            <h1 class="p-4 text-3xl">Njeri</h1>
            <button @click="shop.signOutAction" class="btn btn-outline btn-accent">SignOut</button>
            <div class="divider"></div>
        </div>
        <div class="grid gap-4 place-content-center">
            <div class="stats stats-vertical md:stats-horizontal shadow">
                <div class="stat bg-secondary-focus">
                    <div class="stat-title">Current Cart</div>
                    <div class="stat-value">8 items</div>
                    <div class="stat-desc">Jan 1st - Feb 1st</div>
                </div>
                <div class="stat bg-accent-focus">
                    <div class="stat-title">Order Status</div>
                    <div class="stat-value">
                        <span class="countdown font-mono text-2xl">
                            <span style="--value:10;"></span>:
                            <span style="--value:24;"></span>:
                            <span style="--value:56;"></span>
                        </span>
                    </div>
                    <div class="stat-desc">
                        <div class="badge badge-primary">Delivering</div>
                    </div>
                </div>
                <div class="stat bg-primary-focus">
                    <div class="stat-title">Order Total</div>
                    <div class="stat-value">Ksh 1,200</div>
                    <div class="stat-desc">Jan 1st - Feb 1st</div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="divider"></div>
        <NoAuth />
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useShopStore } from "@/stores/shop";
import NoAuth from "@/components/NoAuth.vue";
// import { onMounted, ref, watchEffect } from "@vue/runtime-core";

const shop = useShopStore()
const { authUser } = storeToRefs(shop)
</script>