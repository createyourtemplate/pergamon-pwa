<template>
  <div class="flex items-center w-full py-1">
    <div class="mr-3 font-bold leading-none text-lg lg:text-2xl" data-testid="price">
      <span>{{ format(price) }}</span>
    </div>
    <div v-if="crossedPrice && differentPrices" class="font-normal leading-none text-red-500 line-through text-lg lg:text-2xl">
      {{ format(crossedPrice) }}
    </div>
    <div v-if="crossedPrice && differentPrices" class="ml-auto leading-none font-normal text-white bg-red-500 px-2 py-1.5 lg:text-lg">
      {{ Math.round(100 - crossedPrice/(price/100)) }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PriceProps } from '~/components/Price/types';

const props = defineProps<PriceProps>();

const { format } = usePriceFormatter();
const { t } = useI18n();

const differentPrices = computed(() => {
  return props.crossedPrice
    ? Math.round(props.price * 100) / 100 !== Math.round(props.crossedPrice * 100) / 100
    : false;
});
</script>
