<template>
  <div>
    <UiButton variant="tertiary" class="!p-1 ml-2 !ring-0 hover:!bg-transparent" @click="open"><SfIconShare size="xs" /></UiButton>

    <SfModal
      v-model="isOpen"
      class="max-w-[90%] md:!max-w-7xl md:min-w-[48rem] z-50 !px-5"
      tag="section"
      role="alertdialog"
      aria-labelledby="promoModalTitle"
      aria-describedby="promoModalDesc"
    >
      <header>
        <SfButton square variant="tertiary" class="absolute right-2 top-2" @click="close">
          <SfIconClose />
        </SfButton>
        <h3 id="promoModalTitle" class="font-bold typography-headline-4 md:typography-headline-3 mb-7">
          {{ t('product.share.title') }}
        </h3>
      </header>
      <div id="promoModalDesc" class="mt-2">
        <ul class="grid grid-cols-5 items-center gap-4">
          <li v-for="social in socials" :key="social.label" class="text-center">
            <a :href="social.link" target="_blank" :title="social.label">
              <span :class="`flex items-center justify-center gap-0 mx-auto rounded-full w-[64px] h-[64px] py-4 px-4 text-white mb-3 ${social.color}`">
                <component :is="social.icon" :size="social.size" :class="social.className"/>
              </span>
              <span class="block text-xs">{{ social.label }}</span>
              <span class="sr-only">{{ social.label }}</span>
            </a>
          </li>
        </ul>
      </div>
    </SfModal>
  </div>
</template>

<script setup lang="ts">
import { SfIconEmail, SfIconPinterest, SfIconFacebook, SfIconShare, SfModal, SfButton, SfIconClose, useDisclosure } from '@storefront-ui/vue';
import XIcon from '../ui/Icons/XIcon.vue';
import WhatsappIcon from '../ui/Icons/WhatsAppIcon.vue';

const config = useRuntimeConfig()
const { isOpen, open, close } = useDisclosure({ initialValue: false });
const props = defineProps<{
  name?: string;
}>();

const route = useRoute()

// Aktuelle URL erstellen
const itemUrl = computed(() => {
  return `${config.public.apiEndpoint || window.location.origin}${route.fullPath}`;
})

const socials = [
  {
    label: t('product.share.onSocial', {platform: "Facebook"}),
    link: `https://www.facebook.com/sharer/sharer.php?u=${itemUrl.value}&amp;quote=${props.name}`,
    color: 'bg-[#3b5993]',
    className: '',
    size: 'lg',
    icon: SfIconFacebook
  },
  {
    label: t('product.share.onSocial', {platform: "X"}),
    link: `https://twitter.com/intent/tweet?source=${itemUrl.value}&amp;text=${props.name}`,
    color: 'bg-black',
    className: '!w-7 !h-7',
    size: '',
    icon: XIcon
  },
  {
    label: t('product.share.onSocial', {platform: "Pinterest"}),
    link: `http://pinterest.com/pin/create/button/?url=${itemUrl.value}&amp;description=${props.name}`,
    color: 'bg-red-600',
    className: '',
    size: 'lg',
    icon: SfIconPinterest
  },
  {
    label: t('product.share.viaMail'),
    link: `mailto:?subject=${props.name}&amp;body=${itemUrl.value}`,
    color: 'bg-black',
    className: '',
    size: 'lg',
    icon: SfIconEmail
  },
  {
    label: t('product.share.onSocial', {platform: "WhatsApp"}),
    link: `https://api.whatsapp.com/send?text=${itemUrl.value}`,
    color: 'bg-green-600',
    className: '',
    size: 'lg',
    icon: WhatsappIcon
  }
];
</script>