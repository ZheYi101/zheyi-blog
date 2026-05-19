import { type CollectionEntry, getCollection, getEntry } from "astro:content";
import type { Locale } from "@/types/config";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { getCategoryUrl } from "@utils/url-utils.ts";

type PostEntry = CollectionEntry<"posts">;
type SpecEntry = CollectionEntry<"spec">;

export type CategoryKey = "frontend" | "campus-misc";

export type CategoryLabel = {
	zh: string;
	en: string;
};

export const CATEGORY_LABELS: Record<CategoryKey, CategoryLabel> = {
	frontend: {
		zh: "前端",
		en: "Frontend",
	},
	"campus-misc": {
		zh: "校园&杂谈",
		en: "Campus & Misc",
	},
};

type PostGroup = {
	translationKey: string;
	variants: PostEntry[];
};

function detectPostLocale(post: PostEntry): Locale {
	if (post.data.locale) {
		return post.data.locale;
	}
	if (post.data.lang?.toLowerCase().startsWith("en")) {
		return "en";
	}
	if (post.id.endsWith(".en.md") || post.slug.endsWith(".en")) {
		return "en";
	}
	return "zh";
}

export function getPostTranslationKey(post: PostEntry): string {
	if (post.data.translationKey) {
		return post.data.translationKey;
	}
	return post.slug.replace(/\.(zh|en)$/i, "");
}

export function getCategoryKey(post: Pick<PostEntry, "data">): CategoryKey | null {
	const rawKey = post.data.categoryKey?.trim();
	if (rawKey === "frontend" || rawKey === "campus-misc") {
		return rawKey;
	}
	const rawCategory = post.data.category?.trim();
	if (rawCategory === "前端") {
		return "frontend";
	}
	if (rawCategory === "校园&杂谈") {
		return "campus-misc";
	}
	return null;
}

export function getCategoryLabel(categoryKey: CategoryKey | null, locale: Locale): string {
	if (!categoryKey) {
		return i18n(locale, I18nKey.uncategorized);
	}
	return CATEGORY_LABELS[categoryKey][locale];
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
		sorted[i].data.nextSlug = sorted[i - 1].slug;
		sorted[i].data.nextTitle = sorted[i - 1].data.title;
	}
	for (let i = 0; i < sorted.length - 1; i++) {
		sorted[i].data.prevSlug = sorted[i + 1].slug;
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
	data: CollectionEntry<"posts">["data"];
};

export async function getSortedPostsList(locale: Locale): Promise<PostForList[]> {
	const sortedFullPosts = await getSortedPosts(locale);
	return sortedFullPosts.map((post) => ({
		slug: post.slug,
		data: post.data,
	}));
}

export type Tag = {
	name: string;
	count: number;
};

export async function getTagList(locale: Locale): Promise<Tag[]> {
	const posts = await getSortedPosts(locale);
	const countMap: { [key: string]: number } = {};
	posts.forEach((post: { data: { tags: string[] } }) => {
		post.data.tags.forEach((tag: string) => {
			if (!countMap[tag]) countMap[tag] = 0;
			countMap[tag]++;
		});
	});

	const keys: string[] = Object.keys(countMap).sort((a, b) => {
		return a.toLowerCase().localeCompare(b.toLowerCase());
	});

	return keys.map((key) => ({ name: key, count: countMap[key] }));
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
	if (entry.id.endsWith(".en") || entry.id.endsWith(".en.md")) {
		return "en";
	}
	return "zh";
}

function getSpecTranslationKey(entry: SpecEntry): string {
	if (entry.data.translationKey) {
		return entry.data.translationKey;
	}
	return entry.id.replace(/\.(zh|en)$/i, "");
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
