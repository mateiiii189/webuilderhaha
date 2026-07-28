import {
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",

  groups: [
    {
      name: "content",
      title: "Conținut",
      default: true,
    },
    {
      name: "publishing",
      title: "Publicare",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],

  fields: [
    defineField({
      name: "title",
      title: "Titlu",
      type: "string",
      group: "content",
      validation: (Rule) =>
        Rule.required().min(3),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: "authorName",
      title: "Author",
      type: "string",
      group: "content",
      initialValue: "Webuilder",
      description:
        "Numele afișat ca autor. Valoarea implicită este Webuilder și poate fi modificată pentru fiecare articol.",
      validation: (Rule) =>
        Rule.required().min(2),
    }),

    defineField({
      name: "categories",
      title: "Category",
      type: "array",
      group: "content",
      description:
        "Scrie una sau mai multe etichete. Valori uzuale: SEO Article, Social Embed, Case Study și Update. Poți adăuga orice categorie custom.",
      of: [
        defineArrayMember({
          type: "string",
        }),
      ],
      options: {
        layout: "tags",
      },
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .unique(),
    }),

    defineField({
      name: "excerpt",
      title: "Descriere scurtă",
      type: "text",
      rows: 4,
      group: "content",
      validation: (Rule) =>
        Rule.required().min(20),
    }),

    defineField({
      name: "coverImage",
      title: "Imagine principală",
      type: "image",
      group: "content",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "body",
      title: "Conținut articol",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            {
              title: "Normal",
              value: "normal",
            },
            {
              title: "H2",
              value: "h2",
            },
            {
              title: "H3",
              value: "h3",
            },
            {
              title: "Citat",
              value: "blockquote",
            },
          ],
          lists: [
            {
              title: "Bullets",
              value: "bullet",
            },
            {
              title: "Numere",
              value: "number",
            },
          ],
          marks: {
            decorators: [
              {
                title: "Bold",
                value: "strong",
              },
              {
                title: "Italic",
                value: "em",
              },
              {
                title: "Underline",
                value: "underline",
              },
            ],
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: [
                          "http",
                          "https",
                          "mailto",
                          "tel",
                        ],
                      }),
                  }),
                  defineField({
                    name: "openInNewTab",
                    title: "Deschide în tab nou",
                    type: "boolean",
                    initialValue: true,
                  }),
                ],
              },
            ],
          },
        }),

        defineArrayMember({
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              title: "Text alternativ",
              type: "string",
            }),
            defineField({
              name: "caption",
              title: "Descriere imagine",
              type: "string",
            }),
          ],
        }),
      ],
      validation: (Rule) =>
        Rule.required().min(1),
    }),

    defineField({
      name: "readingTime",
      title: "Timp de citire",
      type: "number",
      group: "content",
      initialValue: 5,
      description: "Număr de minute.",
      validation: (Rule) =>
        Rule.required().integer().min(1),
    }),

    defineField({
      name: "isPinned",
      title: "Pinned",
      type: "boolean",
      group: "publishing",
      initialValue: false,
      description:
        "Articolul este evidențiat înaintea celorlalte articole.",
    }),

    defineField({
      name: "isPublished",
      title: "Publicat pe website",
      type: "boolean",
      group: "publishing",
      initialValue: true,
      description:
        "Dacă este dezactivat, articolul rămâne în Sanity, dar nu apare public pe website.",
    }),

    defineField({
      name: "publishedAt",
      title: "Data publicării",
      type: "datetime",
      group: "publishing",
      initialValue: () =>
        new Date().toISOString(),
      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: "seoDescription",
      title: "Descriere SEO",
      type: "text",
      rows: 3,
      group: "seo",
      description:
        "Descrierea folosită pentru Google și distribuirea articolului.",
      validation: (Rule) =>
        Rule.max(170),
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "authorName",
      categories: "categories",
      media: "coverImage",
      isPinned: "isPinned",
      isPublished: "isPublished",
    },
    prepare({
      title,
      author,
      categories,
      media,
      isPinned,
      isPublished,
    }) {
      const categoryText = Array.isArray(
        categories,
      )
        ? categories.join(" · ")
        : "Fără categorie";

      return {
        title: `${isPinned ? "📌 " : ""}${
          title || "Articol fără titlu"
        }`,
        subtitle: `${author || "Webuilder"} — ${categoryText}${
          isPinned ? " — Pinned" : ""
        }${
          isPublished === false
            ? " — Ascuns"
            : ""
        }`,
        media,
      };
    },
  },
});
