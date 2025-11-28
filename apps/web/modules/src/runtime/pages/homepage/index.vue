<template>
  <div class="pergamon-startpage">
    <EditablePage :identifier="'index'" :type="'immutable'" />
  </div>
</template>

<script lang="ts" setup>
import type { Block } from '@plentymarkets/shop-api';
import homepageTemplateDataDe from '~/composables/useCategoryTemplate/homepageTemplateDataDe.json';
import homepageTemplateDataEn from '~/composables/useCategoryTemplate/homepageTemplateDataEn.json';

definePageMeta({
  pageType: 'static',
  isBlockified: true,
  type: 'immutable',
  identifier: 'index',
});

const useLocaleSpecificHomepageTemplate = (locale: string) =>
  locale === 'de' ? (homepageTemplateDataDe as Block[]) : (homepageTemplateDataEn as Block[]);

const { $i18n } = useNuxtApp();
const { t } = useI18n();

const { setPageMeta } = usePageMeta();
const route = useRoute();
const { setDefaultTemplate } = useCategoryTemplate(
  route?.meta?.identifier as string,
  route.meta.type as string,
  useNuxtApp().$i18n.locale.value,
);

const icon = 'home';
setPageMeta(t('homepage.title'), icon);

setDefaultTemplate(useLocaleSpecificHomepageTemplate($i18n.locale.value));

const { getRobots, setRobotForStaticPage } = useRobots();
getRobots();
setRobotForStaticPage('Homepage');

const { setBlocksListContext } = useBlockManager();
setBlocksListContext('content');
</script>

<style>
  .pergamon-header {
    position: absolute !important;
    top: 0;
  }
  .pergamon-startpage .swiper {
    max-height: none !important;
    height: 100vh;
  }
  .pergamon-startpage .swiper img{
    height: 100% !important;
  }
  .pergamon-startpage .swiper a {
    color: #fff;
    border-color: #fff;
    --tw-ring-color: #fff;
  }
  .pergamon-startpage .rating-comment {
    max-width: 80%;
    margin: 40px auto;
    font-size: 48px;
    line-height: 1.35;;
  }
  .pergamon-startpage .col-span-6, .pergamon-startpage .col-span-6 div {
    height: 100%;
  }
  .pergamon-startpage .col-span-6 .title {
    font-size: 60px;
    line-height: 1.2;
  }
  .pergamon-startpage .col-span-6 div[data-testid="image-block"] {
    height: 50rem !important;
  }
  .pergamon-startpage div[data-testid="block-wrapper"], .pergamon-startpage div[data-testid="multi-grid-structure"] {
    margin-right: 0 !important;
    margin-left: 0 !important;
    gap: 0 !important;
  }
  .pergamon-startpage .group.max-w-screen-3xl {
    max-width: 100% !important;
  }
  .readmore-container {
    position: relative;
    max-width: 100%;
  }

  /* Checkbox verstecken */
  .readmore-toggle {
    display: none;
  }

  /* Zweispaltiger Text */
  .two-columns {
    columns: 2;
    column-gap: 24px;
  }

  /* ------------------------- */
  /* GESCHLOSSENER ZUSTAND     */
  /* ------------------------- */

  /* etwa 4 Gesamt-Zeilen */
  .readmore-text {
    max-height: 18em; /* 4 Zeilen × ~1.6 line-height = ca. 6.5em */
    overflow: hidden;
    position: relative;
    line-height: 1.6; /* wichtig! */
  }

  /* weiches Fade-Out + Ellipse */
  .readmore-text::after {
    content: "...";
    position: absolute;
    bottom: 0;
    right: 5px;
    color: #000;
    height: 2em; /* Fade-Höhe */
    /*background: linear-gradient(to bottom, rgba(255,255,255,0), white 90%);*/
  }

  /* ------------------------- */
  /* OFFENER ZUSTAND           */
  /* ------------------------- */

  .readmore-toggle:checked ~ .readmore-text {
    max-height: none;
  }

  .readmore-toggle:checked ~ .readmore-text::after {
    display: none;
  }

  /* Button styling */
  .readmore-btn {
    display: inline-block;
    margin-top: 12px;
    color: #999999;
    cursor: pointer;
  }

  /* Buttontext anpassen */
  .readmore-toggle:checked ~ .readmore-btn::after {
    content: " (schließen)";
    font-weight: 400;
    font-size: 14px;
  }
</style>
