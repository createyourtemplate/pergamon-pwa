<template>
  <div class="">
    <div class="flex justify-between mb-2">
      <UiFormLabel>Global fonts</UiFormLabel>
      <SfTooltip
        label="Choose one Google Font for all texts. Fonts are served locally to ensure privacy compliance, with no live requests to Google."
        :placement="'top'"
        :show-arrow="true"
        class="ml-2 z-10"
      >
        <SfIconInfo :size="'sm'" />
      </SfTooltip>
    </div>

    <Multiselect
      v-model="font"
      data-testid="font-select"
      :options="fonts"
      placeholder="Select a font"
      label="value"
      track-by="caption"
      :allow-empty="false"
      class="cursor-pointer"
      select-label=""
      deselect-label="Selected"
    />
  </div>
</template>

<script setup lang="ts">
import 'vue-multiselect/dist/vue-multiselect.min.css';
import Multiselect from 'vue-multiselect';
import { SfIconInfo, SfTooltip } from '@storefront-ui/vue';
import type { FontSetting } from './types';

const fonts = ref([]);

onMounted(async () => {
  const response = await fetch('/_nuxt-plenty/editor/fonts.json');

  if (response.ok) {
    fonts.value = await response.json();
  }
});

const { updateSetting, getSetting } = useSiteSettings('font');
const { loadGoogleFont } = useSiteConfiguration();

const font = computed({
  get: () => {
    return fonts.value.find((f: FontSetting) => f.value === getSetting()) ?? {};
  },
  set: (value: FontSetting) => {
    updateSetting(value.value);
    loadGoogleFont(value.value);
  },
});
</script>
