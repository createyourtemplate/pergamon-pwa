<template>
  <UiNavbarTop />
  <main>
    <NarrowContainer>
      <slot />
    </NarrowContainer>
  </main>
  <ClientOnly>
    <UiFooter v-if="!route.meta.isBlockified" />
  </ClientOnly>
</template>
<script setup lang="ts">

const route = useRoute();
</script>
