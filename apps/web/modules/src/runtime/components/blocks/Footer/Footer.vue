<template>
  <UiFooter />
</template>

<script setup lang="ts">
import { SfLink, SfListItem, SfRating, SfIconAdd, SfIconRemove, SfIconFacebook, SfIconInstagram, SfIconTwitter } from '@storefront-ui/vue';
const viewport = useViewport();
const { t } = useI18n();
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
