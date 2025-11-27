<template>
  <div>
    <UiHeader />
    <NarrowContainer v-if="breadcrumbs?.length" class="lg:max-w-full p-4 md:px-0 hidden md:block">
      <LazyUiBreadcrumbs :breadcrumbs="breadcrumbs" />
    </NarrowContainer>
    <main>
      <slot />
    </main>
    <Cookiebar />
    <PreviewMode />
    <ClientOnly>
      <UiFooter v-if="!route.meta.isBlockified" />
    </ClientOnly>
    <QuickCheckout v-if="isOpen" :product="product" />
  </div>
</template>

<script setup lang="ts">
import type { DefaultLayoutProps } from '~/layouts/types';

defineProps<DefaultLayoutProps>();

const { setLogoMeta } = useStructuredData();
const { isOpen, product } = useQuickCheckout();
// const viewport = useViewport();
const route = useRoute();

setLogoMeta();
</script>
