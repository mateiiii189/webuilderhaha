import { loadEnvConfig } from "@next/env";
import { createClient } from "@sanity/client";

loadEnvConfig(process.cwd());

console.log("Seed script started...");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId) {
  throw new Error("Lipsește NEXT_PUBLIC_SANITY_PROJECT_ID în .env.local");
}

if (!token) {
  throw new Error("Lipsește SANITY_WRITE_TOKEN în .env.local");
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const postTypes = ["seo", "social", "caseStudy", "update"] as const;

function key() {
  return Math.random().toString(36).slice(2, 12);
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function createBlock(text: string) {
  return {
    _key: key(),
    _type: "block",
    style: "normal",
    children: [
      {
        _key: key(),
        _type: "span",
        text,
        marks: [],
      },
    ],
    markDefs: [],
  };
}

function createHeading(text: string) {
  return {
    _key: key(),
    _type: "block",
    style: "h2",
    children: [
      {
        _key: key(),
        _type: "span",
        text,
        marks: [],
      },
    ],
    markDefs: [],
  };
}

async function seedPosts() {
  const totalPosts = 100;

  console.log(`Creating ${totalPosts} blog posts...`);

  for (let index = 1; index <= totalPosts; index += 1) {
    const title = `Test articol ${index}`;
    const slug = slugify(title);
    const postType = postTypes[index % postTypes.length];

    const publishedAt = new Date(
      Date.now() - index * 1000 * 60 * 60 * 24
    ).toISOString();

    await client.createIfNotExists({
      _id: `post-test-${index}`,
      _type: "post",
      title,
      slug: {
        _type: "slug",
        current: slug,
      },
      excerpt:
        "Acesta este un articol de test pentru verificarea paginării, designului și afișării articolelor în blog.",
      seoDescription:
        "Articol de test generat automat pentru verificarea paginii de blog.",
      publishedAt,
      postType,
      isPinned: false,
      body: [
        createHeading("Introducere"),
        createBlock(
          "Acesta este un paragraf de test pentru articol. Textul este folosit pentru a verifica layout-ul paginii de articol."
        ),
        createHeading("De ce contează website-ul"),
        createBlock(
          "Un website clar, rapid și bine structurat poate ajuta o firmă să transmită mai multă încredere online."
        ),
        createHeading("Concluzie"),
        createBlock(
          "Acest articol a fost generat automat pentru testarea sistemului de blog."
        ),
      ],
    });

    console.log(`Created: ${title}`);
  }

  console.log("Done.");
}

seedPosts().catch((error) => {
  console.error("Seed failed:");
  console.error(error);
  process.exit(1);
});