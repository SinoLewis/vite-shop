<template>
    <ul class="flex gap-2 btn-group btn-group-vertical lg:btn-group-horizontal">
        <li>
            <button class="btn" type="button" @click="onClickFirstPage" :disabled="isInFirstPage">
                First
            </button>
        </li>

        <li>
            <button class="btn" type="button" @click="onClickPreviousPage" :disabled="isInFirstPage">
                Previous
            </button>
        </li>

        <!-- Visible Buttons Start -->

        <li v-for="page in pages" :key="page.name">
            <button class="btn bg-secondary-content" type="button" :disabled="page.isDisabled" @click="onClickPage(page.name)">
                {{ page.name }}
            </button>
        </li>

        <!-- Visible Buttons End -->

        <li>
            <button class="btn" type="button" @click="onClickNextPage" :disabled="isInLastPage">
                Next
            </button>
        </li>

        <li>
            <button class="btn" type="button" @click="onClickLastPage" :disabled="isInLastPage">
                Last
            </button>
        </li>
    </ul>
</template>
  
<script lang="ts">
export default {
    props: {
        maxVisibleButtons: {
            type: Number,
            required: false,
            default: 3
        },
        totalPages: {
            type: Number,
            required: true
        },
        perPage: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        },
    },
    computed: {
        startPage() {
            // When on the first page
            if (this.currentPage === 1) {
                return 1;
            }

            // When on the last page
            if (this.currentPage === this.totalPages) {
                return this.totalPages - this.maxVisibleButtons;
            }

            // When inbetween
            return this.currentPage - 1;
        },
        pages() {
            const range = [];

            for (
                let i = this.startPage;
                i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
                i++
            ) {
                range.push({
                    name: i,
                    isDisabled: i === this.currentPage
                });
            }

            return range;
        },
        isInFirstPage() {
            return this.currentPage === 1;
        },
        isInLastPage() {
            return this.currentPage === this.totalPages;
        },
    },
    methods: {
        onClickFirstPage() {
            this.$emit('pagechanged', 1);
        },
        onClickPreviousPage() {
            this.$emit('pagechanged', this.currentPage - 1);
        },
        onClickPage(page) {
            this.$emit('pagechanged', page);
        },
        onClickNextPage() {
            this.$emit('pagechanged', this.currentPage + 1);
        },
        onClickLastPage() {
            this.$emit('pagechanged', this.totalPages);
        }
    }
};
</script>