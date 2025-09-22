import { Data, InitResult } from '@plentymarkets/shop-api';
import { defineEventHandler } from 'h3';
import { useRequest } from '~/server/utils/useRequest';

export default defineEventHandler(async (event) => {
    return useRequest().get<Data<InitResult>>(event, '/rest/storefront/init');
});