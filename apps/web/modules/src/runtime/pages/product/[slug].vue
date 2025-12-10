<template>
  <NuxtLayout name="default" :breadcrumbs="breadcrumbs">
    <!--<EditablePage v-if="config.enableProductEditing" :identifier="'0'" :type="'product'" prevent-blocks-request />-->

    <NarrowContainer class="lg:max-w-full">
      <div class="hidden lg:block mb-7">
        <span class="text-[40px] font-[CormorantGaramond]">Color</span>
      </div>
      <div class="lg:grid gap-x-6 grid-areas-product-page grid-cols-product-page !grid-cols-[minmax(65%,_400px)_auto]">
        <section v-if="viewport.isLessOrEquals('md')" class="grid-in-left-top md:h-full xl:max-h-[1200px]">
          <Gallery :images="addModernImageExtensionForGallery(productGetters.getGallery(product))" />
        </section>
        <section v-if="viewport.isGreaterOrEquals('lg')" class="grid-in-left-top">
          <div class="flex flex-wrap">
            <div
              v-for="(image, index) in addModernImageExtensionForGallery(productGetters.getGallery(product))" 
              :key="image.cleanImageName + index" 
              class="relative pb-[100%] w-full bg-pergamon-light-gray mb-4"
              :class="{'order-1': index < productGetters.getGallery(product).length-1 }">
              <NuxtImg :src="image.urlMiddle" class="absolute w-full mix-blend-multiply" />
            </div>
          </div>
        </section>
        <section class="mb-7 lg:mb-10 grid-in-right">
          <div class="md:sticky top-[60px]">
            <UiPurchaseCard v-if="product" :product="product" />
            <NuxtLazyHydrate when-visible>
                <ProductAccordion v-if="product" :product="product" class="mt-3 md:mt-7" />
            </NuxtLazyHydrate>
            <div class="w-full hover:bg-neutral-100 py-2 px-2 flex justify-between items-center select-none list-none [&::-webkit-details-marker]:hidden cursor-pointer focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm">
                <p class="text-sm leading-6 cursor-pointer" data-testid="open-manufacturer-drawer" @click="openDrawer()">
                    <span>{{ t('product.legalDetails') }}</span>
                </p>
                <SfIconAdd size="sm" class="text-neutral-500"/>
            </div>
            <UiDivider class="my-1 !border-black" />
          </div>
        </section>
      </div>
      <ProductReviews :product="product" />
      <!--<section ref="recommendedSection">
        <component
          :is="ProductListAsync"
          v-if="showRecommended"
          :type="'last_seen'"
        >
          <div class="text-2xl lg:text-3xl font-[CormorantGaramond] text-center md:text-start mb-7" >
            <span>{{ t('product.recommendedProducts') }}</span>
          </div>
        </component>
      </section>-->
     <section>
        <component
          :is="ProductListAsync"
          v-if="showRecommended"
          :item-id="Number(productId)"
          :type="'cross_selling'"
          :cross-selling-relation="'Similar'"
        >
          <div class="text-2xl lg:text-3xl font-[CormorantGaramond] text-center md:text-start mb-7" >
            <span>{{ t('product.last_seen') }}</span>
          </div>
        </component>
      </section>
    </NarrowContainer>
    <UiReviewModal />
    <ProductLegalDetailsDrawer v-if="open" :product="product" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { SfIconAdd } from '@storefront-ui/vue';
import type { Product } from '@plentymarkets/shop-api';
import { productGetters, categoryTreeGetters } from '@plentymarkets/shop-api';
const route = useRoute();
const { setCurrentProduct } = useProducts();
const { setBlocksListContext } = useBlocksList();
const { setProductMetaData, setProductRobotsMetaData, setProductCanonicalMetaData } = useStructuredData();
const { buildProductLanguagePath } = useLocalization();
const { addModernImageExtensionForGallery } = useModernImage();
const { productParams, productId } = createProductParams(route.params);
const { productForEditor, fetchProduct, setProductMeta, setBreadcrumbs, breadcrumbs } = useProduct(productId);
const product = productForEditor;
const { disableActions } = useEditor();
const { data: categoryTree } = useCategoryTree();
const { open, openDrawer } = useProductLegalDetailsDrawer();
const { setPageMeta } = usePageMeta();
const { resetNotification } = useEditModeNotification(disableActions);

const viewport = useViewport();

definePageMeta({
  layout: false,
  path: '/:slug*_:itemId',
  validate: async (route) => {
    return validateProductParams(route.params);
  },
  type: 'product',
  isBlockified: false,
  identifier: 0,
});

const ProductListAsync = defineAsyncComponent(
  async () => await import('../../components/ProductList/ProductList.vue'),
);

const showRecommended = ref(false);
const recommendedSection = ref<HTMLElement | null>(null);
const productName = computed(() => productGetters.getName(product.value));
const icon = 'sell';
setPageMeta(productName.value, icon);

await fetchProduct(productParams).then(() => {
  usePlentyEvent().emit('frontend:productLoaded', {
    product: product.value,
  });
});

if (Object.keys(product.value).length === 0) {
  if (import.meta.client) showError({ statusCode: 404, statusMessage: 'Product not found' });

  throw createError({
    statusCode: 404,
    statusMessage: 'Product not found',
  });
}
setCurrentProduct(product.value || ({} as Product));

watch(
  disableActions,
  () => {
    setCurrentProduct(productForEditor.value || ({} as Product));
  },
  { immediate: true },
);

setProductMeta();
setBlocksListContext('product');

onBeforeRouteLeave(() => {
  setCurrentProduct({} as Product);
});

setBreadcrumbs();

/* TODO: This should only be temporary.
 *  It changes the url of the product page while on the page and switching the locale.
 *  Should be removed when the item search is refactored.
 */
watch(
  () => product.value.texts.urlPath,
  (value, oldValue) => {
    if (value !== oldValue) {
      navigateTo({
        path: buildProductLanguagePath(
          `/${productGetters.getUrlPath(product.value)}_${productGetters.getItemId(product.value)}`,
        ),
        query: route.query,
        replace: true,
      });
    }
  },
);

watch(
  () => categoryTree.value,
  (categoriesTree) => {
    setProductCanonicalMetaData(product.value);
    const productCategoryId = productGetters.getParentCategoryId(product.value);
    if (categoriesTree.length > 0 && productCategoryId) {
      const categoryTree = categoriesTree.find(
        (categoryTree) => categoryTreeGetters.getId(categoryTree) === productCategoryId,
      );
      if (categoryTree) {
        setProductMetaData(product.value, categoryTree);
        setProductRobotsMetaData(product.value);
      }
    }
  },
  { immediate: true },
);

watch(
  () => route.params,
  () => {
    const productName = computed(() => productGetters.getName(product.value));
    const icon = 'sell';
    setPageMeta(productName.value, icon);
  },
  { immediate: true },
);

const observeRecommendedSection = () => {
  if (import.meta.client && recommendedSection.value) {
    const observer = new window.IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          showRecommended.value = true;
          observer.disconnect();
        }
      },
      {
        threshold: 0,
        rootMargin: '0px 0px 250px 0px',
      },
    );
    observer.observe(recommendedSection.value);
  }
};

onBeforeRouteLeave(() => {
  resetNotification();
});

onNuxtReady(() => observeRecommendedSection());
</script>
