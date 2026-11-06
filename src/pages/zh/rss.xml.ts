import { createRss } from "@utils/rss-utils";
import type { APIRoute } from "astro";
export const GET: APIRoute = (context) => createRss(context, "zh");
