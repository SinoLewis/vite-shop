<template>
    <div class="grid place-content-evenly">
        <div class="w-full min-w-max px-2 sm:px-0">
            <TabGroup>
                <TabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    <Tab v-for="category in checkouts" as="template" :key="category" v-slot="{ selected }">
                        <button :class="[
                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                            selected
                                ? 'bg-white shadow'
                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                        ]">
                            <div class="flex gap-2 justify-center items-center">
                                <ShoppingCartIcon class="w-8 h-8" v-if="category === 'Cart'" />
                                <TruckIcon class="w-8 h-8" v-if="category === 'Delivery'" />
                                <CurrencyDollarIcon class="w-8 h-8" v-if="category === 'Payments'" />
                                <ComputerDesktopIcon class="w-8 h-8" v-if="category === 'Order'" />
                                <span class="p-2">{{ category }}</span>
                            </div>
                        </button>
                    </Tab>
                </TabList>

                <TabPanels class="mt-2">
                    <TabPanel v-for="category in checkouts" :key="category" :class="[
                        'rounded-xl bg-accent p-3',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    ]">
                        <div class="card lg:card-side bg-base-100 shadow-xl">
                            <div class="min-w-max"><P>Padaa</P></div>
                        </div>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { ShoppingCartIcon, TruckIcon, CurrencyDollarIcon, ComputerDesktopIcon } from '@heroicons/vue/20/solid'

const checkouts = ['Cart', 'Delivery', 'Payments', 'Order']
</script>
