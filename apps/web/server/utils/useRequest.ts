import { ApiError } from '@plentymarkets/shop-api';
import { type H3Event, type EventHandlerRequest } from 'h3';

export const useRequest = () => {
    const apiEndpoint = process.env.API_ENDPOINT || '';
    const defaultHeaders = {
        'x-security-token': process.env.API_SECURITY_TOKEN || '',
        'x-config-id': process.env.CONFIG_ID || '',
    };

    const request = async <T>(
        event: H3Event<EventHandlerRequest>,
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        url: string,
        data?: unknown,
    ): Promise<T> => {
        try {
            const response = await  $fetch.raw<T>(apiEndpoint + url, {
                method,
                body: data ?? {},
                credentials: 'include',
                headers: {
                    ...defaultHeaders,
                },
            });
            // https://nuxt.com/docs/3.x/getting-started/data-fetching#pass-cookies-from-server-side-api-calls-on-ssr-response
            const cookies = response.headers.getSetCookie();
            for (const cookie of cookies) {
                appendResponseHeader(event, 'set-cookie', cookie);
            }
            return response._data as T;
        } catch (error: ApiError | unknown) {
            console.error(error);
            throw new ApiError(error as ApiError);
        }
    };

    const get = <T>(event: H3Event<EventHandlerRequest>, url: string) => {
        return request<T>(event, 'GET', url);
    };

    const post = <T>(event: H3Event<EventHandlerRequest>, url: string, data: unknown) => {
        return request<T>(event, 'POST', url, data);
    };

    const put = <T>(event: H3Event<EventHandlerRequest>, url: string, data: unknown) => {
        return request<T>(event, 'PUT', url, data);
    };

    const del = <T>(event: H3Event<EventHandlerRequest>, url: string) => {
        return request<T>(event, 'DELETE', url);
    };

    return {
        get,
        post,
        put,
        del,
    };
};