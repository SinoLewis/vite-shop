<template>
    <div>
        <div v-if="!toggle">
            <Signin />
            <p class="py-4">Dont have an account? <a @click="click" class="btn btn-xs text-accent">Sign Up</a></p>
        </div>
        <div v-else>
            <Signup />
            <p class="py-4">Already have an account? <a @click="click" class="btn btn-xs text-accent">Sign In</a></p>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import Signin from "@/components/login/Signin.vue";
import Signup from "@/components/login/Signup.vue";
import { ref } from "vue";

const toggle = ref(false)
const click = ()=>{
    toggle.value = !toggle.value
}
</script>