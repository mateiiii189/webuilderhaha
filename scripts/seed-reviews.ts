import { createClient } from "@sanity/client";

type SeedCommand = "seed" | "delete";

type DemoReview = {
  _id: string;
  _type: "review";
  company: string;
  project: string;
  rating: number;
  text: string;
  publishedAt: string;
  isPinned: boolean;
};

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
  process.env.SANITY_STUDIO_PROJECT_ID;

const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ??
  process.env.SANITY_STUDIO_DATASET ??
  "production";

const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId) {
  throw new Error(
    "Lipsește NEXT_PUBLIC_SANITY_PROJECT_ID sau SANITY_STUDIO_PROJECT_ID.",
  );
}

if (!token) {
  throw new Error(
    "Lipsește SANITY_WRITE_TOKEN. Creează un token Sanity cu drept de scriere și adaugă-l în .env.local.",
  );
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-03-01",
  useCdn: false,
});

const PROJECTS = [
  "Website de prezentare",
  "Landing page",
  "Website cu programări",
  "Redesign website",
  "Magazin online",
  "Platformă web",
] as const;

const COLLABORATION = [
  "foarte clară și bine organizată",
  "rapidă, transparentă și fără blocaje",
  "profesionistă de la prima discuție până la lansare",
  "bine structurată, cu actualizări constante",
  "ușor de urmărit și orientată spre soluții",
  "mult mai simplă decât ne așteptam",
  "serioasă, atentă și eficientă",
  "bine coordonată pe tot parcursul proiectului",
] as const;

const RESULTS = [
  "un website modern și ușor de folosit",
  "o structură mult mai clară pentru serviciile noastre",
  "o experiență online care ne reprezintă mai bine",
  "un site rapid, coerent și pregătit pentru conversii",
  "un proces de programare mult mai simplu pentru clienți",
  "o fundație tehnică solidă pentru dezvoltările viitoare",
  "o prezentare profesionistă și mai multă încredere online",
  "un proiect curat, bine optimizat și ușor de administrat",
] as const;

const IMPACT = [
  "putem prezenta oferta mult mai convingător",
  "clienții găsesc mai repede informațiile importante",
  "procesul nostru online este mai simplu",
  "avem o imagine mult mai profesionistă",
  "site-ul se încarcă mai repede și este mai clar",
  "putem continua dezvoltarea fără să refacem totul",
  "primim cereri mai bine informate",
  "echipa economisește timp în activitatea zilnică",
] as const;

function pad(value: number): string {
  return String(value).padStart(3, "0");
}

function createReview(index: number): DemoReview {
  const number = index + 1;

  const project =
    PROJECTS[index % PROJECTS.length];

  const collaboration =
    COLLABORATION[index % COLLABORATION.length];

  const result =
    RESULTS[(index * 3) % RESULTS.length];

  const impact =
    IMPACT[(index * 5) % IMPACT.length];

  const publishedAt = new Date(
    Date.now() -
      index * 24 * 60 * 60 * 1000,
  ).toISOString();

  return {
    _id: `review-demo-${pad(number)}`,
    _type: "review",
    company: `DEMO • Companie ${pad(number)}`,
    project: `Date de test — ${project}`,
    rating: number % 7 === 0 ? 4 : 5,
    text:
      `[TEST ${pad(number)}] Colaborarea a fost ${collaboration}. ` +
      `Am primit ${result}, iar acum ${impact}.`,
    publishedAt,
    isPinned: number === 1,
  };
}

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
      items.slice(index, index + size),
    );
  }

  return chunks;
}

async function seedReviews(
  count: number,
): Promise<void> {
  if (
    !Number.isInteger(count) ||
    count < 1 ||
    count > 1000
  ) {
    throw new Error(
      "Numărul trebuie să fie un întreg între 1 și 1000.",
    );
  }

  const documents = Array.from(
    { length: count },
    (_, index) => createReview(index),
  );

  const chunks = splitIntoChunks(
    documents,
    20,
  );

  console.log(
    `Creez sau actualizez ${count} review-uri DEMO în dataset-ul "${dataset}"...`,
  );

  for (
    let index = 0;
    index < chunks.length;
    index += 1
  ) {
    let transaction = client.transaction();

    for (const document of chunks[index]) {
      transaction =
        transaction.createOrReplace(
          document,
        );
    }

    await transaction.commit();

    console.log(
      `Lot ${index + 1}/${chunks.length} finalizat (${chunks[index].length} documente).`,
    );
  }

  console.log(
    `Gata. Au fost create sau actualizate ${count} review-uri DEMO.`,
  );
}

async function deleteDemoReviews(): Promise<void> {
  const ids = await client.fetch<string[]>(
    `*[_type == "review" && _id match "review-demo-*"]._id`,
  );

  if (ids.length === 0) {
    console.log(
      "Nu există review-uri DEMO de șters.",
    );
    return;
  }

  const chunks = splitIntoChunks(ids, 50);

  console.log(
    `Șterg ${ids.length} review-uri DEMO din dataset-ul "${dataset}"...`,
  );

  for (
    let index = 0;
    index < chunks.length;
    index += 1
  ) {
    let transaction = client.transaction();

    for (const id of chunks[index]) {
      transaction = transaction.delete(id);
    }

    await transaction.commit();

    console.log(
      `Lot ${index + 1}/${chunks.length} șters (${chunks[index].length} documente).`,
    );
  }

  console.log(
    "Toate review-urile DEMO au fost șterse.",
  );
}

function parseCommand(
  value: string | undefined,
): SeedCommand {
  if (!value || value === "seed") {
    return "seed";
  }

  if (value === "delete") {
    return "delete";
  }

  throw new Error(
    'Comandă invalidă. Folosește "seed" sau "delete".',
  );
}

async function main(): Promise<void> {
  const command = parseCommand(
    process.argv[2],
  );

  const count = Number(
    process.argv[3] ?? 100,
  );

  if (command === "seed") {
    await seedReviews(count);
    return;
  }

  await deleteDemoReviews();
}

main().catch((error: unknown) => {
  console.error(
    "\nScriptul pentru review-uri a eșuat:",
  );

  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(error);
  }

  process.exitCode = 1;
});