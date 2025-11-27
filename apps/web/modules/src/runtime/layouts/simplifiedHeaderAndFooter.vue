<template>
  <div>
    <UiSimplifiedHeader />
    <main>
      <slot />
    </main>
    <NuxtLazyHydrate when-idle>
      <Cookiebar />
      <PreviewMode />
    </NuxtLazyHydrate>
    <ClientOnly>
      <UiFooter v-if="!route.meta.isBlockified" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

usePageTitle();
useStructuredData().setLogoMeta();
</script>
