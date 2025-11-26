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
      class="w-full rounded shadow-none md:translate-x-0 z-[100] md:z-0 md:static md:!block -translate-x-full shrink-0 bg-white overflow-y-auto lg:relative lg:overflow-y-visible lg:z-40"
      data-testid="category-sidebar"
    >
      <div class="grid grid-rows-category-sidebar md:h-full md:flex lg:bg-[#f7f7f7] lg:py-3 lg:px-2">
        <div class="p-4 flex justify-between items-center md:hidden">
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
        <div class="fixed bottom-0 right-0 left-0 flex flex-wrap justify-between gap-3 md:hidden">
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

defineProps<CategorySidebarProps>();
defineEmits<CategorySidebarEmits>();
</script>