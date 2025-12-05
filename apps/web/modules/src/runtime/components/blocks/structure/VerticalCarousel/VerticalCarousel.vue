<template>
  <NuxtErrorBoundary>
    <div class="h-dvh">
        <section
            v-for="(banner, slideIndex) in content"
            :id="`vartical-carousel-${index}`"
            :key="`carousel-section-${slideIndex}`"
            class="h-full"
        >
            <slot
            name="content"
            :content-block="banner"
            :index="getSlideAdjustedIndex(slideIndex)"
            :slide-index="slideIndex"
            :lazy-loading="slideIndex > 0 ? 'lazy' : 'eager'"
            />
        </section>
    </div>
  </NuxtErrorBoundary>
</template>

<script setup lang="ts">
import type { VerticalCarouselStructureProps } from './types';
const { activeSlideIndex } = useCarousel();
const { content, index, meta } = defineProps<VerticalCarouselStructureProps>();

const getSlideAdjustedIndex = (slideIndex: number) => {
  return activeSlideIndex.value[meta.uuid] === slideIndex ? index : index + slideIndex;
};
</script>