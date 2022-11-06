<template>
    <div v-for="(product) in products" :key="product.id"
        class="w-72 card card-compact glass bg-secondary-content shadow-xl transition ease-in-out hover:scale-105 duration-500">
        <router-link :to="'/product/' + product.title">
            <figure><img src="@/assets/dummy/thumbnail-4.jpg" class="w-full h-48 object-cover object-center"
                    :alt="product.title" />
            </figure>
        </router-link>
        <div class="card-body">
            <h2 class="card-title">{{ product.title }}</h2>
            <p>{{ product.description }}</p>
            <div class="flex gap-1">
                <div class="badge badge-lg bg-secondary-focus font-bold">Ksh <span class="px-1 text-black">
                        {{ product.price }}
                    </span>
                </div>
                <!-- <div class="badge badge-lg badge-accent font-bold">Stock: {{ product.quantity }}</div> -->
                <div class="badge badge-lg bg-accent-focus font-bold">In Cart <span class="px-1 text-black">
                        {{ cartItems(product.id) }}
                    </span></div>
            </div>
            <div class="card-actions justify-end">
                <button class="btn btn-sm btn-outline btn-error">
                    <HeartIcon class="h-5 w-5" />
                </button>
                <button v-if="!inCart(product)" @click="addCartProduct(product)"
                    class="btn btn-sm btn-outline btn-secondary">
                    <ShoppingCartIcon class="h-5 w-5" />
                </button>
                <div v-else class="grid grid-cols-3 gap-1">
                    <button @click="addCartProduct(product)" class="btn btn-xs bg-secondary-focus">
                        <PlusIcon class="h-5 w-5" />
                    </button>
                    <button @click="removeCartProduct(product)" class="btn btn-xs bg-accent-focus">
                        <MinusIcon class="h-5 w-5" />
                    </button>
                    <button @click="removeCartProducts(product)" class="btn btn-sm bg-accent-focus">
                        <TrashIcon class="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ShoppingCartIcon, HeartIcon, PlusIcon, MinusIcon, TrashIcon } from '@heroicons/vue/20/solid'
import type { Product } from "@/types/product";
import { useShopStore } from '@/stores/shop';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const props = defineProps<{
    category: string,
}>()

const shop = useShopStore()
const { inCart, cartItems, addCartProduct, removeCartProduct, removeCartProducts } = shop;

const loadData = async (category: any) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const { categories } = storeToRefs(shop)
            if(categories.value[category].length !== 0){
                resolve(categories.value[category])
            }
        }, 500)
    })
}
const products: any = await loadData(props.category)

</script>