<template>
  <NarrowContainer class="mb-20 px-4 md:px-0 !max-w-none" data-testid="wishlist-layout">
    <div class="flex md:justify-between items-end my-5 lg:my-10">
      <h1 class="font-semibold typography-headline-2 md:typography-headline-1 mr-2">{{ title }}</h1>
      <span class="text-sm md:text-2xl mb-1">{{ t('page.itemsAmount', { count: products?.length }) }}</span>
    </div>

    <div
      v-if="products.length > 0"
      :class="{ 'pointer-events-none opacity-50': loading }"
      data-testid="wishlist-page-content"
    >
      <SfLoaderCircular v-if="loading" class="absolute left-0 right-0 top-1/3 mx-auto z-[99999]" size="2xl" />
      <section
        class="grid grid-cols-1 2xs:grid-cols-2 gap-4 md:gap-6 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5 mb-10 md:mb-5"
        data-testid="wishlist-grid"
      >
        <NuxtLazyHydrate v-for="(product, index) in products" :key="productGetters.getId(product)" when-visible>
          <UiProductCard :product="product" is-from-wishlist :index="index">
            <template #wishlistButton>
              <WishlistButton discard square class="absolute top-0 right-0 mr-2 mb-2 bg-white" :product="product" />
            </template>
          </UiProductCard>
        </NuxtLazyHydrate>
      </section>
    </div>

    <div
      v-else
      class="flex items-center justify-center flex-col py-24"
      :class="{ 'pointer-events-none opacity-50': loading }"
      data-testid="wishlist-page-content"
    >
      <SfLoaderCircular v-if="loading" class="absolute z-[99999]" size="2xl" />
      <h2 data-testid="empty-wishlist-text" class="typography-headline-3 font-bold">
        {{ t('cart.emptyWishlist') }}
      </h2>
    </div>
    <div v-if="products.length > 0" class="mt-4 mb-4 typography-text-xs flex gap-1">
      <span>{{ t('common.labels.asterisk') }}</span>
      <span v-if="showNetPrices">{{ t('product.priceExclVAT') }}</span>
      <span v-else>{{ t('product.priceInclVAT') }}</span>
      <i18n-t keypath="shipping.excludedLabel" scope="global">
        <template #shipping>
          <SfLink
            :href="localePath(paths.shipping)"
            target="_blank"
            class="focus:outline focus:outline-offset-2 focus:outline-2 outline-secondary-600 rounded"
          >
            {{ t('common.labels.delivery') }}
          </SfLink>
        </template>
      </i18n-t>
    </div>
  </NarrowContainer>
</template>

<script setup lang="ts">
import { productGetters } from '@plentymarkets/shop-api';
import { SfLoaderCircular, SfLink } from '@storefront-ui/vue';
import type { WishlistPageContentProps } from '~/components/WishlistPageContent/types';
import { paths } from '~/utils/paths';

const { showNetPrices } = useCart();
const localePath = useLocalePath();

const { withHeader = true } = defineProps<WishlistPageContentProps>();
const { fetchWishlist, data: products, loading } = useWishlist();
const { fetchReviews } = useEkomiReviews();

const getProductReviews = () => {
  const productIds = ref(products.value.map((product) => productGetters.getItemId(product)));
  // eslint-disable-next-line no-console
  console.log('Product IDs in wishlist:', productIds.value);
  if (productIds.value.length > 0) {
    fetchReviews({
      productIds
    });
  }
};

fetchWishlist().then(() => {
  getProductReviews();
});
</script>
