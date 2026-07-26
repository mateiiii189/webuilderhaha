import "server-only";

import { createClient } from "next-sanity";

const projectId =
  process.env
    .NEXT_PUBLIC_SANITY_PROJECT_ID;

const dataset =
  process.env
    .NEXT_PUBLIC_SANITY_DATASET;

const token =
  process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  throw new Error(
    "Lipsește NEXT_PUBLIC_SANITY_PROJECT_ID.",
  );
}

if (!dataset) {
  throw new Error(
    "Lipsește NEXT_PUBLIC_SANITY_DATASET.",
  );
}

export const writeClient =
  createClient({
    projectId,
    dataset,
    apiVersion: "2026-07-01",
    useCdn: false,
    token,
  });