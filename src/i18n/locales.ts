import type { Locale } from "../types/config";

export const localeSettings: Record<
	Locale,
	{ prefix: string; htmlLang: string }
> = {
	en: { prefix: "", htmlLang: "en" },
	zh: { prefix: "/zh", htmlLang: "zh-CN" },
};

export function isLocale(value: unknown): value is Locale {
	return value === "en" || value === "zh";
}

export function getOtherLocale(locale: Locale): Locale {
	return locale === "en" ? "zh" : "en";
}

export function getHtmlLang(locale: Locale): string {
	return localeSettings[locale].htmlLang;
}
