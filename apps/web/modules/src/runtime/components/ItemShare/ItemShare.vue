<template>
  <UiButton variant="tertiary" class="!p-1 ml-2 !ring-0 hover:!bg-transparent" @click="open"><SfIconShare size="xs" /></UiButton>

  <SfModal
    v-model="isOpen"
    class="max-w-[90%] md:max-w-2xl z-50 !px-4"
    tag="section"
    role="alertdialog"
    aria-labelledby="promoModalTitle"
    aria-describedby="promoModalDesc"
  >
    <header>
      <SfButton square variant="tertiary" class="absolute right-2 top-2" @click="close">
        <SfIconClose />
      </SfButton>
      <h3 id="promoModalTitle" class="font-bold text-center typography-headline-4 md:typography-headline-3 mb-4">
        Teile dieses Angebot
      </h3>
    </header>
    <div id="promoModalDesc" class="mt-2">
      <ul class="flex items-center gap-5 justify-between">
        <li class="facebook">
          <a class="flex flex-col gap-1 text-center" :href="`https://www.facebook.com/sharer/sharer.php?u=${itemUrl}&amp;quote=${props.name}`" target="_blank" title="Auf Facebook teilen">
            <span><SfIconFacebook size="xl"/></span>
            <span class="text-xs">Auf Facebook teilen</span>
            <span class="sr-only">Auf Facebook teilen</span>
          </a>
        </li>
        <li class="twitter">
          <a class="flex flex-col gap-1 text-center" :href="`https://twitter.com/intent/tweet?source=${itemUrl}&amp;text=${props.name}`" target="_blank" title="Auf X (ehemals Twitter) teilen">
            <span><SfIconTwitter size="xl"/></span>
            <span class="text-xs">Auf Twitter teilen</span>
            <span class="sr-only">Auf X (ehemals Twitter) teilen</span>
          </a>
        </li>
        <li class="pinterest">
          <a class="flex flex-col gap-1 text-center" :href="`http://pinterest.com/pin/create/button/?url=${itemUrl}&amp;description=${props.name}`" target="_blank" title="Auf Pinterest teilen">
            <span><SfIconPinterest size="xl"/></span>
            <span class="text-xs">Auf Pinterest teilen</span>
            <span class="sr-only">Auf Pinterest teilen</span>
          </a>
        </li>
        <li class="mail">
          <a class="flex flex-col gap-1 text-center" :href="`mailto:?subject=${props.name}&amp;body=${itemUrl}`" target="_blank" title="Per E-Mail versenden">
            <span><SfIconEmail size="xl"/></span>
            <span class="text-xs">Per E-Mail versenden</span>
            <span class="sr-only">Per E-Mail versenden</span>
          </a>
        </li>
        <li class="whatsapp">
          <a class="flex flex-col gap-1 text-center" data-action="share/whatsapp/share" :href="`https://api.whatsapp.com/send?text=${itemUrl}`" target="_blank" title="Per Whatsapp versenden">
            <span><SfIconContactSupport size="xl"/></span>
            <span class="text-xs">Per Whatsapp versenden</span>
            <span class="sr-only">Per Whatsapp versenden</span>
          </a>
        </li>
      </ul>
    </div>
  </SfModal>
</template>

<script setup lang="ts">
import { SfIconContactSupport, SfIconEmail, SfIconPinterest, SfIconTwitter, SfIconFacebook, SfIconShare, SfModal, SfButton, SfIconClose, useDisclosure } from '@storefront-ui/vue';

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
</script>