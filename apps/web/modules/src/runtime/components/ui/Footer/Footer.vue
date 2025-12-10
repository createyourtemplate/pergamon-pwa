<template>
  <footer data-testid="footer" class="bg-[#F7F7F7]">
    <div class="max-w-screen-3xl mx-auto pt-[30px] pb-[40px] px-[30px]">
      <div class="md:grid md:grid-cols-[1fr_auto] xl:gap-[50px] mb-10">
        <div class="md:flex gap-[20px] lg:gap-[40px] xl:gap-[65px]">
          <div v-for="{ label, subcategories } in categories" :key="label" class="[&>[data-collapse=true]+.collapse-footer-col]:h-auto [&>[data-collapse=true]>.open-m]:hidden [&>[data-collapse=true]>.close-m]:block">
            <div :id="label.trim()" class="flex justify-between items-center mb-3 md:mb-5" data-collapse="false" @click="toggleCollapse(label.trim())"> 
              <span class="font-[CormorantGaramond] text-xl lg:text-2xl whitespace-nowrap">{{ label }}</span>
              <SfIconAdd class="open-m md:hidden" />
              <SfIconRemove class="close-m hidden md:!hidden" />
            </div>
            <div class="collapse-footer-col h-0 md:h-auto overflow-hidden transform transition-[height] linear duration-500">
              <ul class="flex flex-col">
                <SfListItem
                  v-for="{ subcategoryLabel, link } in subcategories"
                  :key="subcategoryLabel"
                  class="!px-0 !pb-3 !pt-0 !w-auto"
                >
                  <SfLink
                    :tag="NuxtLink"
                    class="text-[14px] router-link-active router-link-exact-active no-underline hover:underline active:underline"
                    :to="localePath(link)"
                  >
                    {{ subcategoryLabel }}
                  </SfLink>
                </SfListItem>
              </ul>
            </div>
          </div>
        </div>
        <div class="text-center md:text-right">
          <div class="hidden md:block">
            <span class="font-[CormorantGaramond] text-lg lg:text-2xl whitespace-nowrap">{{ t('footer.heading.trustAndBuy') }}</span>
          </div>
          <div>
            <div class="text-2xl md:text-sm inline-flex items-center mt-5 mb-[15px] gap-1">
              <div class="font-bold">4.98</div>
              <div class="leading-none">
                <SfRating
                  v-if="viewport.isGreaterOrEquals('md')"
                  class="!text-black"
                  size="sm"
                  :half-increment="true"
                  :value="4.8"
                  :max="5"
                />
                <SfRating
                  v-if="viewport.isLessThan('md')"
                  class="!text-black"
                  size="lg"
                  :half-increment="true"
                  :value="4.8"
                  :max="5"
                />
              </div>
            </div>
            <div class="text-md md:text-sm">
              <p>
                2.406 Bewertungen (letzte 12 Mon.)
              </p>
              <p class="font-bold">
                15.262 Bewertungen (gesamt)
              </p>
              <p class="mt-[10px] md:mt-[15px] text-[10px]">
                Stand: 21.05.2024
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap align-top justify-between">
        <div class="flex gap-2 order-3 md:order-1 mx-auto md:mx-0 mt-7 md:mt-0">
          <a href="#" aria-label="Facebook" class="w-10 h-10 text-white bg-black flex items-center justify-center"><SfIconFacebook /></a>
          <a href="#" aria-label="Twitter" class="w-10 h-10 text-white bg-black flex items-center justify-center"><XIcon /></a>
          <a href="#" aria-label="Instagram" class="w-10 h-10 text-white bg-black flex items-center justify-center"><SfIconInstagram /></a>
        </div>

        <div class="flex flex-wrap justify-center mx-auto md:mx-0 gap-2 order-1 md:order-2">
          <div class="w-[60px] h-10 bg-white flex items-center justify-center bg-black">1</div>
          <div class="w-[60px] h-10 bg-white flex items-center justify-center bg-black">2</div>
          <div class="w-[60px] h-10 bg-white flex items-center justify-center bg-black">3</div>
          <div class="w-[60px] h-10 bg-white flex items-center justify-center bg-black">4</div>
        </div>

        <div class="w-full order-2 md:order-3 copy text-center text-[12px] 2xl:text-left xl:flex 2xl:flex-wrap mt-10">
          <p><sup>*</sup>{{ t('footer.copyRight.1') }}</p>
          <p><sup>**</sup>{{ t('footer.copyRight.2') }}</p>
          <p class="md:pt-[10px] xl:pt-[0] xl:ml-auto">{{ companyName }} / Alle Rechte vorbehalten / <a href="https://www.createyourtemplate.com" target="_blank" title="Lösungen für den eCommerce - Online Shops, eBay Shops und Templates, Widgets, Design, Programmierung, Fullservice, Branding - createyourtemplate GmbH &amp; Co. KG - Berlin, Germany">powered by <strong>createyourtemplate</strong></a></p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { SfLink, SfListItem, SfRating, SfIconAdd, SfIconRemove, SfIconFacebook, SfIconInstagram } from '@storefront-ui/vue';
import XIcon from '../Icons/XIcon.vue';
const viewport = useViewport();
const localePath = useLocalePath();
const NuxtLink = resolveComponent('NuxtLink');

const storename: string = useRuntimeConfig().public.storename;
const companyName: string = `© ${new Date().getFullYear()} ${storename.toUpperCase()}`;

const categories = [
  {
    label: t('footer.heading.myAccount'),
    subcategories: [
      {
        subcategoryLabel: t('footer.login'),
        link: localePath(paths.authLogin),
      },
      {
        subcategoryLabel: t('footer.register'),
        link: localePath(paths.authLogin),
      },
      {
        subcategoryLabel: t('footer.cart'),
        link: localePath(paths.cart),
      }
    ],
  },
  {
    label: t('footer.heading.info'),
    subcategories: [
      {
        subcategoryLabel: t('footer.aboutUs'),
        link: '#',
      },
      {
        subcategoryLabel: t('footer.shippingInformation'),
        link: '#',
      },
      {
        subcategoryLabel: t('footer.paymentInformation'),
        link: '#',
      },
      {
        subcategoryLabel: t('footer.returns'),
        link: '#',
      },
    ],
  },
  {
    label: t('footer.heading.legal'),
    subcategories: [
      {
        subcategoryLabel: t('footer.cancellationRights'),
        link: localePath(paths.cancellationRights),
      },
      {
        subcategoryLabel: t('footer.legalDisclosure'),
        link: localePath(paths.legalDisclosure),
      },
      {
        subcategoryLabel: t('footer.privacyPolicy'),
        link: localePath(paths.privacyPolicy),
      },
      {
        subcategoryLabel: t('footer.termsAndConditions'),
        link: localePath(paths.termsAndConditions),
      },
    ],
  }
];

function toggleCollapse(label: string) {
  const element = document.getElementById(label);
  if (element) {
    const isCollapsed = element.getAttribute('data-collapse') === 'true';
    element.setAttribute('data-collapse', String(!isCollapsed));
  }
}
</script>
