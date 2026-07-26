import {
  defineField,
  defineType,
} from "sanity";

export const portfolioProjectType =
  defineType({
    name: "portfolioProject",
    title: "Proiecte portofoliu",
    type: "document",

    groups: [
      {
        name: "general",
        title: "Proiect",
        default: true,
      },
      {
        name: "visibility",
        title: "Afișare",
      },
      {
        name: "screenshot",
        title: "Captură automată",
      },
    ],

    fields: [
      defineField({
        name: "title",
        title: "Numele proiectului",
        type: "string",
        group: "general",
        description:
          "Exemplu: Fitness Studio, Dental Clinic sau Auto Service.",
        validation: (Rule) =>
          Rule.required()
            .min(2)
            .max(80),
      }),

      defineField({
        name: "category",
        title: "Tipul website-ului",
        type: "string",
        group: "general",
        description:
          "Exemplu: Website de prezentare sau Website cu programări.",
        validation: (Rule) =>
          Rule.required()
            .min(2)
            .max(80),
      }),

      defineField({
        name: "description",
        title: "Descriere",
        type: "text",
        group: "general",
        rows: 4,
        description:
          "Textul afișat în cardul proiectului.",
        validation: (Rule) =>
          Rule.required()
            .min(20)
            .max(320),
      }),

      defineField({
        name: "tags",
        title: "Etichete",
        type: "array",
        group: "general",
        description:
          "Exemplu: Fitness, Servicii, Lead-uri.",
        of: [
          {
            type: "string",
          },
        ],
        validation: (Rule) =>
          Rule.required()
            .min(1)
            .max(6)
            .unique(),
      }),

      defineField({
        name: "demoUrl",
        title: "URL proiect live",
        type: "url",
        group: "general",
        description:
          "Adresa externă a demo-ului sau website-ului publicat.",
        validation: (Rule) =>
          Rule.required().uri({
            scheme: [
              "http",
              "https",
            ],
            allowRelative: false,
          }),
      }),

      defineField({
        name: "previewImage",
        title: "Captură homepage",
        type: "image",
        group: "general",
        description:
          "Captura este generată automat din URL. Poate fi înlocuită și manual.",
        options: {
          hotspot: true,
        },
        fields: [
          defineField({
            name: "alt",
            title: "Text alternativ",
            type: "string",
            validation: (Rule) =>
              Rule.max(160),
          }),
        ],
      }),

      defineField({
        name: "isPublished",
        title: "Publicat pe website",
        type: "boolean",
        group: "visibility",
        description:
          "Dacă este dezactivat, proiectul rămâne în Sanity, dar nu apare public.",
        initialValue: true,
      }),

      defineField({
        name: "isPinned",
        title: "Proiect evidențiat în hero",
        type: "boolean",
        group: "visibility",
        description:
          "Apare în cardul mare din partea de sus. Dacă niciun proiect nu este evidențiat, apare cel mai recent.",
        initialValue: false,
      }),

      defineField({
        name: "isFeatured",
        title: "Afișează în carousel",
        type: "boolean",
        group: "visibility",
        description:
          "Include proiectul în carouselul cu proiecte selectate.",
        initialValue: false,
      }),

      defineField({
        name: "showOnHomepage",
        title: "Afișează pe homepage",
        type: "boolean",
        group: "visibility",
        description:
          "Include proiectul în secțiunea de portofoliu de pe homepage.",
        initialValue: false,
      }),

      defineField({
        name: "publishedAt",
        title: "Data publicării",
        type: "datetime",
        group: "visibility",
        description:
          "Controlează ordinea proiectelor. Cele mai recente apar primele.",
        initialValue: () =>
          new Date().toISOString(),
        validation: (Rule) =>
          Rule.required(),
      }),

      defineField({
        name: "refreshScreenshot",
        title: "Regenerează captura",
        type: "boolean",
        group: "screenshot",
        description:
          "Activează opțiunea și publică documentul pentru a genera din nou captura proiectului.",
        initialValue: false,
      }),

      defineField({
        name: "screenshotGeneratedAt",
        title: "Ultima captură generată",
        type: "datetime",
        group: "screenshot",
        readOnly: true,
      }),

      defineField({
        name: "screenshotSourceUrl",
        title: "URL folosit pentru captură",
        type: "url",
        group: "screenshot",
        readOnly: true,
      }),

      defineField({
        name: "screenshotError",
        title: "Eroare generare captură",
        type: "text",
        group: "screenshot",
        rows: 5,
        readOnly: true,
        hidden: ({ document }) =>
          !document?.screenshotError,
      }),
    ],

    orderings: [
      {
        title: "Cele mai recente",
        name: "publishedAtDesc",
        by: [
          {
            field: "publishedAt",
            direction: "desc",
          },
        ],
      },

      {
        title: "Cele mai vechi",
        name: "publishedAtAsc",
        by: [
          {
            field: "publishedAt",
            direction: "asc",
          },
        ],
      },

      {
        title: "Nume A–Z",
        name: "titleAsc",
        by: [
          {
            field: "title",
            direction: "asc",
          },
        ],
      },
    ],

    preview: {
      select: {
        title: "title",
        subtitle: "category",
        media: "previewImage",
        isPinned: "isPinned",
        isFeatured: "isFeatured",
        isPublished: "isPublished",
        screenshotError:
          "screenshotError",
      },

      prepare({
        title,
        subtitle,
        media,
        isPinned,
        isFeatured,
        isPublished,
        screenshotError,
      }) {
        const statuses = [
          isPinned
            ? "📌 Pinned"
            : null,

          isFeatured
            ? "⭐ Carousel"
            : null,

          isPublished === false
            ? "Ascuns"
            : null,

          screenshotError
            ? "⚠ Captură eșuată"
            : null,
        ].filter(Boolean);

        return {
          title: `${
            isPublished === false
              ? "○ "
              : ""
          }${title}`,

          subtitle: [
            subtitle ||
              "Proiect portofoliu",

            statuses.join(" · "),
          ]
            .filter(Boolean)
            .join(" — "),

          media,
        };
      },
    },
  });