import { localeSettings } from "@i18n/locales";
import type { CategoryKey } from "@utils/content-utils";
import type { Locale } from "@/types/config";

export function pathsEqual(path1: string, path2: string): boolean {
	const normalizedPath1 = path1.replace(/^\/|\/$/g, "").toLowerCase();
	const normalizedPath2 = path2.replace(/^\/|\/$/g, "").toLowerCase();
	return normalizedPath1 === normalizedPath2;
}

function joinUrl(...parts: string[]): string {
	const joined = parts.join("/");
	return joined.replace(/\/+/g, "/");
}

export function localeToPrefix(locale: Locale): string {
	return localeSettings[locale].prefix;
}

export function getLocaleFromPathname(pathname: string): Locale {
	const path = withoutBase(pathname);
	const prefix = localeToPrefix("zh");
	return path === prefix || path.startsWith(`${prefix}/`) ? "zh" : "en";
}

function withoutBase(pathname: string): string {
	const base = import.meta.env.BASE_URL.replace(/\/$/, "");
	return base && (pathname === base || pathname.startsWith(`${base}/`))
		? pathname.slice(base.length) || "/"
		: pathname;
}

/** Switch section without losing the page, filters, or fragment. */
export function getLocalizedUrl(currentUrl: string, locale: Locale): string {
	const current = new URL(currentUrl, "https://local.invalid");
	const path = withoutBase(current.pathname);
	const prefix = localeToPrefix(getLocaleFromPathname(current.pathname));
	const routePath = (prefix ? path.slice(prefix.length) : path) || "/";
	return `${url(`${localeToPrefix(locale)}${routePath}`)}${current.search}${current.hash}`;
}

export function getRssUrl(locale: Locale): string {
	return url(
		locale === "en" ? "/rss-en.xml" : `${localeToPrefix(locale)}/rss.xml`,
	);
}

export function getHomeUrl(locale: Locale): string {
	return url(`${localeToPrefix(locale)}/`);
}

export function getPostUrlBySlug(slug: string, locale: Locale): string {
	return url(`${localeToPrefix(locale)}/posts/${slug}/`);
}

export function getArchiveUrl(locale: Locale): string {
	return url(`${localeToPrefix(locale)}/archive/`);
}

export function getAboutUrl(locale: Locale): string {
	return url(`${localeToPrefix(locale)}/about/`);
}

export function getFriendLinkUrl(locale: Locale): string {
	return url(`${localeToPrefix(locale)}/friendLink/`);
}

export function getTagUrl(tagKey: string, locale: Locale): string {
	if (!tagKey) return getArchiveUrl(locale);
	return url(
		`${localeToPrefix(locale)}/archive/?tag=${encodeURIComponent(tagKey.trim())}`,
	);
}

export function getCategoryUrl(
	categoryKey: CategoryKey | null,
	locale: Locale,
): string {
	if (!categoryKey) {
		return url(`${localeToPrefix(locale)}/archive/?uncategorized=true`);
	}
	return url(
		`${localeToPrefix(locale)}/archive/?category=${encodeURIComponent(categoryKey)}`,
	);
}

export function getDir(path: string): string {
	const lastSlashIndex = path.lastIndexOf("/");
	if (lastSlashIndex < 0) {
		return "/";
	}
	return path.substring(0, lastSlashIndex + 1);
}

export function url(path: string): string {
	return joinUrl("", import.meta.env.BASE_URL, path);
}
