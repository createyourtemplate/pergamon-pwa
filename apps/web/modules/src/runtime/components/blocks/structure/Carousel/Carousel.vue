<template>
  <NuxtErrorBoundary>
    <Swiper
      :id="`carousel-${index}`"
      :key="content.length"
      :direction="'vertical'"
      :modules="enableModules ? [Pagination, Mousewheel] : []"
      :slides-per-view="1"
      v-bind="carouselProps"
      :aria-roledescription="t('homepage.banner.ariaRoleDescriptionCarousel')"
      :aria-label="t('homepage.banner.ariaRoleDescriptionCarousel')"
      :loop="false"
      :pagination="paginationConfig"
      :mousewheel="mouseWheelConfig"
      :allow-touch-move="true"
      class="!z-0 full-height"
      @swiper="onSwiperInit"
      @slide-change="onSlideChange"
      @scroll="onScroll"
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
          class="[&>img]:!h-full"
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
import { Mousewheel, Pagination } from 'swiper/modules';
import type { CarouselStructureProps } from './types';
import type { Swiper as SwiperType } from 'swiper';
const { t } = useI18n();
const { activeSlideIndex, setIndex } = useCarousel();
const { content, index, configuration, meta } = defineProps<CarouselStructureProps>();
const isInternalChange = ref(false);

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

const mouseWheelConfig = computed(() => {
  return {
    enabled: true,
    releaseOnEdges: true,
    forcedAxis: true,
    thresholdTime: 500
  };
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

const onScroll = async (swiper: SwiperType, e: WheelEvent) => {
  // eslint-disable-next-line no-console
  console.log(swiper.isEnd, window.screenY, e.deltaY);
  if (swiper.isEnd && e.deltaY > 0) {
    // eslint-disable-next-line no-console
    console.log(swiper.isEnd, window.screenY, e.deltaY);
    window.scroll({ left: 0, top: window.screenY + e.deltaY, behavior: 'smooth' });
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

  if (slider.params.mousewheel && slider.mousewheel) {
    slider.mousewheel.disable();
    slider.mousewheel.enable();
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
<style src="./styles/pagination.min.css"></style>
<style src="./styles/swiper.min.css"></style>
<style>
  .full-height {
    max-height: none !important;
    height: 100dvh;
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
    top: 2% !important;
    transform: translate3d(0px, 0%, 0) !important;

    @media screen and (min-width: 762px) {
      top: 80% !important;
    }
  }
  .swiper-pagination-vertical .swiper-pagination-bullet {
    width: 4px;
    height: 40px;
    border-radius: 0;

    @media screen and (min-width: 762px) {
      width: 6px;
    }
  }
  .swiper-pagination-vertical .swiper-pagination-bullet:not(.swiper-pagination-bullet-active) {
    opacity: 0.4;
  }
</style>