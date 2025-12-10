import type { EkomiReviewsState, UseEkomiReviewsReturn, EkomiReviewsSearchCriteria, EkomiReviewsResponse, FetchEkomiReviews } from './types';

export const useEkomiReviews: UseEkomiReviewsReturn = () => {
  const state = useState<EkomiReviewsState>('useEkomiReviews', () => ({
    loading: false,
    data: {}
  }));

  /**
   * Holt Bewertungen für alle Produkte mit reaktivem State und Auto-Updates
   * @param productIds - Reaktive oder statische Produkt-ID
   */
  const fetchReviews: FetchEkomiReviews = async (params: EkomiReviewsSearchCriteria) => {
    state.value.loading = true;
    
    const { data: reviews } = await useFetch<EkomiReviewsResponse>(
      () => `https://teppichversand24.net/cyt/ekomi/fb/list.php?itemId=${params.productIds.value.join(',')}`,
      {
        key: () => `ekomi-reviews`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        server: true,
        lazy: true,
        transform: (data: EkomiReviewsResponse) => {
          if (data && typeof data === 'string') {
            const parsedData = JSON.parse(data);
            state.value.data = parsedData;
            return parsedData;
          }
          state.value.data = data;
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
    fetchReviews,
    data: computed(() => state.value.data),
    loading: computed(() => state.value.loading)
  }
}