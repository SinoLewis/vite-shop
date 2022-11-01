<template>
    <div class="grid justify-center">
        <ul class="steps">
            <li class="step step-info">
                <!-- TODO: Style button as of Headless UI -->
                <!-- TODO: Dynamic rendering -->
                <a href="#Cart" @click="selectedTitle = tabTitles[0]">
                    <div class="grid justify-items-center">
                        <img class="w-8 h-8" src="@/assets/svg/cart.svg" alt="">
                        <span>Cart</span>
                    </div>
                </a>
            </li>
            <li class="step step-info">
                <a href="#Delivery" @click="selectedTitle = tabTitles[1]">
                    <div class="grid justify-items-center">
                        <img class="w-8 h-8" src="@/assets/svg/rocket.svg" alt="">
                        <span>Delivery</span>
                    </div>
                </a>
            </li>
            <li class="step step-info">
                <a href="#Payments" @click="selectedTitle = tabTitles[2]">
                    <div class="grid justify-items-center">
                        <img class="w-8 h-8" src="@/assets/svg/magic.svg" alt="">
                        <span>Payments</span>
                    </div>
                </a>
            </li>
            <li class="step step-error">
                <a href="#Order" @click="selectedTitle = tabTitles[3]">
                    <div class="grid justify-items-center">
                        <img class="w-8 h-8" src="@/assets/svg/cog.svg" alt="">
                        <span>Order Status</span>
                    </div>
                </a>
            </li>
        </ul>
        <slot />
    </div>
</template>

<script lang="ts">
import { ref, provide } from 'vue'

export default ({
    setup(props, { slots }) {
        const tabTitles = ref(slots.default().map(tab => tab.props.title))
        const selectedTitle = ref(tabTitles.value[0])

        provide('selected', selectedTitle)
        return { tabTitles, selectedTitle }
    }
})
</script>