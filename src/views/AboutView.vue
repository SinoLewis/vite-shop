<template>
    <div>
        <p class="text-3xl">About View</p>
    </div>
</template>

<script setup lang="ts">
import { supabase } from '../server/supabase'

const { data, error } = supabase
    .from('product')
console.log(error)
</script>