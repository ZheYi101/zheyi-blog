import type { Locale } from "@/types/config";

export type TagKey = string;

export type TagLabel = {
	zh: string;
	en: string;
};

export const TAG_LABELS: Record<string, TagLabel> = {
	campus: {
		zh: "校园",
		en: "Campus",
	},
	"frontend-beginner": {
		zh: "前端入门",
		en: "Frontend Beginner",
	},
	"dev-experience": {
		zh: "开发经验",
		en: "Development Experience",
	},
	ssr: {
		zh: "SSR",
		en: "SSR",
	},
};

const TAG_ALIASES: Record<string, TagKey> = {
	campus: "campus",
	校园: "campus",
	"frontend-beginner": "frontend-beginner",
	前端入门: "frontend-beginner",
	"dev-experience": "dev-experience",
	开发经验: "dev-experience",
	ssr: "ssr",
	SSR: "ssr",
};

export function normalizeTagKey(tag: string): TagKey {
	const trimmed = tag.trim();
	return TAG_ALIASES[trimmed] || trimmed.toLowerCase();
}

export function getTagLabel(tagKey: TagKey, locale: Locale): string {
	return TAG_LABELS[tagKey]?.[locale] || tagKey;
}

export function getTagLabels(tags: string[], locale: Locale): string[] {
	return tags.map((tag) => getTagLabel(normalizeTagKey(tag), locale));
}
