<template>
  <div class="flex flex-row gap-2 mb-5">
    <SelectedFilter v-for="facet in facets" :key="facet.id" :facet="facet" />
    <div v-if="currentFacets.length > 3" class="flex items-center bg-[#000000] text-xs md:text-sm text-white py-0.5 md:py-1 px-1.5 md:px-2.5 cursor-pointer" @click="removeFacets">
      <SfIconCloseSm size="sm" class="leading-none align-middle" /> <span class="leading-none">Alle Filter zurücksetzen</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CategoryFiltersProps } from '~/components/CategoryFilters/types';
import {
  SfIconCloseSm
} from '@storefront-ui/vue';

const { getFacetsFromURL, updateFilters } = useCategoryFilter();

const props = defineProps<CategoryFiltersProps>();
const { facets } = toRefs(props);
const currentFacets = ref([] as string[]);

const updateFacetsCount = () => {
  currentFacets.value = getFacetsFromURL().facets?.split(',') ?? [];
};

const removeFacets = () => {
  const updates: Record<string, boolean> = {};
  for (const facetId of currentFacets.value) {
    updates[facetId] = false;
  }
  updateFilters(updates);
};

updateFacetsCount();

watch(
  () => useNuxtApp().$router.currentRoute.value.query,
  async () => {
    updateFacetsCount();
  },
);
</script>