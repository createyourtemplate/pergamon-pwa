<template>
  <NuxtLayout name="default">
    <div data-testid="search-results" class="relative [&_.toggle-grid]:hidden" :class="{ 'pointer-events-none opacity-50': loading }">
      <SfLoaderCircular v-if="loading" class="fixed top-[50%] right-0 left-0 m-auto z-[99999]" size="2xl" />
      <CategoryPageContent
        v-if="productsCatalog"
        :title="t('page.search', { phrase: route.query.term })"
        :total-products="productsCatalog.pagination.totals"
        :products="productsCatalog.products"
        :items-per-page="Number(productsPerPage)"
      >
        <template #sidebar >
          <div v-if="productsCatalog.facets && facetGetters.hasFilters(productsCatalog.facets)" class="px-3 lg:hidden">
            <SelectedFilters :facets="productsCatalog.facets" />
          </div>
          <CategoryFilters v-if="facetGetters.hasFilters(productsCatalog.facets)" class="!py-0 lg:!flex" :facets="productsCatalog.facets" />
          <CategorySorting class="py-1 lg:py-0" />
        </template>
      </CategoryPageContent>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { facetGetters, productGetters } from '@plentymarkets/shop-api';
import { SfLoaderCircular } from '@storefront-ui/vue';
const { getRobots, setRobotForStaticPage } = useRobots();

definePageMeta({
  layout: false,
  type: 'search',
});

const route = useRoute();
const { getSearch, data: productsCatalog, productsPerPage, loading } = useSearch();
const { getFacetsFromURL } = useCategoryFilter();

const products = computed(() => productsCatalog.value.products || []);
const productIds = ref(products.value.map((product) => productGetters.getItemId(product)));

const { fetchReviews } = useEkomiReviews();

const getProductReviews = () => {
  if (productIds.value.length > 0) {
    fetchReviews({
      productIds
    });
  }
};

const handleQueryUpdate = async () => {
  await getSearch(getFacetsFromURL());
  getProductReviews();
};

await handleQueryUpdate();

watch(
  () => route.query,
  async () => {
    handleQueryUpdate();
  },
);

await getRobots();
setRobotForStaticPage('SearchResult');
</script>
