<template>
    <div v-for="product in products" :key="product.id"
        class="w-72 card card-compact glass bg-base-100 shadow-xl transition ease-in-out hover:scale-105 duration-500">
        <router-link :to="'/product/' + product.title">
            <figure><img src="@/assets/dummy/thumbnail-4.jpg" class="w-full h-48 object-cover object-center"
                    :alt="product.title" />
            </figure>
        </router-link>
        <div class="card-body">
            <h2 class="card-title">{{ product.title }}</h2>
            <p>{{ product.description }}</p>
            <div class="flex gap-1">
                <div class="badge badge-lg badge-info font-bold">Ksh {{ product.price }}
                </div>
                <!-- <div class="badge badge-lg badge-accent font-bold">Stock: {{ product.quantity }}</div> -->
                <div class="badge badge-lg badge-accent font-bold">Cart: {{ 8 }}</div>
            </div>
            <div class="card-actions justify-end">
                <button class="btn btn-sm btn-outline btn-accent">
                    <HeartIcon class="h-5 w-5" />
                </button>
                <button v-if="!inCart(product)" @click="addCartProduct(product)"
                    class="btn btn-sm btn-outline btn-info">
                    <ShoppingCartIcon class="h-5 w-5" />
                </button>
                <div v-else class="grid grid-cols-3 gap-1">
                    <button @click="addCartProduct(product)" class="btn btn-xs btn-accent">
                        <PlusIcon class="h-5 w-5" />
                    </button>
                    <button @click="removeCartProduct(product)" class="btn btn-xs btn-error">
                        <MinusIcon class="h-5 w-5" />
                    </button>
                    <button @click="removeCartProducts(product)" class="btn btn-sm btn-error">
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

const { inCart, addCartProduct, removeCartProduct, removeCartProducts } = useShopStore();

defineProps<{
    products: Product[],
}>()
</script>