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
          <UiButton :disabled="toggleStatus === ''" class="hidden md:block !p-0 hover:!bg-transparent" variant="tertiary" :square="true" @click="toggleColumn('')">
            <MultiGridIcon />
          </UiButton>
          <UiButton :disabled="toggleStatus === '1'" class="hidden md:block !p-0 hover:!bg-transparent" variant="tertiary" :square="true" @click="toggleColumn('1')">
            <GridIcon />
          </UiButton>
          
          <UiButton :disabled="toggleStatus === ''" class="md:hidden !p-0 hover:!bg-transparent" variant="tertiary" :square="true" @click="toggleColumn('')">
            <GridIcon />
          </UiButton>
          <UiButton :disabled="toggleStatus === '1'" class="md:hidden !p-0 hover:!bg-transparent" variant="tertiary" :square="true" @click="toggleColumn('1')">
            <RectIcon />
          </UiButton>
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

const toggleStatus = ref('');

const columnView = computed(() => {
  try {
    return localStorage.getItem('categoryColumnView') ?? '';
  } catch {
    return '';
  }
});

const toggleColumn = (col: string) => {
  try {
    if (col === '') {
      toggleStatus.value = '';
      localStorage.setItem('categoryColumnView', '');
      document.documentElement.classList.remove('few-column');
      return;
    } else
    if (col === '1' && columnView.value !== '1') {
      toggleStatus.value = '1';
      localStorage.setItem('categoryColumnView', '1');
      document.documentElement.classList.add('few-column');
    } else if (col === '1' && columnView.value === '1') {
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

onMounted(() => {
  toggleStatus.value = columnView.value;
});
</script>