<template>
    <div v-if="title == selectedTitle">
        <slot />
    </div>
</template>

<script lang="ts">
import { inject } from 'vue'
export default ({
    props: ['title'],
    setup() {
        const selectedTitle = inject('selected')

        return { selectedTitle }
    }
})
</script>