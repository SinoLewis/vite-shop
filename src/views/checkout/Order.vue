<template>
    <p>Your Order</p>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { defineComponent, onMounted } from 'vue'
import { useShopStore } from "../../stores/shop";
import { storeToRefs } from "pinia";

export default defineComponent({
    setup() {
        const { user } = storeToRefs(useShopStore())
        onMounted(() => {
            if (user.value.email !== '') {
                // TODO: Replace guards in router directly
                // useRouter().push('/login/signin')
            }
        })
    }
})
</script>
    