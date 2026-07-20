import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const bilingual = z.object({
  id: z.string(),
  en: z.string(),
});

const news = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/news" }),
  schema: z.object({
    title: bilingual,
    category: bilingual,
    image: z.string(),
    year: z.string(),
    tag: bilingual,
    featured: z.boolean().default(false),
    readTime: z.string().optional(),
    meta: bilingual.optional(),
    order: z.number().default(0),
  }),
});

const members = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/members" }),
  schema: z.object({
    type: z.string(),
    name: z.string(),
    location: z.string(),
    order: z.number().default(0),
  }),
});

const destinationRegions = [
  "Papua",
  "Sulawesi",
  "NTT / NTB",
  "Bali",
  "Maluku",
  "Kalimantan",
] as const;

const destinations = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/destinations" }),
  schema: z.object({
    region: z.enum(destinationRegions),
    image: z.string(),
    province: z.string(),
    name: z.string(),
    tagline: bilingual,
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = { news, members, destinations };

export { destinationRegions };
