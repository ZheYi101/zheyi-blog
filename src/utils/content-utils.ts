import { type CollectionEntry, getCollection, getEntry } from "astro:content";
import type { Locale } from "@/types/config";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { getCategoryUrl } from "@utils/url-utils.ts";
import { getTagLabel, getTagLabels, normalizeTagKey, type TagKey } from "@utils/tag-utils";

type PostEntry = CollectionEntry<"posts">;
type SpecEntry = CollectionEntry<"spec">;

export type CategoryKey = string;

export type CategoryLabel = {
	zh: string;
	en: string;
};

export const CATEGORY_LABELS: Record<string, CategoryLabel> = {
	frontend: {
		zh: "前端",
		en: "Frontend",
	},
	misc: {
		zh: "校园&杂谈",
		en: "Misc",
	},
};


type PostGroup = {
	translationKey: string;
	variants: PostEntry[];
};

function normalizeContentPath(path: string): string {
	return path.replace(/\\/g, "/");
}

function stripMarkdownExtension(path: string): string {
	return path.replace(/\.mdx?$/i, "");
}

function stripLocaleSuffix(path: string): string {
	return path.replace(/\.(zh|en)$/i, "");
}

function getPostSourcePath(post: Pick<PostEntry, "id" | "filePath">): string {
	const filePath = post.filePath ? normalizeContentPath(post.filePath) : "";
	const marker = "src/content/posts/";
	const markerIndex = filePath.indexOf(marker);
	return markerIndex >= 0 ? filePath.slice(markerIndex + marker.length) : normalizeContentPath(post.id);
}

export function getPostSlug(post: Pick<PostEntry, "id" | "filePath">): string {
	return stripLocaleSuffix(stripMarkdownExtension(getPostSourcePath(post)));
}

export function detectPostLocale(post: Pick<PostEntry, "id" | "filePath" | "data">): Locale {
	const sourcePath = getPostSourcePath(post);
	if (sourcePath.endsWith(".en.md") || sourcePath.endsWith(".en.mdx")) {
		return "en";
	}
	if (sourcePath.endsWith(".zh.md") || sourcePath.endsWith(".zh.mdx")) {
		return "zh";
	}
	if (post.data.lang?.toLowerCase().startsWith("en")) {
		return "en";
	}
	return "zh";
}

export function getPostTranslationKey(post: Pick<PostEntry, "id" | "filePath">): string {
	return getPostSlug(post);
}

export function getCategoryKey(post: Pick<PostEntry, "id">): CategoryKey | null {
	const [categoryKey] = getPostSlug(post).split("/");
	return categoryKey?.trim() || null;
}

export function getCategoryLabel(categoryKey: CategoryKey | null, locale: Locale): string {
	if (!categoryKey) {
		return i18n(locale, I18nKey.uncategorized);
	}
	return CATEGORY_LABELS[categoryKey]?.[locale] || categoryKey;
}

function comparePostsDesc(a: PostEntry, b: PostEntry) {
	const dateA = new Date(a.data.published);
	const dateB = new Date(b.data.published);
	return dateA > dateB ? -1 : 1;
}

async function getRawPosts(): Promise<PostEntry[]> {
	return getCollection("posts", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});
}

function groupPosts(posts: PostEntry[]): PostGroup[] {
	const groups = new Map<string, PostEntry[]>();
	for (const post of posts) {
		const translationKey = getPostTranslationKey(post);
		const variants = groups.get(translationKey) || [];
		variants.push(post);
		groups.set(translationKey, variants);
	}
	return Array.from(groups.entries()).map(([translationKey, variants]) => ({
		translationKey,
		variants,
	}));
}

function resolvePostVariant(group: PostGroup, locale: Locale): PostEntry {
	const exact = group.variants.find((post) => detectPostLocale(post) === locale);
	if (exact) {
		return exact;
	}
	const fallbackLocale: Locale = locale === "zh" ? "en" : "zh";
	const fallback = group.variants.find(
		(post) => detectPostLocale(post) === fallbackLocale,
	);
	return fallback || group.variants[0];
}

function withPrevNext(sorted: PostEntry[]) {
	for (let i = 1; i < sorted.length; i++) {
		sorted[i].data.nextSlug = getPostSlug(sorted[i - 1]);
		sorted[i].data.nextTitle = sorted[i - 1].data.title;
	}
	for (let i = 0; i < sorted.length - 1; i++) {
		sorted[i].data.prevSlug = getPostSlug(sorted[i + 1]);
		sorted[i].data.prevTitle = sorted[i + 1].data.title;
	}
	return sorted;
}

export async function getSortedPosts(locale: Locale): Promise<PostEntry[]> {
	const rawPosts = await getRawPosts();
	const resolved = groupPosts(rawPosts)
		.map((group) => resolvePostVariant(group, locale))
		.sort(comparePostsDesc);
	return withPrevNext(resolved);
}

export async function getLocalizedPostByTranslationKey(
	translationKey: string,
	locale: Locale,
): Promise<PostEntry | undefined> {
	const rawPosts = await getRawPosts();
	const group = groupPosts(rawPosts).find(
		(item) => item.translationKey === translationKey,
	);
	if (!group) {
		return undefined;
	}
	return resolvePostVariant(group, locale);
}

export type PostForList = {
	slug: string;
	data: CollectionEntry<"posts">["data"] & {
		categoryKey: CategoryKey | null;
		tagKeys: TagKey[];
		tagLabels: string[];
	};
};

export async function getSortedPostsList(locale: Locale): Promise<PostForList[]> {
	const sortedFullPosts = await getSortedPosts(locale);
	return sortedFullPosts.map((post) => ({
		slug: getPostSlug(post),
		data: {
			...post.data,
			categoryKey: getCategoryKey(post),
			tagKeys: post.data.tags.map((tag: string) => normalizeTagKey(tag)),
			tagLabels: getTagLabels(post.data.tags, locale),
		},
	}));
}

export type Tag = {
	key: TagKey;
	name: string;
	count: number;
};

export async function getTagList(locale: Locale): Promise<Tag[]> {
	const posts = await getSortedPosts(locale);
	const countMap = new Map<TagKey, number>();
	posts.forEach((post: { data: { tags: string[] } }) => {
		post.data.tags.forEach((tag: string) => {
			const tagKey = normalizeTagKey(tag);
			countMap.set(tagKey, (countMap.get(tagKey) || 0) + 1);
		});
	});

	const keys = Array.from(countMap.keys()).sort((a, b) => {
		return getTagLabel(a, locale)
			.toLowerCase()
			.localeCompare(getTagLabel(b, locale).toLowerCase());
	});

	return keys.map((key) => ({
		key,
		name: getTagLabel(key, locale),
		count: countMap.get(key) || 0,
	}));
}

export type Category = {
	key: CategoryKey | null;
	name: string;
	count: number;
	url: string;
};

export async function getCategoryList(locale: Locale): Promise<Category[]> {
	const posts = await getSortedPosts(locale);
	const count = new Map<CategoryKey | null, number>();
	posts.forEach((post) => {
		const categoryKey = getCategoryKey(post);
		count.set(categoryKey, (count.get(categoryKey) || 0) + 1);
	});

	const keys = Array.from(count.keys()).sort((a, b) => {
		if (a === null) return 1;
		if (b === null) return -1;
		return getCategoryLabel(a, locale)
			.toLowerCase()
			.localeCompare(getCategoryLabel(b, locale).toLowerCase());
	});

	return keys.map((key) => ({
		key,
		name: getCategoryLabel(key, locale),
		count: count.get(key) || 0,
		url: getCategoryUrl(key, locale),
	}));
}

function detectSpecLocale(entry: SpecEntry): Locale {
	if (entry.data.locale) {
		return entry.data.locale;
	}
	const sourcePath = entry.filePath ? normalizeContentPath(entry.filePath) : entry.id;
	if (sourcePath.endsWith(".en") || sourcePath.endsWith(".en.md")) {
		return "en";
	}
	return "zh";
}

function getSpecTranslationKey(entry: SpecEntry): string {
	if (entry.data.translationKey) {
		return entry.data.translationKey;
	}
	const sourcePath = entry.filePath ? normalizeContentPath(entry.filePath) : entry.id;
	const marker = "src/content/spec/";
	const markerIndex = sourcePath.indexOf(marker);
	const relativePath = markerIndex >= 0
		? sourcePath.slice(markerIndex + marker.length)
		: sourcePath;
	return stripLocaleSuffix(stripMarkdownExtension(relativePath));
}

export async function getLocalizedSpecEntry(
	id: string,
	locale: Locale,
): Promise<SpecEntry | undefined> {
	const entries = await getCollection("spec");
	const matched = entries.filter((entry) => getSpecTranslationKey(entry) === id);
	const exact = matched.find((entry) => detectSpecLocale(entry) === locale);
	if (exact) {
		return exact;
	}
	const fallbackLocale: Locale = locale === "zh" ? "en" : "zh";
	const fallback = matched.find(
		(entry) => detectSpecLocale(entry) === fallbackLocale,
	);
	if (fallback) {
		return fallback;
	}
	return getEntry("spec", id);
}
