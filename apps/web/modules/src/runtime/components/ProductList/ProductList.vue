<template>
    <div v-if="productList?.products.length" class="p-3 mb-20 mt-8">
        <div>
            <slot />
        </div>
        <ProductSlider :items="productList.products" />
    </div>
</template>

<script setup lang="ts">
import type { ProductListProps } from './types';

const props = withDefaults(defineProps<ProductListProps>(), { cacheKey: '' });

const params = computed(() => {
  const baseParams: Record<string, any> = { type: props.type };

  if (props.type === 'cross_selling' && props.crossSellingRelation) {
    baseParams.crossSellingRelation = props.crossSellingRelation;
    baseParams.itemId = props.itemId;
  }

  return baseParams;
});

const { fetchProducts: fetchProductList, data: productList } =
  useProducts(props.cacheKey + "_" + props.type);

fetchProductList(params.value);
</script>
