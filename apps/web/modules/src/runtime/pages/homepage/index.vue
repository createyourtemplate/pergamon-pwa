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
  .pergamon-startpage .rating-comment {
    max-width: 1500px;
    margin: 20px auto;
    font-size: 18px;
    line-height: 1.35;

    @media screen and (min-width: 762px) {
      font-size: 30px;
    }

    @media screen and (min-width: 992px) {
      font-size: 48px;
      margin: 40px auto;
    }
  }
  .pergamon-startpage .col-span-6, .pergamon-startpage .col-span-6 div {
    height: 100%;
  }
  .pergamon-startpage .col-span-6 .title {
    font-size: 36px;
    line-height: 1.2;

    @media screen and (min-width: 762px) {
      font-size: 45px;
    }

    @media screen and (min-width: 992px) {
      font-size: 60px;
    }
  }
  .pergamon-startpage .col-span-6 div[data-testid="image-block"] {
    @media screen and (min-width: 992px) {
      height: 50rem !important;
    }
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
  .readmore-toggle {
    display: none;
  }
  .two-columns {
    @media screen and (min-width: 768px) {
      columns: 2;
      column-gap: 24px;
    }
  }
  .readmore-text {
    max-height: 18em; /* 4 Zeilen × ~1.6 line-height = ca. 6.5em */
    overflow: hidden;
    position: relative;
    line-height: 1.6; /* wichtig! */
    text-align: justify;
  }
  .readmore-text::after {
    content: "...";
    position: absolute;
    bottom: 0;
    right: 5px;
    color: #000;
    height: 2em; /* Fade-Höhe */
  }
  .readmore-toggle:checked ~ .readmore-text {
    max-height: none;
  }
  .readmore-toggle:checked ~ .readmore-text::after {
    display: none;
  }
  .readmore-btn {
    display: inline-block;
    margin-top: 12px;
    color: #999999;
    cursor: pointer;
  }
  .readmore-toggle:checked ~ .readmore-btn::after {
    content: " (schließen)";
    font-weight: 400;
    font-size: 14px;
  }
</style>
