<template>
  <div data-testid="product-accordion">
    <UiDivider class="mb-1 !border-black" />
    <UiAccordionItem
      v-if="crossSellingItemsAccessory?.products?.length"
      v-model="colorDataOpen"
      summary-class="w-full hover:bg-neutral-100 py-2 px-2 flex justify-between items-center select-none"
    >
      <template #summary>
        <h2 class="text-sm leading-6" :class="{'font-bold': colorDataOpen}">
          {{ t('product.more_colors') }}
        </h2>
      </template>
      <div>
        <div class="flex items-center gap-2">
          <div v-for="(itemAccessorie, index) in crossSellingItemsAccessory.products" :key="itemAccessorie.item.id + index">
            <SfLink :href="'/' + itemAccessorie.texts.urlPath + '_' + itemAccessorie.item.id + '_' + itemAccessorie.variation.id" variant="secondary">
              <NuxtImg :src="itemAccessorie.images.all[itemAccessorie.images.all.length-1]?.urlSecondPreview" height="75" :alt="itemAccessorie.images.all[0]?.cleanImageName"/>
            </SfLink>
          </div>
        </div>
      </div>
    </UiAccordionItem>
    <UiDivider v-if="crossSellingItemsAccessory?.products?.length" class="my-1 !border-black" />
    <UiAccordionItem
      v-if="crossSellingItemsReplacement?.products?.length"
      v-model="formDataOpen"
      summary-class="w-full hover:bg-neutral-100 py-2 px-2 flex justify-between items-center select-none"
    >
      <template #summary>
        <h2 class="text-sm leading-6" :class="{'font-bold': formDataOpen}">
          {{ t('product.more_forms') }}
        </h2>
      </template>
      <div>
        <div class="flex items-center gap-2">
          <div v-for="(itemSimilar, index) in crossSellingItemsReplacement.products" :key="itemSimilar.item.id + index">
            <SfLink :href="'/' + itemSimilar.texts.urlPath + '_' + itemSimilar.item.id + '_' + itemSimilar.variation.id" variant="secondary">
              <NuxtImg :src="itemSimilar.images.all[itemSimilar.images.all.length-1]?.urlSecondPreview" height="75" :alt="itemSimilar.images.all[0]?.cleanImageName"/>
            </SfLink>
          </div>
        </div>
      </div>
    </UiAccordionItem>
    <UiDivider v-if="crossSellingItemsReplacement?.products?.length" class="my-1 !border-black" />
    <UiAccordionItem
      v-if="productGetters.getDescription(product)?.length"
      v-model="productDetailsOpen"
      summary-class="w-full hover:bg-neutral-100 py-2 px-2 flex justify-between items-center select-none"
    >
      <template #summary>
        <h2 class="text-sm leading-6" :class="{'font-bold': productDetailsOpen}">
          {{ t('product.description') }}
        </h2>
      </template>
      <div class="no-preflight" v-html="productGetters.getDescription(product)" />
    </UiAccordionItem>
    <UiDivider v-if="productGetters.getDescription(product)?.length" class="my-1 !border-black" />
    <UiAccordionItem
      v-if="productGetters.getTechnicalData(product)?.length"
      v-model="technicalDataOpen"
      summary-class="w-full hover:bg-neutral-100 py-2 px-2 flex justify-between items-center select-none"
    >
      <template #summary>
        <h2 class="text-sm leading-6" :class="{'font-bold': technicalDataOpen}">
          {{ t('product.details') }}
        </h2>
      </template>
      <div class="no-preflight" v-html="productGetters.getTechnicalData(product)" />
    </UiAccordionItem>
    <UiDivider v-if="productGetters.getTechnicalData(product)?.length" class="my-1 !border-black" />
  </div>
</template>

<script setup lang="ts">
import { productGetters } from '@plentymarkets/shop-api';
import type { ProductAccordionPropsType } from '~/components/ProductAccordion/types';
import { SfLink } from '@storefront-ui/vue';

const props = defineProps<ProductAccordionPropsType>();

const { product } = toRefs(props);

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

// type ReplacementPart
const {
  fetchProducts: fetchCrossSellingReplacement,
  data: crossSellingItemsReplacement,
} = useProducts(itemId + "ReplacementPart");

fetchCrossSellingReplacement({
  itemId: itemId,
  type: "cross_selling",
  crossSellingRelation: "ReplacementPart",
});

</script>
