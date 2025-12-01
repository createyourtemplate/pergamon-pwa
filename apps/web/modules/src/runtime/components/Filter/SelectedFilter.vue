<template>
    <template v-if="facet">
        <template v-for="(filter, index) in facetGetters.getFilters(facet)" :key="index">
            <div v-if="models[filter.id]" class="flex items-center bg-pergamon-gray text-xs md:text-sm text-white py-0.5 md:py-1 px-1.5 md:px-2.5 cursor-pointer" @click="facetChange(filter.id + '')" >
                <SfIconCloseSm size="sm" class="leading-none align-middle" /> <span class="leading-none">{{ filter.name }}</span>
            </div>
        </template>
    </template>
</template>

<script setup lang="ts">
import {
  SfIconCloseSm
} from '@storefront-ui/vue';
import { type Filter, type FilterGroup, facetGetters } from '@plentymarkets/shop-api';
import type { FilterProps } from '~/components/CategoryFilters/types';
import type { Filters } from '~/composables';

const { getFacetsFromURL, updateFilters } = useCategoryFilter();

const props = defineProps<FilterProps>();
const filters = facetGetters.getFilters(props.facet ?? ({} as FilterGroup)) as Filter[];
const models = ref({} as Filters);

const updateFilter = () => {
  const currentFacets = getFacetsFromURL().facets?.split(',') ?? [];
  for (const filter of filters) {
    const filterId = typeof filter.id === 'string' ? filter.id : filter.id.toString();

    models.value[filterId] = currentFacets.includes(filterId);
  }
};

const facetChange = (id: string) => updateFilters({[id]: false});

updateFilter();

watch(
  () => useNuxtApp().$router.currentRoute.value.query,
  async () => {
    updateFilter();
  },
);
</script>
