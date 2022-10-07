<template>
    <div>
        <div>
            <h1 class="card-title text-primary text-3xl">Sign in to your Account.</h1>
        </div>
        <div class="form-control">
            <form @submit.prevent="handleSignin">
                <div>
                    <label for="email" class="label">
                        <span class="text-primary label-text">Your Email</span>
                    </label>
                    <label class="input-group">
                        <span>Email</span>
                        <input type="text" placeholder="info@site.com" class="input input-bordered text-secondary"
                            v-model="email" />
                    </label>
                </div>
                <div>
                    <label for="password" class="label">
                        <span class="text-primary label-text">Your Password</span>
                    </label>
                    <label class="input-group">
                        <span>Password</span>
                        <input type="text" placeholder="info@site.com" class="input input-bordered text-secondary"
                            v-model="password" />
                    </label>
                </div>
                <div class="py-4">
                    <button type="submit" class="btn btn-outline btn-secondary">
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { createPinia } from "pinia";
import { useShopStore } from '@/stores/shop'
import { useRouter } from 'vue-router';

const { signInAction } = useShopStore(createPinia())
const router = useRouter()

const email = ref('')
const password = ref('')

function handleSignin() {
    const user_form = { email: email.value, password: password.value }
    signInAction(user_form).then(res => {
        if (res) {
            console.log('Signin Status', res)
            router.go(-1)
        } else {
            console.log('Signin Status', res)
        }
    })
}

</script>