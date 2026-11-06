import rss from "@astrojs/rss";
import { getHtmlLang } from "@i18n/locales";
import { getPostSlug, getSortedPosts } from "@utils/content-utils";
import { getHomeUrl, getPostUrlBySlug, url } from "@utils/url-utils";
import type { APIContext } from "astro";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";
import { siteConfig } from "@/config";
import type { Locale } from "@/types/config";

const parser = new MarkdownIt();

function stripInvalidXmlChars(str: string): string {
	return str.replace(
		// biome-ignore lint/suspicious/noControlCharactersInRegex: https://www.w3.org/TR/xml/#charsets
		/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]/g,
		"",
	);
}

export async function createRss(
	context: APIContext,
	locale: Locale,
): Promise<Response> {
	const blog = await getSortedPosts(locale);
	const site = context.site ?? new URL("https://zheyi.in/");

	return rss({
		title: siteConfig.title[locale],
		description: siteConfig.subtitle || "No description",
		site,
		items: blog.map((post) => {
			const content =
				typeof post.body === "string" ? post.body : String(post.body || "");
			const cleanedContent = stripInvalidXmlChars(content);
			// Keep the original Chinese GUID text, even though the public link moves.
			const legacyGuid = new URL(url(`/posts/${getPostSlug(post)}/`), site)
				.href;
			return {
				title: post.data.title,
				pubDate: post.data.published,
				description: post.data.description || "",
				link: getPostUrlBySlug(getPostSlug(post), locale),
				customData:
					locale === "zh"
						? `<guid isPermaLink="false">${escapeXml(legacyGuid)}</guid>`
						: undefined,
				content: sanitizeHtml(parser.render(cleanedContent), {
					allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
				}),
			};
		}),
		customData: `<language>${getHtmlLang(locale)}</language><link>${escapeXml(new URL(getHomeUrl(locale), site).href)}</link>`,
	});
}

function escapeXml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}
