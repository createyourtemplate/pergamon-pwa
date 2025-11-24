<template>
  <footer data-testid="footer" class="bg-[#F7F7F7]">
    <div class="max-w-7xl mx-auto pt-[30px] pb-[40px] px-[30px]">
      <div class="lg:grid lg:grid-cols-[1fr_auto] xl:gap-[50px] mb-10">
        <div class="md:flex md:gap-[40px] xl:gap-[65px]">
          <div v-for="{ label, subcategories } in categories" :key="label" class="[&>[data-collapse=true]+.collapse-footer-col]:h-auto [&>[data-collapse=true]>.open-m]:hidden [&>[data-collapse=true]>.close-m]:block">
            <div :id="label.trim()" class="flex justify-between items-center mb-3 md:mb-5" data-collapse="false" @click="toggleCollapse(label.trim())"> 
              <span class="font-[CormorantGaramond] text-2xl font-semibold whitespace-nowrap">{{ label }}</span>
              <SfIconAdd class="open-m md:hidden" />
              <SfIconRemove class="close-m hidden" />
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
            <span class="font-[CormorantGaramond] text-2xl font-semibold whitespace-nowrap">{{ t('footer.heading.trustAndBuy') }}</span>
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
          <a href="#" class="w-10 h-10 text-white bg-black flex items-center justify-center"><SfIconFacebook /></a>
          <a href="#" class="w-10 h-10 text-white bg-black flex items-center justify-center"><SfIconTwitter /></a>
          <a href="#" class="w-10 h-10 text-white bg-black flex items-center justify-center"><SfIconInstagram /></a>
        </div>

        <div class="flex gap-2 order-1 md-order-2">
          <div class="w-[60px] h-10 bg-white flex items-center justify-center bg-black">1</div>
          <div class="w-[60px] h-10 bg-white flex items-center justify-center bg-black">2</div>
          <div class="w-[60px] h-10 bg-white flex items-center justify-center bg-black">3</div>
          <div class="w-[60px] h-10 bg-white flex items-center justify-center bg-black">4</div>
          <div class="w-[60px] h-10 bg-white flex items-center justify-center bg-black">5</div>
          <div class="w-[60px] h-10 bg-white flex items-center justify-center bg-black">6</div>
          <div class="w-[60px] h-10 bg-white flex items-center justify-center bg-black">7</div>
          <div class="w-[60px] h-10 bg-white flex items-center justify-center bg-black">8</div>
        </div>

        <div class="w-full order-2 md-order-3 copy text-center  text-[12px] 2xl:text-left xl:flex 2xl:flex-wrap mt-10">
          <p><sup>*</sup>{{ t('footer.copyRight.1') }}</p>
          <p><sup>**</sup>{{ t('footer.copyRight.2') }}</p>
          <p class="md:pt-[10px] xl:pt-[0] xl:ml-auto">{{ companyName }} / Alle Rechte vorbehalten / <a href="https://www.createyourtemplate.com" target="_blank" title="Lösungen für den eCommerce - Online Shops, eBay Shops und Templates, Widgets, Design, Programmierung, Fullservice, Branding - createyourtemplate GmbH &amp; Co. KG - Berlin, Germany">powered by <strong>createyourtemplate</strong></a></p>
        </div>
      </div>
    </div>

    <span v-if="isDev" class="bg-black text-white flex items-center justify-center fixed right-2 bottom-2 rounded-[50%] w-[30px] h-[30px] px-2 py-1 border border-neutral-200 z-[1000] font-bold text-xs">
      <span class="xs:hidden">XXS</span>
      <span class="hidden xs:block sm:hidden">XS</span>
      <span class="hidden sm:block md:hidden">SM</span>
      <span class="hidden md:block lg:hidden">MD</span>
      <span class="hidden lg:block xl:hidden">LG</span>
      <span class="hidden xl:block 2xl:hidden">XL</span>
      <span class="hidden 2xl:block 3xl:hidden">2XL</span>
      <span class="hidden 3xl:block 4xl:hidden">3XL</span>
      <span class="hidden 4xl:block">4XL</span>
    </span>
  </footer>
</template>

<script setup lang="ts">
import { SfLink, SfListItem, SfRating, SfIconAdd, SfIconRemove, SfIconFacebook, SfIconInstagram, SfIconTwitter } from '@storefront-ui/vue';
const viewport = useViewport();
const { t } = useI18n();
const localePath = useLocalePath();
const NuxtLink = resolveComponent('NuxtLink');

const storename: string = useRuntimeConfig().public.storename;
const companyName: string = `© ${new Date().getFullYear()} ${storename.toUpperCase()}`;

const isDev: boolean = useRuntimeConfig().public.isDev;

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

<!-- <style scoped>
.links {
  & ul {
    height: 0;
    transition: height 0.3s ease-in-out;
    margin: 0;
    padding: 0;
    overflow: hidden;
    opacity: 0;

    @media (min-width: 1280px) {
      height: auto;
      min-height: 0;
      opacity: 1;

      overflow: auto;
      padding-top: 15px;
    }

    > li {
      &:last-child {
        padding-bottom: 20px;

        @media (min-width: 1280px) {
          padding-bottom: 0;
        }
      }
    }
  }

  label {
    &::after {
      content: "";
      background: 0 no-repeat transparent url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3e%3cline y2='10' transform='translate(5)' fill='none' stroke='%23000' stroke-miterlimit='10' stroke-width='1'/%3e%3cline x2='10' transform='translate(0 5)' fill='none' stroke='%23000' stroke-miterlimit='10' stroke-width='1'/%3e%3c/svg%3e");
      width: 10px;
      height: 10px;
      margin-left: auto;
      transition: transform 0.3s ease-in-out;

      @media (min-width: 1280px) {
        display: none;
      }
    }
  }
}

.links input[type="checkbox"] {
  display: none;
}

.links input[type="checkbox"]:checked {
  + label {
    font-weight: 500;

    &::after {
      transform: rotate(45deg);
      transition: transform 0.3s ease-in-out;
    }
    + ul {
      height: auto;
      min-height: 0;
      opacity: 1;
      transition: height, opacity 0.3s ease-in-out;
      overflow: auto;
    }
  }
}
</style> -->
