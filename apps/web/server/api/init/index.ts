import { SessionResult } from '@plentymarkets/shop-api';
import { defineEventHandler } from 'h3';
import { fetchWrapper } from '~/server/utils/fetchWrapper';

export default defineEventHandler(async (event) => {
    return fetchWrapper().get<SessionResult>(event, '/rest/storefront/init');
});