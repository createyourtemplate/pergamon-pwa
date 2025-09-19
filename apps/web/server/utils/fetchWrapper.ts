import { ApiError } from '@plentymarkets/shop-api';
import { type H3Event, type EventHandlerRequest } from 'h3';

export const fetchWrapper = () => {

    const apiEndpoint = process.env.API_ENDPOINT || '';
    const defaultHeaders = {
        'x-security-token': process.env.API_SECURITY_TOKEN || '',
        'x-config-id': process.env.CONFIG_ID || '',
    }

    const get = async <T>(event: H3Event<EventHandlerRequest>, url: string): Promise<T | ApiError> => {

        try {
            const response = await $fetch.raw<T>(apiEndpoint + url, {
                credentials: "include",
                headers: {
                    ...defaultHeaders
                }
            })
            // https://nuxt.com/docs/3.x/getting-started/data-fetching#pass-cookies-from-server-side-api-calls-on-ssr-response
            const cookies = response.headers.getSetCookie()
            for (const cookie of cookies) {
                appendResponseHeader(event, 'set-cookie', cookie)
            }
            return response._data as T;
        } catch (error: ApiError | unknown) {
            console.error('API fetch error:', error);
          return error as ApiError;
        }
    }

    return {
        get
    }
}