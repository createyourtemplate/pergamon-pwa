<template>
  <header class="relative w-full h-full z-40 md:sticky md:shadow-md">
    <div
      :style="{ backgroundColor: headerBackgroundColor }"
      class="flex justify-center items-center flex-wrap md:flex-nowrap px-4 md:px-10 py-3 md:py-5 w-full h-full border-0 border-neutral-200 md:h-20 md:z-10"
      data-testid="navbar-top"
    >
      <div class="pl-4 md:pl-0 lg:absolute top-0 inset-x-[calc(50%_-_90px)]">
        <NuxtLink
          :to="localePath(paths.home)"
          aria-label="Startseite"
          class="flex shrink-0 w-full h-8 lg:w-[180px] lg:h-[180px] items-center text-white focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm lg:-mt-1"
        >
          <NuxtImg v-if="viewport.isLessThan('lg')" src="https://cdn03.plentymarkets.com/lwd3v9wa9pf9/frontend/Pergamon/logo_sm.jpg" alt="Pergamon" />
          <NuxtImg v-else src="https://cdn03.plentymarkets.com/lwd3v9wa9pf9/frontend/Pergamon/logo_big.svg" width="180" height="180" alt="Pergamon" />
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { paths } from '~/utils/paths';
const { getSetting: getHeaderBackgroundColor } = useSiteSettings('headerBackgroundColor');
const headerBackgroundColor = computed(() => getHeaderBackgroundColor());

const localePath = useLocalePath();
const viewport = useViewport();
</script>
