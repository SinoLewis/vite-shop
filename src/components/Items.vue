<template>
    <div class="grid grid-row-2 place-items-center">
        <h1 class="text-3xl uppercase py-4">categories</h1>
        <div class="w-full min-w-max max-w-md px-2 sm:px-0">
            <TabGroup>
                <TabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    <Tab v-for="(_, key, index) in categories" as="template" :key="index" v-slot="{ selected }">
                        <button :class="[
                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                            selected
                                ? 'bg-white shadow'
                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                        ]">
                            <!-- TODO: Improve Performance efficiency; if bad -->
                            <div class="flex gap-2 justify-center items-center">
                                <ShieldCheckIcon class="w-8 h-8" v-if="key === 'Hoodies'" />
                                <RocketLaunchIcon class="w-8 h-8" v-if="key === 'Men\'s'" />
                                <FaceSmileIcon class="w-8 h-8" v-if="key === 'Lady\s'" />
                                <GifIcon class="w-8 h-8" v-if="key === 'Kid\'s'" />
                                <CogIcon class="w-8 h-8" v-if="key === 'Jewellery'" />
                                <ServerIcon class="w-8 h-8" v-if="key === 'Shoals'" />
                                <span>{{ key }}</span>
                            </div>
                        </button>
                    </Tab>
                </TabList>

                <TabPanels class="mt-2">
                    <TabPanel v-for="(value, key, index) in categories" :key="index" :class="[
                        'rounded-xl p-3',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    ]">
                        <div class="grid grid-row-2 gap-8 justify-items-center">
                            <div class="grid grid-cols-4 gap-4">
                                <!-- TODO: Pagination; Loop over range instead of products (LearnVue tut)-->
                                <ProductsCard :products=value />
                            </div>
                            <div class="btn-group">
                                <button class="btn btn-lg">1</button>
                                <button class="btn btn-lg btn-active">2</button>
                                <button class="btn btn-lg">3</button>
                                <button class="btn btn-lg">4</button>
                            </div>
                        </div>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { ShieldCheckIcon, RocketLaunchIcon, FaceSmileIcon, GifIcon, CogIcon, ServerIcon } from '@heroicons/vue/20/solid'
import ProductsCard from '@/components/ProductsCard.vue'

import { useShopStore } from '@/stores/shop';
import { storeToRefs } from 'pinia';

const { categories } = storeToRefs(useShopStore())

</script>