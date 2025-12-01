<template>
  <transition
    enter-active-class="transition duration-500 ease-in-out"
    leave-active-class="transition duration-500 ease-in-out"
    enter-from-class="-translate-x-full"
    enter-to-class="translate-x-0"
    leave-from-class="translate-x-0"
    leave-to-class="-translate-x-full"
  >
    <SfDrawer
      v-show="isOpen"
      :model-value="true"
      :disable-click-away="true"
      :disable-esc="true"
      class="w-full rounded shadow-none lg:translate-x-0 z-[100] lg:z-0 lg:static lg:!block -translate-x-full shrink-0 bg-white overflow-y-auto lg:relative lg:overflow-y-visible lg:z-40"
      data-testid="category-sidebar"
    >
      <div class="grid grid-rows-category-sidebar lg:h-full lg:flex lg:bg-[#f7f7f7] lg:py-3 lg:px-2">
        <div class="p-4 flex justify-between items-center lg:hidden">
          <span class="font-bold text-lg">{{ t('listSettings') }}</span>
          <UiButton variant="primary" size="sm" class="rounded-none !p-0" :aria-label="t('closeListSettings')" @click="$emit('close')">
            <template #prefix>
              <SfIconClose />
            </template>
          </UiButton>
        </div>
        <div v-if="productsCatalog.facets && facetGetters.hasFilters(productsCatalog.facets)" class="px-3 lg:hidden">
          <SelectedFilters :facets="productsCatalog.facets" />
        </div>
        <UiDivider class="!border-black lg:hidden" />
        <slot class="overflow-y-auto md:overflow-y-visible py-4 md:p-0" />
        <div class="items-center gap-3 hidden lg:flex px-3">
          <UiButton :disabled="toggleStatus === ''" class="!p-0 hover:!bg-transparent" variant="tertiary" :square="true" @click="toggleColumn('')">
            <MultiGridIcon />
          </UiButton>
          <UiButton :disabled="toggleStatus === '1'" class="!p-0 hover:!bg-transparent" variant="tertiary" :square="true" @click="toggleColumn('1')">
            <GridIcon />
          </UiButton>
        </div>
        <div class="fixed bottom-0 right-0 left-0 flex flex-wrap justify-between gap-3 lg:hidden">
          <UiButton class="whitespace-nowrap flex flex-1 !rounded-none" variant="primary" @click="$emit('close')">
            {{ t('showProducts') }}
          </UiButton>
        </div>
      </div>
    </SfDrawer>
  </transition>
</template>

<script setup lang="ts">
import { SfDrawer, SfIconClose } from '@storefront-ui/vue';
import { facetGetters } from '@plentymarkets/shop-api';
import type { CategorySidebarEmits, CategorySidebarProps } from '~/components/CategorySidebar/types';

const { data: productsCatalog } = useProducts();
const { t } = useI18n();

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

onMounted(() => {
  toggleStatus.value = columnView.value;
});

defineProps<CategorySidebarProps>();
defineEmits<CategorySidebarEmits>();
</script>