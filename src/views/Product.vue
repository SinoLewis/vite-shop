<template>
    <div class="divider"></div>
    <div class="card lg:card-side h-80 p-4 bg-base-100 shadow-xl">
        <figure><img src="@/assets/dummy/thumbnail-4.jpg" class="w-full h-80 object-cover object-center"
                :alt="current_product.title" /></figure>
        <div class="card-body">
            <h2 class="card-title">{{ current_product.title }}</h2>
            <p>{{ current_product.description }}</p>
            <div class="flex gap-1">
                <div class="badge badge-lg badge-info font-bold">Ksh {{ current_product.price }}
                </div>
                <!-- <div class="badge badge-lg badge-accent font-bold">Stock: {{ product.quantity }}</div> -->
                <div class="badge badge-lg badge-accent font-bold">Cart: {{ 8 }}</div>
            </div>
            <div class="card-actions justify-end">
                <button class="btn btn-sm btn-outline btn-accent">
                    <HeartIcon class="h-5 w-5" />
                </button>
                <button v-if="!inCart(current_product)" @click="addCartProduct(current_product)"
                    class="btn btn-sm btn-outline btn-info">
                    <ShoppingCartIcon class="h-5 w-5" />
                </button>
                <div v-else class="grid grid-cols-3 gap-1">
                    <button @click="addCartProduct(current_product)" class="btn btn-xs btn-accent">
                        <PlusIcon class="h-5 w-5" />
                    </button>
                    <button @click="removeCartProduct(current_product)" class="btn btn-xs btn-error">
                        <MinusIcon class="h-5 w-5" />
                    </button>
                    <button @click="removeCartProducts(current_product)" class="btn btn-sm btn-error">
                        <TrashIcon class="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useShopStore } from '@/stores/shop'
import type { Product } from "../types/product";
import { storeToRefs } from 'pinia';
import { ShoppingCartIcon, HeartIcon, PlusIcon, MinusIcon, TrashIcon } from '@heroicons/vue/20/solid'

const route = useRoute()
const shop = useShopStore()
const { currentProduct, inCart, addCartProduct, removeCartProduct, removeCartProducts } = shop
const current_product: any = ref({})

// const product: any = ref()
const param: any = route.params.id

shop.$subscribe((_, state) => {
    current_product.value = currentProduct(param)
})
</script>