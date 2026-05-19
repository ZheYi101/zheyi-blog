import type { Locale } from "@/types/config";
import type { CategoryKey } from "@utils/content-utils";

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
	return locale === "en" ? "/en" : "";
}

export function getLocaleFromPathname(pathname: string): Locale {
	return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "zh";
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

export function getTagUrl(tag: string, locale: Locale): string {
	if (!tag) return getArchiveUrl(locale);
	return url(
		`${localeToPrefix(locale)}/archive/?tag=${encodeURIComponent(tag.trim())}`,
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
