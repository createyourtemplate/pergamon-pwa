<template>
  <template v-for="key in renderOrder" :key="key">
    <template v-if="fields?.[key]">
      <div v-if="key === 'name' && texts.name" class="mb-3 lg:mb-6" :class="{'flex items-end md:justify-between': totalCounts > 0}">
        <h1
          id="category-headline"
          class="!font-[CormorantGaramond] text-2xl lg:text-[40px] md:typography-headline-2 pl-4 pr-2 md:px-0"
          data-testid="category-name"
        >
          {{ texts.name }}
        </h1>
        <div v-if="totalCounts > 0">
          <span class="text-sm md:text-2xl">{{ totalCounts }} Artikel</span>
        </div>
        <div v-if="totalCounts > 0" class="flex items-center gap-3 lg:hidden self-center ml-auto pr-4">
          <div class="md:hidden" @click="toggleColumn('1')"><NuxtImg :src="groupSingle" class="bg-black" width="18" height="18" alt="user icon" /></div>
          <div class="hidden md:block" @click="toggleColumn('')"><NuxtImg :src="groupMultiple" width="18" height="18" alt="user icon" /></div>
          <div class="hidden md:block" @click="toggleColumn('1')"><NuxtImg :src="group" width="18" height="18" alt="user icon" /></div>
          <div class="md:hidden" @click="toggleColumn('')"><NuxtImg :src="group" width="18" height="18" alt="user icon" /></div>
        </div>
      </div>

      <div
        v-else-if="key === 'description1' && texts.description1"
        data-testid="category-description-1"
        v-html="texts.description1"
      />

      <div
        v-else-if="key === 'description2' && texts.description2"
        data-testid="category-description-2"
        v-html="texts.description2"
      />

      <div
        v-else-if="key === 'shortDescription' && texts.shortDescription"
        data-testid="category-short-description"
        v-html="texts.shortDescription"
      />
    </template>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type {
  CategoryDataFieldKey,
  CategoryDataFieldsVisibility,
  CategoryData,
} from '~/components/blocks/CategoryData/types';
import group from '/assets/icons/custom_paths/group.svg';
import groupSingle from '/assets/icons/custom_paths/group_single.svg';
import groupMultiple from '/assets/icons/custom_paths/group_multiple.svg';

const props = defineProps<{
  fields: CategoryDataFieldsVisibility;
  fieldsOrder: CategoryDataFieldKey[];
  texts: CategoryData;
  totalCounts: number;
}>();

const toggleColumn = (col: string) => {
  try {
    const columnView = localStorage.getItem('categoryColumnView');
    if (col === '') {
      localStorage.setItem('categoryColumnView', '');
      document.documentElement.classList.remove('few-column');
      return;
    } else
    if (col === '1' && columnView !== '1') {
      localStorage.setItem('categoryColumnView', '1');
      document.documentElement.classList.add('few-column');
    } else if (col === '1' && columnView === '1') {
      return;
    }
  } catch {
    return;
  }
};

const renderOrder = computed<CategoryDataFieldKey[]>(() =>
  props.fieldsOrder?.length
    ? props.fieldsOrder
    : (['name', 'description1', 'description2', 'shortDescription'] as CategoryDataFieldKey[]),
);
</script>