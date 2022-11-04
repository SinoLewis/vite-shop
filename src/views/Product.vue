<template>
    <div class="divider"></div>
    <div class="card lg:card-side h-80 p-4 bg-base-100 shadow-xl">
        <figure><img src="@/assets/dummy/thumbnail-4.jpg" class="w-full h-80 object-cover object-center"
                :alt="shop.current_product.title" /></figure>
        <div class="card-body">
            <h2 class="card-title">{{ shop.current_product.title }}</h2>
            <p>{{ shop.current_product.description }}</p>
            <div class="flex gap-1">
                <div class="badge badge-lg bg-secondary-focus font-bold">Ksh <span class="px-1 text-black">
                        {{ shop.current_product.price }}
                    </span>
                </div>
                <!-- <div class="badge badge-lg badge-accent font-bold">Stock: {{ product.quantity }}</div> -->
                <div class="badge badge-lg bg-accent-focus font-bold">In Cart <span class="px-1 text-black">
                        {{ cartItems(shop.current_product.id) }}
                    </span></div>
            </div>
            <div class="card-actions justify-end">
                <button class="btn btn-sm btn-outline btn-accent">
                    <HeartIcon class="h-5 w-5" />
                </button>
                <button v-if="!inCart(shop.current_product)" @click="addCartProduct(shop.current_product)"
                    class="btn btn-sm btn-outline btn-secondary">
                    <ShoppingCartIcon class="h-5 w-5" />
                </button>
                <div v-else class="grid grid-cols-3 gap-1">
                    <button @click="addCartProduct(shop.current_product)" class="btn btn-xs bg-secondary-focus">
                        <PlusIcon class="h-5 w-5" />
                    </button>
                    <button @click="removeCartProduct(shop.current_product)" class="btn btn-xs bg-accent-focus">
                        <MinusIcon class="h-5 w-5" />
                    </button>
                    <button @click="removeCartProducts(shop.current_product)" class="btn btn-sm bg-accent-focus">
                        <TrashIcon class="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useShopStore } from '@/stores/shop'
import type { Product } from "../types/product";
import { ShoppingCartIcon, HeartIcon, PlusIcon, MinusIcon, TrashIcon } from '@heroicons/vue/20/solid'

const route = useRoute()
const shop = useShopStore()
const { currentProduct, cartItems, inCart, addCartProduct, removeCartProduct, removeCartProducts } = shop

// const product: any = ref()
const param: any = route.params.id
onMounted(() => {
    shop.$patch((state) => {
        state.current_product = currentProduct(param)
    })
})
onUnmounted(() => {
    shop.$patch((state) => {
        state.current_product = {} as Product
    })
})
</script>