import {
  defineField,
  defineType,
} from "sanity";

export const portfolioProjectType = defineType({
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
      title: "Titlu",
      type: "string",
      group: "general",
      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: "category",
      title: "Categorie",
      type: "string",
      group: "general",
      description:
        "Ex: Website de prezentare, Magazin online, Platformă de servicii.",
      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Descriere",
      type: "text",
      rows: 4,
      group: "general",
      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: "tags",
      title: "Etichete",
      type: "array",
      group: "general",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        layout: "tags",
      },
    }),

    defineField({
      name: "demoUrl",
      title: "URL proiect live",
      type: "url",
      group: "general",
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ["http", "https"],
          allowRelative: false,
        }),
    }),

    defineField({
      name: "previewImage",
      title: "Captură homepage",
      type: "image",
      group: "general",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "isPublished",
      title: "Publicat pe website",
      type: "boolean",
      group: "visibility",
      initialValue: true,
      description:
        "Dacă este dezactivat, proiectul rămâne în Sanity, dar nu apare public.",
    }),

    defineField({
      name: "isPinned",
      title: "Pinned",
      type: "boolean",
      group: "visibility",
      initialValue: false,
      description:
        "Proiectul apare în cardul principal din partea de sus.",
    }),

    defineField({
      name: "isFeatured",
      title: "Proiect selectat",
      type: "boolean",
      group: "visibility",
      initialValue: false,
      description:
        "Include proiectul în carouselul de proiecte selectate.",
    }),

    defineField({
      name: "publishedAt",
      title: "Data publicării",
      type: "datetime",
      group: "visibility",
      initialValue: () =>
        new Date().toISOString(),
    }),

    defineField({
      name: "refreshScreenshot",
      title: "Regenerează captura",
      type: "boolean",
      group: "screenshot",
      initialValue: false,
      description:
        "Activează opțiunea și publică documentul pentru a genera din nou captura proiectului.",
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
      rows: 5,
      group: "screenshot",
      readOnly: true,
    }),
  ],

  preview: {
    select: {
      title: "title",
      category: "category",
      media: "previewImage",
      isPinned: "isPinned",
      isFeatured: "isFeatured",
      isPublished: "isPublished",
      screenshotError: "screenshotError",
    },
    prepare({
      title,
      category,
      media,
      isPinned,
      isFeatured,
      isPublished,
      screenshotError,
    }) {
      const statuses = [
        isPinned ? "📌 Pinned" : "",
        isFeatured ? "Selectat" : "",
        isPublished === false
          ? "Ascuns"
          : "",
        screenshotError
          ? "Captură eșuată"
          : "",
      ].filter(Boolean);

      return {
        title: `${isPinned ? "📌 " : ""}${
          title || "Proiect fără titlu"
        }`,
        subtitle: [
          category || "Fără categorie",
          ...statuses,
        ].join(" — "),
        media,
      };
    },
  },
});
