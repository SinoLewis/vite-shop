<template>
    <div class="grid grid-cols-4 gap-2">
        <div class="p-2 col-span-4 md:col-span-3">
            <div>
                <div class="border-4 border-base-300 rounded-lg bg-secondary-content">
                    <h2 class="p-4 text-3xl text-neutral-content">Cart ({{ cartQuantity }})</h2>
                </div>
            </div>
            <div>
                <div class="p-2 grid grid-rows-1 gap-4">
                    <div v-for="(value, key, index) in cartCheckout" :key="index">
                        <div class="card card-side glass bg-secondary-content  shadow-xl">
                            <figure><img class="h-full w-48 object-cover object-center"
                                    src="@/assets/dummy/thumbnail-1.jpg" alt="product" /></figure>
                            <div class="card-body">
                                <h2 class="card-title">{{ getProductById(value['id'])['title'] }}</h2>
                                <p>{{ getProductById(value['id'])['description'] }}</p>
                                <div class="flex gap-1">
                                    <div class="badge badge-lg badge-info font-bold">Ksh {{
                                            getProductById(value['id'])['price']
                                    }}
                                    </div>
                                    <!-- <div class="badge badge-lg badge-accent font-bold">Stock: {{ product.quantity }}</div> -->
                                    <div class="badge badge-lg badge-accent font-bold">Cart: {{ value['quantity'] }}
                                    </div>
                                </div>
                                <div class="card-actions justify-end">
                                    <button class="btn btn-sm btn-outline btn-accent">
                                        <HeartIcon class="h-5 w-5" />
                                    </button>
                                    <button v-if="!inCart(getProductById(value['id']))"
                                        @click="addCartProduct(getProductById(value['id']))"
                                        class="btn btn-sm btn-outline btn-info">
                                        <ShoppingCartIcon class="h-5 w-5" />
                                    </button>
                                    <div v-else class="grid grid-cols-3 gap-1">
                                        <button @click="addCartProduct(getProductById(value['id']))"
                                            class="btn btn-xs btn-accent">
                                            <PlusIcon class="h-5 w-5" />
                                        </button>
                                        <button @click="removeCartProduct(getProductById(value['id']))"
                                            class="btn btn-xs btn-error">
                                            <MinusIcon class="h-5 w-5" />
                                        </button>
                                        <button @click="removeCartProducts(getProductById(value['id']))"
                                            class="btn btn-sm btn-error">
                                            <TrashIcon class="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-2 col-span-4 md:col-span-1">
            <div class="card glass card-bordered text-neutral-content">
                <div class="bg-secondary-content">
                    <h2 class="p-4 text-3xl">Cart Summary</h2>
                </div>
                <div class="p-4">
                    <div class="flex justify-between">
                        <span class="text-secondary-content">Cart Total:</span><span>Ksh {{ cartTotal }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-secondary-content">Cart Quantity:</span><span>{{ cartQuantity }} Items</span>
                    </div>
                    <div class="py-4">
                        <div class="card-actions justify-between">
                            <button class="btn bg-secondary-content">Shopping</button>
                            <button class="btn bg-secondary-content">Delivery</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ShoppingCartIcon, HeartIcon, PlusIcon, MinusIcon, TrashIcon } from '@heroicons/vue/20/solid'
import { useShopStore } from '@/stores/shop'
import { storeToRefs } from 'pinia'

const shop = useShopStore()
const { getProductById } = shop
const { cartCheckout, cartQuantity, cartTotal } = storeToRefs(shop)
const { inCart, cartItems, addCartProduct, removeCartProduct, removeCartProducts } = shop;
</script>