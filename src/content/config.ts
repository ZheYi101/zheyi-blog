import { defineCollection, z } from "astro:content";

const postsCollection: ReturnType<typeof defineCollection> = defineCollection({
	schema: z.object({
		title: z.string(),
		published: z.date(),
		updated: z.date().optional(),
		draft: z.boolean().optional().default(false),
		description: z.string().optional().default(""),
		image: z.string().optional().default(""),
		tags: z.array(z.string()).optional().default([]),
		category: z.string().optional().nullable().default(""),
		categoryKey: z.string().optional().nullable().default(""),
		lang: z.string().optional().default(""),
		locale: z.enum(["zh", "en"]).optional(),
		translationKey: z.string().optional().default(""),

		/* For internal use */
		prevTitle: z.string().default(""),
		prevSlug: z.string().default(""),
		nextTitle: z.string().default(""),
		nextSlug: z.string().default(""),
	}),
});
const specCollection: ReturnType<typeof defineCollection> = defineCollection({
	schema: z.object({
		title: z.string().optional().default(""),
		published: z.date().optional(),
		draft: z.boolean().optional().default(false),
		locale: z.enum(["zh", "en"]).optional(),
		translationKey: z.string().optional().default(""),
	}),
});
export const collections: {
	posts: typeof postsCollection;
	spec: typeof specCollection;
} = {
	posts: postsCollection,
	spec: specCollection,
};
