<template>
    <div class="grid grid-cols-2 gap-2">
        <div class="p-2">
            <div class="card w-96 bg-base-100 shadow-xl">
                <div class="card-body glass">
                    <h1 class="card-title text-primary text-3xl">Enter Payment Details.</h1>
                    <div class="form-control">
                        <form class="grid grid-row-3 gap-4">
                            <div>
                                <label for="phone" class="label">
                                    <span class="text-primary label-text">Your Phone No.</span>
                                </label>
                                <label class="input-group">
                                    <span>Phone</span>
                                    <input type="text" placeholder="0712345678"
                                        class="input input-bordered text-secondary" />
                                </label>
                            </div>
                            <div>
                                <button type="submit" class="btn btn-outline btn-secondary">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-2">
            <div class="card glass card-bordered text-neutral-content">
                <div class="bg-secondary-content">
                    <h2 class="p-4 text-3xl">Payment Summary</h2>
                </div>
                <div class="p-4">
                    <div class="flex gap-2 justify-items-start">
                        <span class="text-secondary-content">Name:</span>
                        <span>Lewis Nzau</span>
                    </div>
                    <div class="flex gap-2 justify-items-start">
                        <span class="text-secondary-content">Phone:</span>
                        <span>0712345678</span>
                    </div>
                    <div class="py-4">
                        <div class="card-actions justify-between">
                            <button class="btn bg-secondary-content">Delivery</button>
                            <button class="btn bg-secondary-content">Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">

</script>