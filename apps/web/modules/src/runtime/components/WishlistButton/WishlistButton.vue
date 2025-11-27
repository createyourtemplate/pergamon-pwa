<template>
  <UiButton
    variant="tertiary"
    size="sm"
    :aria-label="
      isWishlistItem(variationId)
        ? t('removeProductFromWishlist', { label: productName })
        : t('addProductToWishlist', { label: productName })
    "
    :class="{ 'p-[0.25rem] !bg-transparent': !isCloseButton, '!bg-black bottom-0 !top-auto rounded-none': isCloseButton }"
    class="m-2 !ring-0"
    :disabled="wishlistLoading"
    data-testid="wishlist-trigger"
    @click="onWishlistClick"
  >
    <SfLoaderCircular v-if="actionLoading" class="flex justify-center items-center" size="sm" />
    <template v-else>
      <span v-if="isCloseButton" class="text-white text-xs"><SfIconClose size="xs" /> Entfernen</span>
      <SfIconFavoriteFilled v-else-if="isWishlistItem(variationId)" class="!text-[#D4372F]" size="sm" />
      <SfIconFavorite v-else size="sm" />
      <slot />
    </template>
  </UiButton>
</template>

<script setup lang="ts">
import type { WishlistButtonProps } from '~/components/WishlistButton/types';
import { SfIconFavorite, SfIconFavoriteFilled, SfLoaderCircular, SfIconClose } from '@storefront-ui/vue';
import { productGetters } from '@plentymarkets/shop-api';

const { product, quantity = 1, discard = false, variant = 'tertiary' } = defineProps<WishlistButtonProps>();

const { t } = useI18n();
const { isWishlistItem, interactWithWishlist, loading: wishlistLoading } = useWishlist();
const actionLoading = ref(false);

const productName = computed(() => productGetters.getName(product));
const variationId = computed(() => productGetters.getVariationId(product));
const isCloseButton = computed(() => isWishlistItem(variationId.value) && discard);
const onWishlistClick = async () => {
  actionLoading.value = true;
  await interactWithWishlist(variationId.value, quantity);
  actionLoading.value = false;
};
</script>
