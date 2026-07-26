import { loadEnvConfig } from "@next/env";
import {
  createClient,
  type SanityClient,
} from "@sanity/client";

loadEnvConfig(process.cwd());

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET;

const token =
  process.env.SANITY_WRITE_TOKEN;

if (!projectId) {
  throw new Error(
    "Lipsește NEXT_PUBLIC_SANITY_PROJECT_ID din .env.local",
  );
}

if (!dataset) {
  throw new Error(
    "Lipsește NEXT_PUBLIC_SANITY_DATASET din .env.local",
  );
}

if (!token) {
  throw new Error(
    "Lipsește SANITY_API_WRITE_TOKEN din .env.local",
  );
}

const client: SanityClient =
  createClient({
    projectId,
    dataset,
    token,
    apiVersion: "2025-01-01",
    useCdn: false,
  });

type PortfolioProjectSeed = {
  _id: string;
  _type: "portfolioProject";
  title: string;
  category: string;
  description: string;
  tags: string[];
  demoUrl: string;
  isPinned: boolean;
  publishedAt: string;
};

const projectNames = [
  "Fitness Studio",
  "Dental Clinic",
  "Auto Service",
  "Restaurant Premium",
  "Real Estate Group",
  "Beauty Concept",
  "Logistics Company",
  "Law Office",
  "Medical Center",
  "Construction Group",
  "Accounting Office",
  "Architecture Studio",
  "Luxury Apartments",
  "Car Rental",
  "Travel Agency",
  "Coffee House",
  "Digital Agency",
  "Online Academy",
  "Event Planner",
  "Interior Design",
];

const categories = [
  "Website de prezentare",
  "Website cu programări",
  "Magazin online",
  "Platformă de servicii",
  "Website pentru lead-uri",
  "Platformă de rezervări",
];

const descriptions = [
  "Demo modern construit pentru prezentarea serviciilor, generarea de cereri și consolidarea prezenței online.",
  "Website premium cu structură clară, pagini de servicii și apeluri la acțiune bine poziționate.",
  "Experiență digitală rapidă și modernă, construită pentru transformarea vizitatorilor în potențiali clienți.",
  "Platformă adaptată industriei, cu navigare intuitivă, design premium și structură SEO realistă.",
  "Demo complet pentru o companie care are nevoie de mai multă claritate, credibilitate și conversii online.",
];

const tagGroups = [
  [
    "Servicii",
    "Lead-uri",
    "Contact rapid",
  ],
  [
    "Programări",
    "Automatizare",
    "Conversii",
  ],
  [
    "Magazin",
    "Produse",
    "Comenzi",
  ],
  [
    "Prezentare",
    "SEO",
    "Branding",
  ],
  [
    "Premium",
    "Responsive",
    "Performanță",
  ],
  [
    "Rezervări",
    "Clienți",
    "Experiență",
  ],
];

function padNumber(
  value: number,
): string {
  return String(value).padStart(
    3,
    "0",
  );
}

function createPortfolioProject(
  index: number,
): PortfolioProjectSeed {
  const projectNumber = index + 1;

  const paddedNumber =
    padNumber(projectNumber);

  const publishedAt = new Date(
    Date.now() -
      index *
        24 *
        60 *
        60 *
        1000,
  ).toISOString();

  return {
    _id: `portfolio-project-${paddedNumber}`,
    _type: "portfolioProject",

    title: `${
      projectNames[
        index % projectNames.length
      ]
    } ${paddedNumber}`,

    category:
      categories[
        index % categories.length
      ],

    description:
      descriptions[
        index % descriptions.length
      ],

    tags:
      tagGroups[
        index % tagGroups.length
      ],

    demoUrl: `https://example.com/demo-${paddedNumber}`,

    isPinned: index === 0,

    publishedAt,
  };
}

async function unpinExistingProjects(): Promise<void> {
  const pinnedProjectIds =
    await client.fetch<string[]>(
      `*[
        _type == "portfolioProject" &&
        isPinned == true
      ]._id`,
    );

  if (
    pinnedProjectIds.length === 0
  ) {
    return;
  }

  let transaction =
    client.transaction();

  for (const documentId of pinnedProjectIds) {
    transaction = transaction.patch(
      documentId,
      {
        set: {
          isPinned: false,
        },
      },
    );
  }

  await transaction.commit();

  console.log(
    `Au fost dezactivate ${pinnedProjectIds.length} proiecte pinned existente.`,
  );
}

async function seedProjects(): Promise<void> {
  const projects =
    Array.from(
      {
        length: 100,
      },
      (_, index) =>
        createPortfolioProject(index),
    );

  const batchSize = 25;

  for (
    let startIndex = 0;
    startIndex < projects.length;
    startIndex += batchSize
  ) {
    const batch = projects.slice(
      startIndex,
      startIndex + batchSize,
    );

    let transaction =
      client.transaction();

    for (const project of batch) {
      transaction =
        transaction.createOrReplace(
          project,
        );
    }

    await transaction.commit();

    const firstProject =
      startIndex + 1;

    const lastProject = Math.min(
      startIndex + batch.length,
      projects.length,
    );

    console.log(
      `Create proiectele ${firstProject}–${lastProject}.`,
    );
  }
}

async function main(): Promise<void> {
  try {
    console.log(
      `Se creează proiectele în dataset-ul "${dataset}"...`,
    );

    await unpinExistingProjects();
    await seedProjects();

    console.log(
      "Au fost create sau actualizate 100 de proiecte.",
    );

    console.log(
      "portfolio-project-001 a fost setat ca pinned.",
    );
  } catch (error: unknown) {
    console.error(
      "Seed-ul proiectelor a eșuat:",
      error,
    );

    process.exitCode = 1;
  }
}

void main();