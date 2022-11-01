<template>
    <div class="grid grid-cols-4 gap-8">
        <div class="col-span-3 md:col-span-4">
            <div>
                <div class="border-4 border-base-300 rounded-lg bg-secondary-content">
                    <h2 class="p-4 text-3xl text-neutral-content">Cart (5)</h2>
                </div>
            </div>
            <div>
                <div class="p-2 grid grid-rows-1 gap-4">
                    <div v-for="item in Array(5).keys()" :key="item">
                        <div class="card glass bg-secondary-content  shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Card title!</h2>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                <div class="card-actions justify-end">
                                    <button class="btn btn-primary">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="card glass card-bordered text-neutral-content">
                <div class="bg-secondary-content">
                    <h2 class="p-4 text-3xl">Cart Summary</h2>
                </div>
                <div class="p-4">
                    <div class="flex justify-between">
                        <span class="text-secondary-content">Cart Total:</span><span>Ksh 1000</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-secondary-content">Cart Quantity:</span><span>5 Items</span>
                    </div>
                    <div class="py-4">
                        <div class="card-actions justify-between">
                            <button class="btn bg-secondary-content">Shopping</button>
                            <button class="btn bg-secondary-content">Delivery</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">

</script>