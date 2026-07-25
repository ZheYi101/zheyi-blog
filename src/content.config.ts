import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const postsCollection = defineCollection({
	loader: glob({
		base: "./src/content/posts",
		pattern: "**/*.{md,mdx}",
	}),
	schema: z.object({
		title: z.string(),
		published: z.date(),
		updated: z.date().optional(),
		draft: z.boolean().optional().default(false),
		description: z.string().optional().default(""),
		image: z.string().optional().default(""),
		tags: z.array(z.string()).optional().default([]),
		lang: z.string().optional().default(""),

		/* For internal use */
		prevTitle: z.string().default(""),
		prevSlug: z.string().default(""),
		nextTitle: z.string().default(""),
		nextSlug: z.string().default(""),
	}),
});
const specCollection = defineCollection({
	loader: glob({
		base: "./src/content/spec",
		pattern: "**/*.{md,mdx}",
	}),
	schema: z.object({
		title: z.string().optional().default(""),
		published: z.date().optional(),
		draft: z.boolean().optional().default(false),
		locale: z.enum(["zh", "en"]).optional(),
		translationKey: z.string().optional().default(""),
	}),
});
export const collections = {
	posts: postsCollection,
	spec: specCollection,
};
