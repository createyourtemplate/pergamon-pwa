<template>
  <div
    ref="tablistRef"
    role="tablist"
    aria-label="Select tab"
    aria-orientation="horizontal"
    class="flex flex-col md:flex-row md:flex-nowrap justify-center mb-3 relative items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
  >
    <div class="font-[CormorantGaramond] text-center text-3xl flex-1 md:absolute left-4">Neuheiten</div>
    <div>
        <button
            v-for="tab in tabs"
            :id="tabId(tab.label)"
            :key="tab.label"
            type="button"
            role="tab"
            :aria-controls="panelId(tab.label)"
            :aria-selected="isActive(tab)"
            :disabled="tab.disabled"
            :tabindex="isActive(tab) ? 0 : -1"
            :class="[
                'rounded-none mr-2 border border-black px-4 py-2 rounded-md font-medium whitespace-nowrap text-neutral-500 hover:enabled:bg-primary-100 hover:enabled:text-primary-800 active:enabled:bg-primary active:enabled:text-primary-900 disabled:text-disabled-500 focus-visible:outline focus-visible:-outline-offset-2 focus-visible:shadow-[inset_0_0_0_4px_rgb(255,255,255)]',
                isActive(tab) ? '!bg-black !text-white' : '',
            ]"
            @click="activeTab = tab"
            @keydown="handleKeyDown"
            >
            {{ tab.label }}
        </button>
    </div>
  </div>

  <div
    v-for="tab in tabs"
    :id="panelId(tab.label)"
    :key="tab.label"
    role="tabpanel"
    :aria-labelledby="tabId(tab.label)"
  >
    <div v-if="isActive(tab)" class="p-4 text-neutral-500">
        <NuxtLazyHydrate when-visible>
            <component
                :is="RecommendedProductsAsync"
                :category-id="tab.id"
            />
        </NuxtLazyHydrate>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

function getPreviousIndex(current: number, elements: HTMLButtonElement[]) {
  for (let index = current - 1; index >= 0; index -= 1) {
    if (!elements[index]?.disabled) {
      return index;
    }
  }
  for (let index = elements.length - 1; index > -1; index -= 1) {
    if (!elements[index]?.disabled) {
      return index;
    }
  }
  return current;
}

function getNextIndex(current: number, elements: HTMLButtonElement[]) {
  for (let index = current + 1; index < elements.length; index += 1) {
    if (!elements[index]?.disabled) {
      return index;
    }
  }
  for (let index = 0; index < elements.length; index += 1) {
    if (!elements[index]?.disabled) {
      return index;
    }
  }
  return current;
}

interface Tab {
  label: string;
  id: string;
  disabled?: boolean;
}

const tabs: Tab[] = [
  { label: 'Color', id: "570" },
  { label: 'Design', id: "570" },
  { label: 'Nature', id: "570" },
  { label: 'Kids', id: "570" },
  { label: 'Outdoor', id: "570" },
];

const RecommendedProductsAsync = defineAsyncComponent(
  async () => await import('~/components/RecommendedProducts/RecommendedProducts.vue'),
);

const tablistRef = ref<HTMLDivElement>();
const activeTab = ref<Tab | undefined>(tabs[0]);
const isActive = computed(() => (tab: Tab) => activeTab?.value?.label === tab.label);
const tabId = (label: string) => `${label}-tab`;
const panelId = (label: string) => `${label}-panel`;

const handleKeyDown = (event: KeyboardEvent) => {
  const elements = Array.from(tablistRef.value?.querySelectorAll<HTMLButtonElement>('[role="tab"]') || []);
  const current = elements.findIndex((el) => event.currentTarget === el);
  const nextTab = getNextIndex(current, elements);
  const prevTab = getPreviousIndex(current, elements);
  const lastTab = elements.length - 1;
  const goTo = (index: number) => () => {
    event.stopPropagation();
    event.preventDefault();
    const goToElement = elements[index];
    goToElement?.focus();
    goToElement?.click();
    goToElement?.scrollIntoView();
  };
  const interactionsMap = new Map([
    ['ArrowLeft', goTo(prevTab)],
    ['ArrowRight', goTo(nextTab)],
    ['Home', goTo(0)],
    ['End', goTo(lastTab)],
  ]);
  const interaction = interactionsMap.get(event.key);
  interaction?.();
};
</script>