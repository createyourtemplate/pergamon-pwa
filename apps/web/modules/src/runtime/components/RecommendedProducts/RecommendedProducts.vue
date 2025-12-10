<template>
  <ProductSlider v-if="recommendedProducts?.length" :items="recommendedProducts" />
</template>

<script setup lang="ts">
import { productGetters } from '@plentymarkets/shop-api';
import type { RecommendedProductsProps } from './types';

const props = withDefaults(defineProps<RecommendedProductsProps>(), { cacheKey: '' });
const { data: recommendedProducts, fetchProductRecommended } = useProductRecommended(props.categoryId + props.cacheKey);
const { fetchReviews } = useEkomiReviews();

if (props.categoryId) {
  fetchProductRecommended({ type: 'category', categoryId: String(props.categoryId) }).then(() => {
    const productIds = ref(recommendedProducts.value?.map((product) => productGetters.getItemId(product)));
    
    if (productIds.value.length > 0) {
      fetchReviews({ productIds });
    }
  });
}
</script>
