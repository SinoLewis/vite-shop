<template>
    <div class="grid grid-row-2 place-items-center">
        <h1 class="text-3xl uppercase py-4 text-accent animate-pulse">categories</h1>
        <div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();
onMounted(()=>{
    // $toast.open('Howdy!');
    let instance  = $toast.success('Run it back', {
        position : 'top-right',
        duration: 10000
    });
    $toast.error('Fuk broke we ballin');
    console.warn(instance)
})
// let instance = $toast.success('You did it!');
// Force dismiss specific toast
// instance.dismiss();

// Dismiss all opened toast immediately
// $toast.clear();
</script>