import type { Ref } from 'vue';
import type { EkomiResponse } from './types';

// Globaler State für Bewertungen
const ekomiState = {
  totalReviews: useState<number>('ekomi.totalReviews', () => 0),
  averageRating: useState<number>('ekomi.averageRating', () => 0),
  reviewsData: useState<Record<string, EkomiResponse>>('ekomi.reviewsData', () => ({}))
}

export const useEkomiReviews = () => {
  const { locale } = useI18n();

  /**
   * Aktualisiert den globalen State mit neuen Bewertungsdaten
   */
  const updateReviewState = (itemId: string | number, data: EkomiResponse) => {
    const key = `${itemId}-${locale.value}`
    ekomiState.reviewsData.value[key] = data;

    if (data?.fb_count_total !== undefined) {
      ekomiState.totalReviews.value = data.fb_count_total
    }
    if (data?.fb_avg !== undefined) {
      ekomiState.averageRating.value = parseFloat(data.fb_avg)
    }
  }

  const getReviewState = () => {
    return {
      totalReviews: readonly(ekomiState.totalReviews),
      averageRating: readonly(ekomiState.averageRating),
      reviews: readonly(ekomiState.reviewsData)
    }
  }

  const getReviewsForProduct = (itemId: string | number) => {
    const key = `${itemId}-${locale.value}`
    return ekomiState.reviewsData.value[key] || null
  }



  /**
   * Holt Bewertungen für ein Produkt mit reaktivem State und Auto-Updates
   * @param itemId - Reaktive oder statische Produkt-ID
   * @param limit - Anzahl der Bewertungen (Standard: 10)
   */
  const fetchReviews = (itemId: Ref<string | number> | string | number, limit: Ref<number> | number = 10) => {
    const reactiveItemId = isRef(itemId) ? itemId : ref(itemId)
    const reactiveLimit = isRef(limit) ? limit : ref(limit)
    
    const { data: reviews, pending, error, refresh } = useFetch<EkomiResponse>(
      () => `https://teppichversand24.net/cyt/ekomi/fb/fbget?id=${reactiveItemId.value}&lang=${locale.value.toUpperCase()}&limit=${reactiveLimit.value}`,
      {
        key: () => `ekomi-reviews-${reactiveItemId.value}-${locale.value}-${reactiveLimit.value}`,
        headers: {
          'Content-Type': 'application/json'
        },
        watch: [reactiveItemId, locale, reactiveLimit],
        server: true,
        lazy: true,
        transform: (data: EkomiResponse) => {
          // State aktualisieren
          if (data && typeof data === 'string') {
            const parsedData = JSON.parse(data);

            updateReviewState(reactiveItemId.value, parsedData);

            return parsedData;
          }
          return data
        },
        onResponseError({ response }) {
          console.error('Ekomi API Error:', response.status, response.statusText)
        }
      }
    )

    return {
      reviews,
      pending,
      error,
      refresh
    }
  }

  return {
    fetchReviews,
    getReviewState,
    getReviewsForProduct,
    state: {
      totalReviews: ekomiState.totalReviews,
      averageRating: ekomiState.averageRating,
      reviewsData: ekomiState.reviewsData
    }
  }
}