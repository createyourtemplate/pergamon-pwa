<template>
  <div class="py-2">
    <div class="flex justify-between mb-2">
      <UiFormLabel>Primary colour</UiFormLabel>
      <SfTooltip
        label="Select the main colour for the shop. We’ll generate 10 matching shades and apply them to key elements to define your shop's overall look and feel."
        :placement="'top'"
        :show-arrow="true"
        class="ml-2 z-10"
      >
        <SfIconInfo :size="'sm'" />
      </SfTooltip>
    </div>
    <label>
      <SfInput v-model="primaryColor" type="text" data-testid="primary-color-select">
        <template #suffix>
          <label
            for="primary-color"
            :style="{ backgroundColor: primaryColor }"
            class="border border-[#a0a0a0] rounded-lg cursor-pointer"
          >
            <input id="primary-color" v-model="primaryColor" type="color" class="invisible w-8" />
          </label>
        </template>
      </SfInput>
    </label>
  </div>
</template>
<script setup lang="ts">
import { SfIconInfo, SfInput, SfTooltip } from '@storefront-ui/vue';
import { getPaletteFromColor, setColorProperties } from '~/utils/tailwindHelper';

const { updateSetting, getSetting } = useSiteSettings('primaryColor');

const updatePrimaryColor = (hexColor: string) => {
  const tailwindColors = getPaletteFromColor('primary', hexColor).map((color) => ({
    ...color,
  }));

  setColorProperties('primary', tailwindColors);
};

const primaryColor = computed({
  get: () => getSetting(),
  set: (value) => {
    updateSetting(value);
    updatePrimaryColor(value);
  },
});
</script>
