export const locales = ['en', 'pt'];
export const defaultLocale = 'pt';

export function getLocaleFromPath(pathname: string): string {
  const locale = locales.find((loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`);
  return locale || defaultLocale;
}
