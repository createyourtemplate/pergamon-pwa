<template>
  <NuxtErrorBoundary>
    <Swiper
      :id="`carousel-${index}`"
      :key="content.length"
      :modules="enableModules ? [Pagination] : []"
      :slides-per-view="1"
      v-bind="carouselProps"
      :aria-roledescription="t('homepage.banner.ariaRoleDescriptionCarousel')"
      :aria-label="t('homepage.banner.ariaRoleDescriptionCarousel')"
      :loop="true"
      :pagination="paginationConfig"
      class="!z-0 !w-full h-dvh"
      @swiper="onSwiperInit"
      @slide-change="onSlideChange"
    >
      <SwiperSlide
        v-for="(banner, slideIndex) in content"
        :key="slideIndex"
        :aria-labelledby="content.length > 1 ? `carousel_item-${slideIndex}_heading` : null"
        :aria-label="
          content.length > 1
            ? t('homepage.banner.ariaLabelSlidePosition', { current: slideIndex + 1, total: content.length })
            : null
        "
        v-bind="carouselProps"
        :aria-roledescription="t('homepage.banner.ariaRoleDescriptionSlide')"
      >
        <slot
          name="content"
          :content-block="banner"
          :index="getSlideAdjustedIndex(slideIndex)"
          :slide-index="slideIndex"
          :lazy-loading="slideIndex > 0 ? 'lazy' : 'eager'"
        />
      </SwiperSlide>
      <div
        v-if="enableModules"
        :class="`swiper-pagination swiper-pagination-${index} swiper-pagination-bullets swiper-pagination-horizontal`"
      />
    </Swiper>
  </NuxtErrorBoundary>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import type { VerticalCarouselStructureProps } from './types';
import type { Swiper as SwiperType } from 'swiper';
const { t } = useI18n();
const { activeSlideIndex, setIndex } = useCarousel();
const { content, index, meta } = defineProps<VerticalCarouselStructureProps>();
const isInternalChange = ref(false);

const paginationConfig = computed(() => {
  return enableModules.value
    ? {
        el: `.swiper-pagination-${index}`,
        clickable: true,
        bulletActiveClass: 'swiper-pagination-bullet-active !bg-primary-500',
        renderBullet(index: number, className: string) {
          return `<span key="dot-${index}" class="${className}"></span>`;
        },
      }
    : false;
});

const enableModules = computed(() => content.length > 1);
let slider: SwiperType | null = null;

const carouselProps = computed(() => {
  return content.length > 1 ? { role: 'group' } : {};
});

const onSwiperInit = async (swiper: SwiperType) => {
  slider = swiper;

  if (activeSlideIndex.value[meta.uuid] === null) {
    setIndex(meta.uuid, swiper.realIndex);
  }
};

const reinitializeSwiper = async () => {
  if (!slider || slider.destroyed) return;

  await nextTick();

  slider.update();

  if (slider.params.pagination && slider.pagination) {
    slider.pagination.destroy();
    slider.pagination.init();
    slider.pagination.update();
  }
};
const onSlideChange = async (swiper: SwiperType) => {
  const realIndex = swiper.realIndex;
  if (isInternalChange.value) {
    isInternalChange.value = false;
    return;
  }

  if (realIndex !== activeSlideIndex.value[meta.uuid]) {
    setIndex(meta.uuid, realIndex);
  }
};

const getSlideAdjustedIndex = (slideIndex: number) => {
  return activeSlideIndex.value[meta.uuid] === slideIndex ? index : index + slideIndex;
};

watch(
  () => activeSlideIndex.value[meta.uuid],
  (newIndex) => {
    if (!slider || slider.destroyed) return;

    if (slider.realIndex !== newIndex) {
      isInternalChange.value = true;
      if (slider.params.loop) {
        slider.slideToLoop(newIndex ?? 0);
      } else {
        slider.slideTo(newIndex ?? 0);
      }
    }
  },
  { flush: 'post' },
);
watch(
  () => content.length,
  async (newLength, oldLength) => {
    if (oldLength <= 1 && newLength > 1) {
      await reinitializeSwiper();
    }
  },
);
</script>

<style src="./styles/navigation.min.css"></style>
<style src="./styles/pagination.min.css"></style>
<style src="./styles/swiper.min.css"></style>