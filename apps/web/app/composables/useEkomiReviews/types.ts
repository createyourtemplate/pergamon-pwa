export interface EkomiReview {
  date: string;
  rating: string;
  review: string;
}

export interface EkomiResponse {
  feedbacks: Array<EkomiReview>;
  fb_avg: string;
  fb_count: number;
  fb_count_total: number;
  stars: Array<number>;
}