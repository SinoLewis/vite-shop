<template>
    <!-- TODO: Design Product page -->
    <p>{{ current_product.title }}</p>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useShopStore } from '@/stores/shop'
import type { Product } from "../types/product";
import { storeToRefs } from 'pinia';

const route = useRoute()
const shop = useShopStore()
const { currentProduct } = shop
const current_product: any = ref({})

// const product: any = ref()
const param: any = route.params.id

shop.$subscribe((_, state) => {
    current_product.value = currentProduct(param)
})
</script>