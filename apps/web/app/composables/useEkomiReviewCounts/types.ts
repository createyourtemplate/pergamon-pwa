export interface EkomiReview {
  usedPeriodFrom: string;
  average: number;
  count: number;
}

export interface EkomiReviewsSearchCriteria {
  productIds: Ref<Array<string>>;
}

export interface EkomiReviewsResponse {
  [key: string]: EkomiReview;
}

export type FetchEkomiReviews = (params: EkomiReviewsSearchCriteria) => Promise<EkomiReviewsResponse | undefined>;

export interface EkomiReviewsState {
  loading: boolean;
  data: EkomiReviewsResponse;
}

export interface useEkomiReviews {
  fetchReviews: FetchEkomiReviews;
  data: ComputedRef<EkomiReviewsResponse>;
  loading: ComputedRef<boolean>;
}

export type UseEkomiReviewsReturn = () => useEkomiReviews;
