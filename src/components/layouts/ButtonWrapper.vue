<template>
    <div>
        <ul class="steps">
            <li class="step step-info">
                <button class="btn btn-outline btn-secondary" @click="selectedTitle = tabTitles[0]">
                    <div class="grid justify-items-center">
                        <img class="w-8 h-8" src="@/assets/svg/cart.svg" alt="">
                        <span>{{ tabTitles[0] }}</span>
                    </div>
                </button>
            </li>
            <li class="step step-info">
                <button class="btn btn-outline btn-secondary" @click="selectedTitle = tabTitles[1]">
                    <div class="grid justify-items-center">
                        <img class="w-8 h-8" src="@/assets/svg/rocket.svg" alt="">
                        <span>Delivery</span>
                    </div>
                </button>
            </li>
            <li class="step step-info">
                <button class="btn btn-outline btn-secondary" @click="selectedTitle = tabTitles[2]">
                    <div class="grid justify-items-center">
                        <img class="w-8 h-8" src="@/assets/svg/magic.svg" alt="">
                        <span>Payments</span>
                    </div>
                </button>
            </li>
            <li class="step step-error">
                <button class="btn btn-outline btn-secondary" @click="selectedTitle = tabTitles[2]">
                    <div class="grid justify-items-center">
                        <img class="w-8 h-8" src="@/assets/svg/cog.svg" alt="">
                        <span>Order Status</span>
                    </div>
                </button>
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