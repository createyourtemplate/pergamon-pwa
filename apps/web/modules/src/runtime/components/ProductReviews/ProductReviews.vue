<template>
    <section v-if="totalReviews > 0" id="customerReviewsClick" ref="reviewArea" class="mt-10 mb-10">
        <span class="block !font-[CormorantGaramond] text-2xl md:text-3xl text-center md:text-left">{{ t('product.customer_reviews') }}</span>
        <div class="flex justify-center md:justify-between items-center my-4 md:mb-8 md:mt-6">
            <span class="text-lg hidden md:block">{{ productGetters.getName(props.product) }}</span>
            <div class="flex items-center gap-3 md:gap-4">
            <span class="text-sm md:text-lg">{{ t('product.review_grade_excellent') }}</span>
            <span class="inline-flex gap-2">
                <SfRating
                    size="sm"
                    :half-increment="true"
                    :value="reviewGetters.getAverageRating({
                        ratingsCountOf1: 0,
                        ratingsCountOf2: 0,
                        ratingsCountOf3: 0,
                        ratingsCountOf4: 0,
                        ratingsCountOf5: 0,
                        ratingsCountTotal: 0,
                        averageValue: averageRating + '',
                        highestCount: 0
                    }, 'half')"
                    :max="5"
                    class="!text-black [&>svg]:-ml-0.5"
                    />
                <span class="text-sm md:text-lg font-bold">{{ averageRating }} {{ t('product.reviews_of') }}</span>
            </span>
            <span class="text-sm md:text-lg">({{ totalReviews }} {{ t('product.reviews') }})</span>
            </div>
        </div>
        <div class="bg-[#F0F7FC] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-x-10 gap-y-10 py-12 px-12 mx-0 md:-mx-10 text-center sm:text-left">
            <div v-for="(feedback, index) in reviews?.feedbacks" :key="feedback.date + '_' + index">
            <div class="flex items-center justify-center md:justify-start mb-3">
                <SfRating
                    size="xs"
                    :half-increment="true"
                    :value="reviewGetters.getAverageRating({
                        ratingsCountOf1: 0,
                        ratingsCountOf2: 0,
                        ratingsCountOf3: 0,
                        ratingsCountOf4: 0,
                        ratingsCountOf5: 0,
                        ratingsCountTotal: 0,
                        averageValue: feedback.rating,
                        highestCount: 0
                    }, 'half')"
                    :max="5"
                    class="!text-black leading-none [&>svg]:-ml-0.5"
                    />
                <span class="ml-2 text-sm font-bold">{{ feedback.date }}</span>
            </div>
            <div class="text-lg">{{ feedback.review }}</div>
        </div>
        </div>
        <div v-if="totalReviews > reviewLimit" class="text-center md:text-left">
            <UiButton variant="tertiary" size="sm" class="!text-[#999999] mt-4 md:mt-6" @click="showMoreReviews()">
            <u>
                {{ t('product.more_reviews') }}
            </u>
            </UiButton>
        </div>
    </section>
</template>

<script setup lang="ts">
import { SfRating } from '@storefront-ui/vue';
import { productGetters, reviewGetters } from '@plentymarkets/shop-api';
import type { PurchaseCardProps } from '~/components/ui/PurchaseCard/types';

const props = defineProps<PurchaseCardProps>();
const productId = productGetters.getItemId(props?.product);
const {
  reviewArea,
} = useProductReviews(parseInt(productGetters.getItemId(props?.product)), parseInt(productId));

const viewport = useViewport();
const { fetchProductReviews, data: reviews, totalReviews, averageRating } = useEkomiProductReviews(productId);
const reviewLimit = ref(viewport.isLessThan('lg') ? 5 : 10);

fetchProductReviews({limit: reviewLimit.value});

const showMoreReviews = () => {
  reviewLimit.value += viewport.isLessThan('lg') ? 5 : 10;
};
</script>