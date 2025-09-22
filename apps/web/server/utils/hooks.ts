import { type H3Event, type EventHandlerRequest } from 'h3';
import { type NitroFetchRequest } from 'nitropack';
export const beforeRequest = (event: H3Event<EventHandlerRequest>, headers: { [key: string]: string }) => {
    headers['x-security-token'] = process.env.API_SECURITY_TOKEN || '';
    headers['x-config-id'] = process.env.CONFIG_ID || '';

    const cookies = parseCookies(event);

    console.log('Request cookies:', cookies['pwa-session-id']);

    headers.cookie = Object.entries(cookies)
        .map(([key, value]) => {
            if (key.includes('pwa-session-id')) {
                const cookie = `${key}=${encodeURIComponent(value)}`;
                return cookieHelper().changeHeaderValueKey(cookie, 'pwa-session-id', 'plentyID');
            }
            return `${key}=${encodeURIComponent(value)}`;
        })
        .join('; ');

    return { event, headers }
}

// todo fix types
export const afterRequest = (event: H3Event<EventHandlerRequest>, response: any) => {
    if (import.meta.server) {
        // https://nuxt.com/docs/3.x/getting-started/data-fetching#pass-cookies-from-server-side-api-calls-on-ssr-response
        const cookies = response?.headers?.getSetCookie();
        for (let cookie of cookies) {
            cookie = cookieHelper().replaceDomain(cookie);
            cookie = cookieHelper().changeHeaderValueKey(cookie, 'plentyID', 'pwa-session-id')
            appendResponseHeader(event, 'set-cookie', cookie);
        }
    }

}