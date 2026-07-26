import { loadEnvConfig } from "@next/env";
import { createClient } from "@sanity/client";

loadEnvConfig(process.cwd());

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
  process.env.SANITY_STUDIO_PROJECT_ID;

const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ??
  process.env.SANITY_STUDIO_DATASET ??
  "production";

const token =
  process.env.SANITY_WRITE_TOKEN;

if (!projectId) {
  throw new Error(
    "Lipsește NEXT_PUBLIC_SANITY_PROJECT_ID sau SANITY_STUDIO_PROJECT_ID în .env.local.",
  );
}

if (!token) {
  throw new Error(
    "Lipsește SANITY_WRITE_TOKEN în .env.local.",
  );
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-03-01",
  useCdn: false,
});

function splitIntoChunks<T>(
  items: T[],
  size: number,
): T[][] {
  const chunks: T[][] = [];

  for (
    let index = 0;
    index < items.length;
    index += size
  ) {
    chunks.push(
      items.slice(
        index,
        index + size,
      ),
    );
  }

  return chunks;
}

async function deleteAllTestimonials(): Promise<void> {
  /*
   * Șterge absolut toate documentele de tip review:
   * - review-uri DEMO;
   * - review-uri create manual;
   * - review-uri pinned;
   * - orice testimonial existent în dataset.
   */
  const ids =
    await client.fetch<string[]>(
      `*[_type == "review"]._id`,
    );

  if (ids.length === 0) {
    console.log(
      `Nu există testimoniale în dataset-ul "${dataset}".`,
    );
    return;
  }

  console.log(
    `Șterg ${ids.length} testimoniale din dataset-ul "${dataset}"...`,
  );

  const chunks =
    splitIntoChunks(
      ids,
      50,
    );

  for (
    let index = 0;
    index < chunks.length;
    index += 1
  ) {
    let transaction =
      client.transaction();

    for (const id of chunks[index]) {
      transaction =
        transaction.delete(id);
    }

    await transaction.commit();

    console.log(
      `Lot ${index + 1}/${chunks.length} șters (${chunks[index].length} documente).`,
    );
  }

  console.log(
    "Gata. Toate testimonialele au fost șterse complet.",
  );
}

deleteAllTestimonials().catch(
  (error: unknown) => {
    console.error(
      "\nȘtergerea testimonialelor a eșuat:",
    );

    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }

    process.exitCode = 1;
  },
);