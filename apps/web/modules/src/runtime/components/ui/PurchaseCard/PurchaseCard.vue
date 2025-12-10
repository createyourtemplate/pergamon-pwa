<template>
  <form
    class="md:rounded-md"
    :class="{ 'md:shadow-lg': configuration?.dropShadow, 'md:border md:border-neutral-100': configuration?.borders }"
    :style="inlineStyle"
    data-testid="purchase-card"
    @submit.prevent="handleAddToCart()"
  >
    <div class="relative">
      <div class="drift-zoom-image">
        <section class="mt-3 sm:mt-5 lg:mt-0 p-3 md:p-0">
          <template v-for="key in configuration?.fieldsOrder" :key="key">
            <template v-if="key === 'itemName' && configuration?.fields.itemName">
              <h1 class="typography-headline-4 break-word !font-[CormorantGaramond] mt-2 !text-2xl !lg:text-3xl" data-testid="product-name">
                {{ productGetters.getName(product) }}
              </h1>
            </template>
            <template v-if="key === 'price' && configuration?.fields.price">
              <div class="flex space-x-2 mt-4 lg:mt-2">
                <Price :price="priceWithProperties" :crossed-price="crossedPrice" />
                <div
                  v-if="(productBundleGetters?.getBundleDiscount(product) ?? 0) > 0 && showBundleComponents"
                  class="m-auto"
                >
                  <UiTag :size="'sm'" :variant="'secondary'">{{
                    t('procentageSavings', { percent: productBundleGetters.getBundleDiscount(product) })
                  }}</UiTag>
                </div>
              </div>
              <LowestPrice :product="product" />
              <BasePrice
                v-if="productGetters.showPricePerUnit(product)"
                :base-price="basePriceSingleValue"
                :unit-content="productGetters.getUnitContent(product)"
                :unit-name="productGetters.getUnitName(product)"
              />
            </template>
            <div v-if="key === 'price' && configuration?.fields.price" class="flex lg:block gap-1 mt-1 mb-6 lg:mb-10">
              <div class="typography-text-xs inline-block lg:flex gap-1">
                <span>{{ showNetPrices ? t('product.priceExclVAT') : t('product.priceInclVAT') }}</span>
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
              <template v-if="productGetters.getAvailabilityName(product)">
                <div class="inline-flex text-xs ml-auto lg:mt-1"><span>{{ t('product.delivery') }}</span>&nbsp;<span class="font-bold">{{ productGetters.getAvailabilityName(product) }}</span></div>
              </template>
            </div>
            <template v-if="key === 'tags' && configuration?.fields.tags">
              <UiBadges class="mb-2" :product="product" :use-availability="false" :use-tags="true" />
            </template>
            <template v-if="key === 'variationProperties' && configuration?.fields.variationProperties">
              <div class="variation-properties">
                <VariationProperties :product="product" />
              </div>
            </template>
            <div v-if="key === 'starRating'" class="flex items-center justify-between">
                <div class="inline-flex items-center mb-2">
                  <SfRating
                    size="xs"
                    :half-increment="true"
                    :value="reviewGetters.getAverageRating({
                      ratingsCountOf1: 0,
                      ratingsCountOf2: 0,
                      ratingsCountOf3: 0,
                      ratingsCountOf4: 0,
                      ratingsCountOf5: 0,
                      ratingsCountTotal: 0,
                      averageValue: averageRating + '',
                      highestCount: 0
                    }, 'half')"
                    :max="5"
                    class="!text-black leading-none [&>svg]:-ml-0.5"
                  />
                  <span class="text-sm font-bold ml-2 mr-0.5">{{ averageRating }} {{ t('product.reviews_of') }}</span>
                  <UiButton
                    v-if="Number(averageRating) > 0"
                    variant="tertiary"
                    class="text-sm !px-2 leading-none text-neutral-500 cursor-pointer"
                    data-testid="show-reviews"
                    @click="scrollToReviews"
                  >
                    <u>{{ totalReviews }} {{ t('product.reviews') }}</u>
                  </UiButton>
                </div>
                <div
                  class="inline-flex items-center mb-2"
                  :class="{ 'justify-center': configuration?.wishlistSize === 'large' }"
                >
                  <WishlistButton
                    :variant="configuration?.wishlistSize === 'small' ? 'tertiary' : 'secondary'"
                    :product="product"
                    :quantity="quantitySelectorValue"
                    :square="viewport.isLessThan('lg')"
                    class="!m-0"
                    :class="{
                      'mr-2 bg-white': viewport.isLessThan('lg'),
                      'w-full': configuration?.wishlistSize === 'large',
                      '!p-0 hover:bg-transparent active:bg-transparent': configuration?.wishlistSize === 'small',
                    }"
                  />
                  <ItemShare :name="productGetters.getName(product)" class="ml-2" />
                </div>
            </div>
            <template v-if="key === 'previewText' && configuration?.fields.previewText">
              <div
                v-if="productGetters.getShortDescription(product).length > 0"
                class="mb-4 font-normal typography-text-sm whitespace-pre-line break-words"
                data-testid="product-description"
                v-html="productGetters.getShortDescription(product)"
              />
            </template>

            <template v-if="key === 'attributes' && configuration?.fields.attributes">
              <ProductAttributes :product="product" />
            </template>

            <template v-if="key === 'itemBundle'">
              <BundleOrderItems v-if="product.bundleComponents && showBundleComponents" :product="product" />
            </template>
            <template v-if="key === 'orderProperties' && configuration?.fields.orderProperties">
              <OrderProperties :product="product" />
            </template>
            <template v-if="key === 'graduatedPrices' && configuration?.fields.graduatedPrices">
              <GraduatedPriceList :product="product" :count="quantitySelectorValue" />
            </template>

            <template v-if="key === 'quantityAndAddToCart' && configuration?.fields.quantityAndAddToCart">
              <UnitContentSelect
                v-if="product && productGetters.possibleUnitCombination(product).length > 1"
                :product="product"
              />
              <div class="mt-4">
                <div class="flex flex-col md:flex-row flex-wrap gap-4">
                  <UiQuantitySelector
                    :min-value="productGetters.getMinimumOrderQuantity(product)"
                    :value="quantitySelectorValue"
                    class="min-w-[145px] flex-grow-0 flex-shrink-0 basis-0 hidden"
                    @change-quantity="changeQuantity"
                  />
                  <SfTooltip
                    show-arrow
                    placement="top"
                    :label="isNotValidVariation || isSalableText"
                    class="flex-grow-[2] flex-shrink basis-auto whitespace-nowrap"
                  >
                    <UiButton
                      type="submit"
                      data-testid="add-to-cart"
                      size="lg"
                      class="w-full h-full rounded-none"
                      :disabled="loading || !productGetters.isSalable(product)"
                    >
                      <template #prefix>
                        <div v-if="!loading" class="flex row items-center font-normal">
                          {{ t('common.actions.addToCart') }}
                          <NuxtImg :src="cartIcon" class="invert ml-2" width="17" height="15" alt="shopping cart" />
                        </div>
                        <div v-else>
                          <SfLoaderCircular size="sm" />
                        </div>
                      </template>
                    </UiButton>
                  </SfTooltip>
                </div>

                <template v-if="showPayPalButtons">
                  <PayPalExpressButton
                    type="SingleItem"
                    location="itemPage"
                    class="mt-4"
                    @validation-callback="paypalHandleAddToCart"
                  />
                  <PayPalPayLaterBanner
                    placement="product"
                    location="itemPage"
                    :amount="priceWithProperties * quantitySelectorValue"
                  />
                </template>
              </div>
            </template>

            <template v-if="key === 'itemText' && configuration?.fields.itemText">
              <div
                v-if="productGetters.getDescription(product)"
                class="mb-4 font-normal typography-text-sm whitespace-pre-line break-words no-preflight"
                data-testid="product-description"
                v-html="productGetters.getDescription(product)"
              />
            </template>
            <template v-if="key === 'technicalData' && configuration?.fields.technicalData">
              <div
                v-if="productGetters.getTechnicalData(product)"
                class="mb-4 font-normal typography-text-sm whitespace-pre-line break-words no-preflight"
                data-testid="product-description"
                v-html="productGetters.getTechnicalData(product)"
              />
            </template>
          </template>
        </section>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { productGetters, reviewGetters, productBundleGetters } from '@plentymarkets/shop-api';
import { SfRating, SfLoaderCircular, SfTooltip, SfLink } from '@storefront-ui/vue';
import type { PriceCardPadding, PurchaseCardProps } from '~/components/ui/PurchaseCard/types';
import type { PayPalAddToCartCallback } from '~/components/PayPal/types';
import { paths } from '~/utils/paths';
import cartIcon from 'assets/icons/custom_paths/cart.svg';

const props = withDefaults(defineProps<PurchaseCardProps>(), {
  configuration: () => ({
    fields: {
      itemName: true,
      price: true,
      availability: true,
      tags: true,
      starRating: true,
      orderProperties: true,
      variationProperties: true,
      previewText: false,
      attributes: true,
      itemBundle: false,
      graduatedPrices: true,
      addToWishlist: true,
      quantityAndAddToCart: true,
      itemText: false,
      technicalData: false,
    },
    fieldsOrder: [
      'starRating',
      'addToWishlist',
      'itemName',
      'price',
      'tags',
      'availability',
      'variationProperties',
      'orderProperties',
      'previewText',
      'attributes',
      'itemBundle',
      'graduatedPrices',
      'quantityAndAddToCart',
      'itemText',
      'technicalData',
    ],
    fieldsDisabled: ['quantityAndAddToCart', 'price', 'itemBundle', 'attributes'],
    wishlistSize: 'small',

    dropShadow: false,
    borders: false,
    borderColor: '#EFF4F1',
    layout: {
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 0,
      paddingLeft: 0,
    },
  }),
});

const productId = productGetters.getId(props?.product);

const { totalReviews, averageRating  } = useEkomiProductReviews(productGetters.getItemId(props?.product));

const { getSetting } = useSiteSettings('dontSplitItemBundle');
const showBundleComponents = computed(() => {
  return getSetting() !== '1';
});

const { showNetPrices } = useCart();
const viewport = useViewport();
const { getCombination } = useProductAttributes();
const { getPropertiesForCart, getPropertiesPrice } = useProductOrderProperties();
const { validateAllFields, invalidFields, resetInvalidFields } = useValidatorAggregator('properties');
const {
  validateAllFields: validateAllFieldsAttributes,
  invalidFields: invalidAttributeFields,
  resetInvalidFields: resetAttributeFields,
} = useValidatorAggregator('attributes');
const { clear, send } = useNotification();
const { addToCart, loading } = useCart();
const { t } = useI18n();
const quantitySelectorValue = ref(productGetters.getMinimumOrderQuantity(props?.product));
const { isWishlistItem } = useWishlist();
const { openQuickCheckout } = useQuickCheckout();
const { crossedPrice } = useProductPrice(props?.product);
const { reviewArea } = useProductReviews(Number(productId));
const localePath = useLocalePath();

const inlineStyle = computed(() => {
  const layout = props?.configuration?.layout || ({} as PriceCardPadding);

  return {
    paddingTop: layout.paddingTop ? `${layout.paddingTop}px` : 0,
    paddingBottom: layout.paddingBottom ? `${layout.paddingBottom}px` : 0,
    paddingLeft: layout.paddingLeft ? `${layout.paddingLeft}px` : 0,
    paddingRight: layout.paddingRight ? `${layout.paddingRight}px` : 0,
    borderColor: props?.configuration?.borderColor || 'transparent',
  };
});

onMounted(() => {
  resetInvalidFields();
  resetAttributeFields();
});

onBeforeRouteLeave(() => {
  if (invalidFields.value.length > 0 || invalidAttributeFields.value.length > 0) clear();
  resetInvalidFields();
  resetAttributeFields();
});

const priceWithProperties = computed(
  () =>
    (productGetters.getSpecialOffer(props?.product) ||
      productGetters.getGraduatedPriceByQuantity(props?.product, quantitySelectorValue.value)?.unitPrice.value ||
      productGetters.getPrice(props?.product) ||
      0) + getPropertiesPrice(props?.product),
);

const basePriceSingleValue = computed(
  () =>
    productGetters.getGraduatedPriceByQuantity(props?.product, quantitySelectorValue.value)?.basePrice ??
    productGetters.getDefaultBasePrice(props?.product),
);

const handleValidationErrors = (): boolean => {
  send({
    message: [
      t('errorMessages.missingOrWrongProperties'),
      '',
      ...invalidAttributeFields.value.map((field) => field.name),
      ...invalidFields.value.map((field) => field.name),
      '',
      t('errorMessages.pleaseFillOutAllFields'),
    ],
    type: 'negative',
  });

  return false;
};

const handleAddToCart = async (quickCheckout = true) => {
  await validateAllFieldsAttributes();
  await validateAllFields();

  if (invalidFields.value.length > 0 || invalidAttributeFields.value.length > 0) {
    return handleValidationErrors();
  }

  if (!getCombination()) {
    send({ message: t('product.attributes.notValidVariation'), type: 'negative' });
    return false;
  }

  const addedToCart = await addToCart({
    productId: Number(productId),
    quantity: Number(quantitySelectorValue.value),
    basketItemOrderParams: getPropertiesForCart(),
  });

  if (addedToCart) {
    quickCheckout
      ? openQuickCheckout(props?.product, quantitySelectorValue.value)
      : send({ message: t('common.actions.addedToCart'), type: 'positive' });

    if (getSetting() === '0') {
      send({ message: t('error.notificationsItemBundleSplitted'), type: 'warning' });
    }
  }

  return addedToCart;
};

const paypalHandleAddToCart = async (callback: PayPalAddToCartCallback) => {
  const added = await handleAddToCart(false);

  callback(added);
};

const changeQuantity = (quantity: string) => {
  quantitySelectorValue.value = Number(quantity);
};

const isSalableText = computed(() => (productGetters.isSalable(props?.product) ? '' : t('itemNotAvailable')));
const isNotValidVariation = computed(() => (getCombination() ? '' : t('product.attributes.notValidVariation')));
const showPayPalButtons = computed(() => Boolean(getCombination()) && productGetters.isSalable(props?.product));

const scrollToReviews = () => {
  if (reviewArea.value) {
    reviewArea.value.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>
