<template>
  <template v-for="key in renderOrder" :key="key">
    <template v-if="fields?.[key]">
      <div v-if="key === 'name' && texts.name" class="mb-6" :class="{'flex items-end md:justify-between': totalCounts > 0}">
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

const props = defineProps<{
  fields: CategoryDataFieldsVisibility;
  fieldsOrder: CategoryDataFieldKey[];
  texts: CategoryData;
  totalCounts: number;
}>();

const renderOrder = computed<CategoryDataFieldKey[]>(() =>
  props.fieldsOrder?.length
    ? props.fieldsOrder
    : (['name', 'description1', 'description2', 'shortDescription'] as CategoryDataFieldKey[]),
);
</script>