<template>
  <div class="flex items-center justify-between row-start-3 pl-4 lg:pl-0 lg:ml-auto !mb-0 border-b border-b-black lg:border-b-0" data-testid="category-sorting">
    <h5
      v-if="!selectionModeCompact"
      class="rounded-none typography-headline-5 tracking-widest select-none lg:hidden"
    >
      {{ t('common.labels.sortBy') }}
    </h5>

    <div class="[&_svg]:w-9 [&_svg]:h-8 [&_svg]:top-2">
      <SfSelect id="sortBy" v-model="selected" :aria-label="t('common.labels.sortBy')" data-testid="select-sort-by" class="!border-none !ring-0 text-base">
        <option v-if="selectionModeCompact" value="" disabled hidden>{{ t('common.labels.sortBy') }}</option>
        <option v-for="option in options" :key="option" :value="option">
          {{ t(`category.sorting.${option}`) }}
        </option>
      </SfSelect>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SfSelect } from '@storefront-ui/vue';
import { useRoute } from 'vue-router';
import { isPageOfType } from '~/utils/pathHelper';

const props = defineProps<{ selectionModeCompact?: boolean }>();
const { updateSorting } = useCategoryFilter();
const { t } = useI18n();
const { getJsonSetting: availableSortingOptions } = useSiteSettings('availableSortingOptions');
const { getSetting: defaultSortingSearch } = useSiteSettings('defaultSortingSearch');
const { getSetting: defaultSortingOption } = useSiteSettings('defaultSortingOption');

const route = useRoute();
const useSelectionModeCompact = computed(() => props.selectionModeCompact);
watch(useSelectionModeCompact, (on) => {
  if (on) updateSorting('');
});
const options = computed<string[]>(() => availableSortingOptions());
const defaultOption = computed<string | undefined>(() =>
  isPageOfType('search') ? defaultSortingSearch() : defaultSortingOption(),
);

const selected = computed<string>({
  get: () => {
    if (useSelectionModeCompact.value) return '';

    const sortQueryParam = route.query.sort;
    const currentSort = typeof sortQueryParam === 'string' ? sortQueryParam : '';
    if (currentSort && options.value.includes(currentSort)) return currentSort;

    return (
      (defaultOption.value && options.value.includes(defaultOption.value) ? defaultOption.value : options.value[0]) ??
      ''
    );
  },
  set: (val) => {
    if (!val) return;
    updateSorting(val);
  },
});
</script>
