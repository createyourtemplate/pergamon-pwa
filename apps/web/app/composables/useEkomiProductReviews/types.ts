export interface EkomiProductReview {
  date: string;
  rating: string;
  review: string;
}

export interface EkomiProductReviewSearchCriteria {
  limit: Ref<number> | number
}

export interface EkomiProductReviewResponse {
  feedbacks: Array<EkomiProductReview>;
  fb_avg: string;
  fb_count: number;
  fb_count_total: number;
  stars: Array<number>;
}

export type FetchEkomiProductReviews = (params: EkomiProductReviewSearchCriteria) => Promise<EkomiProductReviewResponse | undefined>;

export interface EkomiProductReviewsState {
  loading: boolean;
  totalReviews: number;
  averageRating: number;
  reviewsData: Record<string, EkomiProductReviewResponse>;
}

export interface useEkomiProductReviews {
  fetchProductReviews: FetchEkomiProductReviews;
  data: ComputedRef<EkomiProductReviewResponse | undefined>;
  totalReviews: ComputedRef<number>;
  averageRating: ComputedRef<number>;
  loading: ComputedRef<boolean>;
}

export type UseEkomiProductReviewsReturn = (itemId: string) => useEkomiProductReviews;
