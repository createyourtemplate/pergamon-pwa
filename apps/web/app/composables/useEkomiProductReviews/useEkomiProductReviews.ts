import type { EkomiProductReviewsState, UseEkomiProductReviewsReturn, EkomiProductReviewSearchCriteria, EkomiProductReviewResponse, FetchEkomiProductReviews } from './types';

export const useEkomiProductReviews: UseEkomiProductReviewsReturn = (itemId: string) => {
  const { locale } = useI18n();

  const state = useState<EkomiProductReviewsState>(`useEkomiProductReviews-${itemId}-${locale.value}`, () => ({
    loading: false,
    totalReviews: 0,
    averageRating: 0,
    reviewsData: {}
  }));

  /**
   * Aktualisiert den globalen State mit neuen Bewertungsdaten
   */
  const updateReviewState = (itemId: string | number, data: EkomiProductReviewResponse) => {
    const key = `${itemId}-${locale.value}`
    state.value.reviewsData[key] = data;

    if (data?.fb_count_total !== undefined) {
      state.value.totalReviews = data.fb_count_total
    }
    if (data?.fb_avg !== undefined) {
      state.value.averageRating = parseFloat(data.fb_avg)
    }
  }

  /**
   * Holt Bewertungen für ein Produkt mit reaktivem State und Auto-Updates
   * @param itemId - Reaktive oder statische Produkt-ID
   * @param limit - Anzahl der Bewertungen
   */
  const fetchProductReviews: FetchEkomiProductReviews = async (params: EkomiProductReviewSearchCriteria) => {
    state.value.loading = true;
    
    const { data: reviews } = await useFetch<EkomiProductReviewResponse>(
      () => `https://teppichversand24.net/cyt/ekomi/fb/fbget?id=${itemId}&lang=${locale.value.toUpperCase()}&limit=${params.limit}`,
      {
        key: () => `ekomi-reviews-${itemId}-${locale.value}-${params.limit}`,
        headers: {
          'Content-Type': 'application/json'
        },
        watch: [() => itemId, locale, () => params.limit],
        server: true,
        lazy: true,
        transform: (data: EkomiProductReviewResponse) => {
          if (data && typeof data === 'string') {
            const parsedData = JSON.parse(data);
            updateReviewState(itemId, parsedData)
            return parsedData;
          }
          updateReviewState(itemId, data)
          return data;
        },
        onResponseError() {
          state.value.loading = false;
        }
      }
    );

    state.value.loading = false;

    return reviews.value ?? undefined;
  }

  return {
    fetchProductReviews,
    data: computed(() => state.value.reviewsData[`${itemId}-${locale.value}`]),
    totalReviews: computed(() => state.value.totalReviews),
    averageRating: computed(() => state.value.averageRating),
    loading: computed(() => state.value.loading)
  }
}