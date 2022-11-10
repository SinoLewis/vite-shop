<template>
    <div class="grid grid-row-2 place-items-center">
        <h1 class="text-3xl uppercase py-4 text-accent animate-pulse">categories</h1>
        <div class="w-full min-w-max max-w-md px-2 sm:px-0">
            <TabGroup>
                <div class="grid grid-row-2 place-items-center">
                    <TabList class="object-cover object-center flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                        <Tab v-for="(_, key, index) in categories" as="template" :key="index" v-slot="{ selected }">
                            <button :class="[
                                'rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                selected
                                    ? 'bg-white shadow'
                                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                            ]">
                                <!-- TODO: Improve Performance efficiency; if bad -->
                                <div class="">
                                    <div class="" v-if="key === 'Hoodies'">
                                        <ShieldCheckIcon class="w-12 h-8" />
                                        <span>{{ key }}</span>
                                    </div>
                                    <div class="" v-if="key === 'Men\'s'">
                                        <RocketLaunchIcon class="w-12 h-8" />
                                        <span>{{ key }}</span>
                                    </div>
                                    <div class="" v-if="key === 'Lady\s'">
                                        <FaceSmileIcon class="w-12 h-8" />
                                        <span>{{ key }}</span>
                                    </div>
                                    <div class="" v-if="key === 'Kid\'s'">
                                        <GifIcon class="w-12 h-8" />
                                        <span>{{ key }}</span>
                                    </div>
                                    <div class="" v-if="key === 'Jewellery'">
                                        <CogIcon class="w-12 h-8" />
                                        <span>{{ key }}</span>
                                    </div>
                                    <div class="" v-if="key === 'Shoals'">
                                        <ServerIcon class="w-12 h-8" />
                                        <span>{{ key }}</span>
                                    </div>
                                    <!-- <span class="p-1.5">{{ key }}</span> -->
                                </div>
                                <!-- <div class="flex gap-2 justify-center items-center">
                                    <div class="grid justify-items-center" v-if="key === 'Hoodies'">
                                        <ShieldCheckIcon class="w-12 h-8" />
                                        <span class="p-1.5">{{ key }}</span>
                                    </div>
                                    <div class="grid justify-items-center" v-if="key === 'Men\'s'">
                                        <RocketLaunchIcon class="w-12 h-8" />
                                        <span class="p-1.5">{{ key }}</span>
                                    </div>
                                    <div class="grid justify-items-center" v-if="key === 'Lady\s'">
                                        <FaceSmileIcon class="w-12 h-8" />
                                        <span class="p-1.5">{{ key }}</span>
                                    </div>
                                    <div class="grid justify-items-center" v-if="key === 'Kid\'s'">
                                        <GifIcon class="w-12 h-8" />
                                        <span class="p-1.5">{{ key }}</span>
                                    </div>
                                    <div class="grid justify-items-center" v-if="key === 'Jewellery'">
                                        <CogIcon class="w-12 h-8" />
                                        <span class="p-1.5">{{ key }}</span>
                                    </div>
                                    <div class="grid justify-items-center" v-if="key === 'Shoals'">
                                        <ServerIcon class="w-12 h-8" />
                                        <span class="p-1.5">{{ key }}</span>
                                    </div>
                                </div> -->
                            </button>
                        </Tab>
                    </TabList>

                    <TabPanels class="mt-2">
                        <TabPanel v-for="category in Object.keys(categories)" :key="category" class="rounded-xl p-3">
                            <Suspense @resolve="susResolve" @fallback="susFallback" @pending="susPending">
                                <template #default>
                                    <ProductsCard :category=category />
                                </template>
                                <template #fallback>
                                    <ItemsLoader />
                                </template>
                            </Suspense>
                        </TabPanel>
                    </TabPanels>
                </div>
            </TabGroup>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { ShieldCheckIcon, RocketLaunchIcon, FaceSmileIcon, GifIcon, CogIcon, ServerIcon } from '@heroicons/vue/20/solid'
import ItemsLoader from "@/components/ItemsLoader.vue";
import ProductsCard from "@/components/ProductsCard.vue";
import { ref } from "vue";
import { useShopStore } from '@/stores/shop';
import { storeToRefs } from 'pinia';

const { categories } = storeToRefs(useShopStore())

// Suspense 3 Event hooks
function susPending() {
    // TODO: Start loading spinner
    console.log('pending exec')
}
function susFallback() {
    console.log('fallback exec')
}
function susResolve() {
    // TODO: Stop loading spinner
    console.log('resolve exec')
}
// TODO: onErrorCaptured callback
// TODO: Notification for Offline check
// const ProductsCard = defineAsyncComponent({
//     loader: () => import("@/components/ProductsCard.vue"),
//     // A component to use while the async component is loading
//     loadingComponent: ItemsLoader,
//     // Delay before showing the loading component. Default: 200ms.
//     delay: 0,

//     // A component to use if the load fails
//     errorComponent: () => import("@/components/ItemsError.vue"),
//     // The error component will be displayed if a timeout is
//     // provided and exceeded. Default: Infinity.
//     // timeout: 3000
//     // TODO: custom loader instead of suspense ; Suspensible false
// })
</script>