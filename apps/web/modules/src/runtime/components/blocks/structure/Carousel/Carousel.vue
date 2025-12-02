<template>
  <NuxtErrorBoundary>
    <Swiper
      :id="`carousel-${index}`"
      :key="content.length"
      :modules="enableModules ? [Pagination, Navigation] : []"
      v-bind="carouselProps"
      :aria-roledescription="t('homepage.banner.ariaRoleDescriptionCarousel')"
      :aria-label="t('homepage.banner.ariaRoleDescriptionCarousel')"
      :loop="false"
      :direction="'vertical'"
      :pagination="paginationConfig"
      :navigation="navigationConfig"
      class="!z-0 full-height"
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
          :lazy-loading="'eager'"
        />
      </SwiperSlide>
      <div
        v-if="enableModules"
        :class="`swiper-pagination swiper-pagination-${index} swiper-pagination-bullets swiper-pagination-vertical`"
      />
    </Swiper>
  </NuxtErrorBoundary>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper/modules';
import type { CarouselStructureProps } from './types';
import type { Swiper as SwiperType } from 'swiper';
const { t } = useI18n();
const { activeSlideIndex, setIndex } = useCarousel();
const { content, index, configuration, meta } = defineProps<CarouselStructureProps>();
const isInternalChange = ref(false);

const handleArrows = () => {
  const viewport = useViewport();
  return !viewport.isLessThan('md');
};

const enableModules = computed(() => content.length > 1);
let slider: SwiperType | null = null;

const paginationConfig = computed(() => {
  return enableModules.value && configuration.controls.color
    ? {
        el: `.swiper-pagination-${index}`,
        clickable: true,
        bulletActiveClass: 'swiper-pagination-bullet-active !bg-primary-500',
        renderBullet(index: number, className: string) {
          return `<span key="dot-${index}" class="${className}" style="background-color: ${configuration.controls.color}!important;"></span>`;
        },
      }
    : false;
});

const navigationConfig = computed(() => {
  return enableModules.value
    ? {
        nextEl: `.swiper-button-next-${index}`,
        prevEl: `.swiper-button-prev-${index}`,
      }
    : false;
});

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

  if (slider.params.navigation && slider.navigation) {
    slider.navigation.destroy();
    slider.navigation.init();
    slider.navigation.update();
  }

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
watch(
  () => configuration.controls.color,
  (newColor, oldColor) => {
    if (slider && !slider.destroyed && newColor !== oldColor) {
      slider.pagination.render();
      slider.pagination.update();
    }
  },
);
</script>

<style src="./styles/navigation.min.css"></style>
<style src="./styles/pagination-full.min.css"></style>
<style src="./styles/swiper.min.css"></style>
<style>
  .full-height {
    max-height: none !important;
    height: 100vh;
  }
  .full-height div {
    height: 100%;
  }
  .full-height div[data-testid*="banner-content-"],
  .full-height div[data-testid*="banner-content-"] div {
    height: unset !important;
  }
  .full-height img{
    height: 100% !important;
  }
  .swiper a {
    color: #fff;
    border-color: #fff;
    --tw-ring-color: #fff;
  }
  .swiper-pagination-vertical {
    height: auto !important;
    right: 15px !important;
    bottom:  0 !important;
    top: 75% !important;
    transform: translate3d(0px, 0%, 0) !important;
  }
  .swiper-pagination-vertical .swiper-pagination-bullet {
    height: 40px;
    border-radius: 0;
  }
  .swiper-pagination-vertical .swiper-pagination-bullet:not(.swiper-pagination-bullet-active) {
    opacity: 0.4;
  }
</style>
