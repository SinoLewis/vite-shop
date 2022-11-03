<template>
    <pagination :totalPages="10" :perPage="10" :currentPage="currentPage" @pagechanged="onPageChange" />
</template>
  
<script lang="ts">
import Pagination from '@/components/Pagination.vue'

export default {
    components: {
        Pagination
    },
    data() {
        return {
            currentPage: 1,
        };
    },
    methods: {
        onPageChange(page) {
            console.log(page)
            this.currentPage = page;
        }
    }
}
</script>