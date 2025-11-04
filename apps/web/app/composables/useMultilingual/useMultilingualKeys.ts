import type { MultilingualKeysState, CompiledMessage } from './types';

export const useMultilingualKeys = () => {
  const { $i18n } = useNuxtApp();
  const state = useState('useMultilingualKeys', () => ({
    keys: [] as MultilingualKeysState[],
    isLoading: false,
    isLoaded: false,
  }));

  const isCompiledMessage = (value: unknown): boolean => {
    return (
      typeof value === 'object' &&
      value !== null &&
      'loc' in value &&
      typeof value.loc === 'object' &&
      value.loc !== null &&
      'source' in value.loc &&
      typeof value.loc.source === 'string'
    );
  };

  const getTranslationValue = (value: unknown): string | null => {
    if (isCompiledMessage(value) && value) {
      return (value as CompiledMessage)?.loc?.source ?? '';
    }
    if (typeof value === 'string') {
      return value;
    }
    return null;
  };

  const isNestedObject = (value: unknown): boolean => {
    return value !== null && typeof value === 'object' && !Array.isArray(value) && !isCompiledMessage(value);
  };

  const extractKeysWithValues = (obj: Record<string, unknown>, prefix = ''): Record<string, string> => {
    const result: Record<string, string> = {};

    for (const key in obj) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];

      if (isNestedObject(value)) {
        Object.assign(result, extractKeysWithValues(value, fullKey));
      } else {
        const translationValue = getTranslationValue(value);
        if (translationValue) result[fullKey] = translationValue;
      }
    }

    return result;
  };

  const loadKeys = async () => {
    state.value.keys = [];
    const keysMap = new Map<string, Record<string, string>>();

    for (const locale of $i18n.availableLocales) {
      await $i18n.loadLocaleMessages(locale);

      const messages = $i18n.getLocaleMessage(locale) as Record<string, unknown>;
      const keysWithValues = extractKeysWithValues(messages);

      for (const [key, value] of Object.entries(keysWithValues)) {
        if (!keysMap.has(key)) {
          keysMap.set(key, {});
        }
        const translations = keysMap.get(key)!;
        translations[locale] = value;
      }
    }

    state.value.keys = Array.from(keysMap.entries())
      .map(([key, translations]) => ({
        key,
        translations,
      }))
      .sort((a, b) => a.key.localeCompare(b.key));

    console.log(state.value.keys);
  };

  return {
    ...toRefs(state.value),
    loadKeys,
  };
};
