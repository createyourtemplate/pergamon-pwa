import { InitResult } from '@plentymarkets/shop-api';
import { defineEventHandler } from 'h3';
import { useRequest } from '~/server/utils/useRequest';

export default defineEventHandler(async (event) => {
    return useRequest().get<InitResult>(event, '/rest/storefront/init');
});