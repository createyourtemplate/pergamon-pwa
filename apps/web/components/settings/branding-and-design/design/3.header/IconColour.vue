<template>
  <div class="py-2">
    <div class="flex justify-between mb-2">
      <UiFormLabel>Icon colour</UiFormLabel>
      <SfTooltip
        label="If set, this colour overrides the default white of the icons in the header, ensuring sufficient contrast with your chosen background."
        :placement="'top'"
        :show-arrow="true"
        class="ml-2 z-10"
      >
        <SfIconInfo :size="'sm'" />
      </SfTooltip>
    </div>
    <label>
      <SfInput v-model="iconColor" type="text" data-testid="icon-color">
        <template #suffix>
          <label
            for="icon-color"
            :style="{ backgroundColor: iconColor }"
            class="border border-[#a0a0a0] rounded-lg cursor-pointer"
          >
            <input id="icon-color" v-model="iconColor" type="color" class="invisible w-8" />
          </label>
        </template>
      </SfInput>
    </label>
  </div>
</template>
<script setup lang="ts">
import { SfIconInfo, SfInput, SfTooltip } from '@storefront-ui/vue';

const { updateSetting, getSetting } = useSiteSettings('iconColor');

const iconColor = computed({
  get: () => getSetting(),
  set: (value) => updateSetting(value),
});
</script>
