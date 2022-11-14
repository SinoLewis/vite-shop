<template>
    <div v-if="routeLoading" class="fixed w-full top-0 left-0 h-1 gradient-loader"></div>
</template>

<script setup lang="ts">
import { useUIStore } from "@/stores/ui";
import { storeToRefs } from "pinia";

const { routeLoading } = storeToRefs(useUIStore())

</script>

<style lang="scss" scoped>
// .show {
//     @apply opacity-100 translate-x-0;
// }

.gradient-loader {
    @apply bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500;
    background-size: 200% 200%;
    animation: gradiant-move 1s infinite;
}

@keyframes gradiant-move {
    0% {
        background-position: left
    }

    50% {
        background-position: right
    }

    100% {
        background-position: left
    }
}
</style>