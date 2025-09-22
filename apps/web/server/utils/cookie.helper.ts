export const cookieHelper = () => {

  const getNumericSuffix = (cookieName: string, baseName: string): string => {
    if (cookieName === baseName) return '';
    const suffix = cookieName.replace(baseName, '');

    return /^\d+$/.test(suffix) ? suffix : '';
  };

  const matchesCookiePattern = (cookieName: string, pattern: string): boolean => {
    if (cookieName === pattern) return true;
    const suffix = cookieName.replace(pattern, '');

    return /^\d+$/.test(suffix);
  };
  const changeHeaderValueKey = (value: string, oldKey: string, newKey: string): string => {
    if (!value) {
      return '';
    }

    const newCookie = value.toString().split(';')
      .map((cookie: string) => {
        const trimmedCookie = cookie.trim();
        const cookieParts = trimmedCookie.split('=');
        const cookieName = cookieParts[0];

        if (matchesCookiePattern(cookieName, newKey)) {
          return '';
        }

        if (matchesCookiePattern(cookieName, oldKey)) {
          const suffix = getNumericSuffix(cookieName, oldKey);
          const newCookieName = newKey + suffix;

          return trimmedCookie.replace(cookieName + '=', newCookieName + '=');
        }
        return trimmedCookie;
      });

    value = newCookie.filter((str) => str.length > 0).join('; ');

    return value;
  };

  const replaceDomain = (cookie: string): string => {
    return cookie.replace(/domain=[^;]+;/, '');
  }

  return {
    changeHeaderValueKey,
    replaceDomain,
  }
}