<template>
    <div class="grid justify-center">
        <TabsWrapper>
            <div>
                <Tab title="Cart">
                    <Cart />
                </Tab>
                <Tab title="Delivery">
                    <Delivery />
                </Tab>
                <Tab title="Payments">
                    <Payment />
                </Tab>
                <Tab title="Order">
                    <Order />
                </Tab>
            </div>
        </TabsWrapper>
    </div>
</template>
  
<script setup lang="ts">
import { HeartIcon, ShoppingCartIcon, TruckIcon, CurrencyDollarIcon, ComputerDesktopIcon } from '@heroicons/vue/20/solid'
import TabsWrapper from "@/components/layouts/TabsWrapper.vue";
import Tab from "@/components/layouts/Tab.vue";
import Cart from "@/components/checkout/Cart.vue";
import Delivery from "@/components/checkout/Delivery.vue";
import Payment from "@/components/checkout/Payment.vue";
import Order from "@/components/checkout/Order.vue";

</script>