<template>
    <ais-instant-search :search-client="searchClient" index-name="movies">
        <ais-configure :hits-per-page.camel="10" />
        <!-- The button to open modal -->
        <label for="my-modal-3" class="btn modal-button">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </label>

        <!-- Put this part before </body> tag -->
        <input type="checkbox" id="my-modal-3" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box w-11/12 h-5/6 max-w-5xl opacity-90">
                <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <div>
                    <ais-search-box class="searchbox">
                        <template v-slot="{ currentRefinement, isSearchStalled, refine }">
                            <input placeholder="Search Shop 🫠" class="input input-bordered input-info w-full max-w-xs"
                                type="search" :value="currentRefinement" @input="refine($event.currentTarget || undefined)">
                            <span :hidden="!isSearchStalled">Loading...</span>
                        </template>
                    </ais-search-box>
                    <div class="divider"></div>
                    <ais-hits>
                        <template v-slot="{ items }">
                            <ul>
                                <li v-for="{ id, title, poster } in items" :key="id">
                                    <div class="card card-side bg-base-100 shadow-xl">
                                        <figure> <img class="w-72 h-36 object-cover object-center" :src="poster"
                                                :alt="`Poster from ${title}`" />
                                        </figure>
                                        <div class="card-body">
                                            <h1>{{ title }}</h1>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                    </ais-hits>

                </div>
            </div>
        </div>
    </ais-instant-search>
</template>
    
<script setup lang="ts">
import { MagnifyingGlassCircleIcon } from '@heroicons/vue/20/solid'
import { onMounted } from "vue"
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'

const searchClient = instantMeiliSearch('http://127.0.0.1:7700')
</script>
  