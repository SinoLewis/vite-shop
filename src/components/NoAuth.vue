<template>
    <div class="grid grid-col-3 gap-4 place-content-center">
        <h1>No user logged in!</h1>
        <p>To get started login here 👇</p>
        <button @click="loginPopup()" class="btn btn-active btn-secondary">Login</button>
    </div>
</template>

<script setup lang="ts">
function loginPopup() {
    // TODO: Fix this using vue template refs
    // document.querySelector('#loginModal').click()
}
</script>