<template>
  <div data-testid="product-accordion">
    <UiDivider class="mb-1" />
    <UiAccordionItem
      v-if="productGetters.getDescription(product)?.length"
      v-model="productDetailsOpen"
      summary-class="md:rounded-md w-full hover:bg-neutral-100 py-2 px-2 flex justify-between items-center select-none"
    >
      <template #summary>
        <h2 class="text-sm leading-6" :class="{'font-bold': productDetailsOpen}">
          {{ t('productDetails') }}
        </h2>
      </template>
      <div class="no-preflight" v-html="productGetters.getDescription(product)" />
    </UiAccordionItem>
    <UiDivider v-if="productGetters.getDescription(product)?.length" class="my-1" />
    <UiAccordionItem
      v-if="productGetters.getTechnicalData(product)?.length"
      v-model="technicalDataOpen"
      summary-class="md:rounded-md w-full hover:bg-neutral-100 py-2 px-2 flex justify-between items-center select-none"
    >
      <template #summary>
        <h2 class="text-sm leading-6" :class="{'font-bold': technicalDataOpen}">
          {{ t('technicalData') }}
        </h2>
      </template>
      <div class="no-preflight" v-html="productGetters.getTechnicalData(product)" />
    </UiAccordionItem>
    <UiDivider v-if="productGetters.getTechnicalData(product)?.length" class="my-1" />
    <UiAccordionItem
      v-if="crossSellingItemsAccessory?.products?.length"
      v-model="colorDataOpen"
      summary-class="md:rounded-md w-full hover:bg-neutral-100 py-2 px-2 flex justify-between items-center select-none"
    >
      <template #summary>
        <h2 class="text-lg leading-6" :class="{'font-bold': colorDataOpen}">
          Weitere Farben
        </h2>
      </template>
      <div class="no-preflight">
        <span v-for="(itemAccessorie, index) in crossSellingItemsAccessory.products" :key="itemAccessorie.item.id + index">
          {{ itemAccessorie.item.id }}
        </span>
      </div>
    </UiAccordionItem>
    <UiDivider v-if="crossSellingItemsAccessory?.products?.length" class="my-1" />
    <UiAccordionItem
      v-if="crossSellingItemsSimilar?.products?.length"
      v-model="formDataOpen"
      summary-class="md:rounded-md w-full hover:bg-neutral-100 py-2 px-2 flex justify-between items-center select-none"
    >
      <template #summary>
        <h2 class="text-lg leading-6" :class="{'font-bold': formDataOpen}">
          Weitere Formen
        </h2>
      </template>
      <div class="no-preflight">
        <span v-for="(itemSimilar, index) in crossSellingItemsSimilar.products" :key="itemSimilar.item.id + index">
          {{ itemSimilar.item.id }}
        </span>
      </div>
    </UiAccordionItem>
    <UiDivider v-if="crossSellingItemsSimilar?.products?.length" class="my-1" />
  </div>
</template>

<script setup lang="ts">
import { productGetters } from '@plentymarkets/shop-api';
import type { ProductAccordionPropsType } from '~/components/ProductAccordion/types';

const props = defineProps<ProductAccordionPropsType>();

const { product } = toRefs(props);
const { t } = useI18n();

const productDetailsOpen = ref(false);
const technicalDataOpen = ref(false);
const colorDataOpen = ref(false);
const formDataOpen = ref(false);

const itemId = productGetters.getItemId(product.value);

// type Accessory
const {
  fetchProducts: fetchCrossSellingAccessory,
  data: crossSellingItemsAccessory,
} = useProducts(itemId + "Accessory");

fetchCrossSellingAccessory({
  itemId: itemId,
  type: "cross_selling",
  crossSellingRelation: "Accessory",
});

// type Similar
const {
  fetchProducts: fetchCrossSellingSimilar,
  data: crossSellingItemsSimilar,
} = useProducts(itemId + "Similar");

fetchCrossSellingSimilar({
  itemId: itemId,
  type: "cross_selling",
  crossSellingRelation: "Similar",
});

</script>
