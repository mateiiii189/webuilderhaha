import {
  defineField,
  defineType,
} from "sanity";

export const reviewType = defineType({
  name: "review",
  title: "Reviews",
  type: "document",

  fields: [
    defineField({
      name: "company",
      title: "Company / Brand Name",
      type: "string",
      description:
        "Numele firmei/clientului cu care ai colaborat.",
      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: "brandImage",
      title: "Brand Image / Logo",
      type: "image",
      description:
        "Logo-ul firmei, poza brandului sau o imagine reprezentativă.",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "project",
      title: "Project Type",
      type: "string",
      description:
        "Ex: Website prezentare, Landing page, Magazin online.",
    }),

    defineField({
      name: "websiteUrl",
      title: "Client Website URL",
      type: "url",
      description:
        "Website-ul construit pentru client. Logo-ul și numele companiei vor trimite către acest URL.",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
          allowRelative: false,
        }),
    }),

    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      initialValue: 5,
      validation: (Rule) =>
        Rule.required().min(1).max(5),
    }),

    defineField({
      name: "text",
      title: "Review Text",
      type: "text",
      rows: 6,
      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: "isPinned",
      title: "Testimonial evidențiat",
      type: "boolean",
      initialValue: false,
      description:
        "Dacă este activ, testimonialul apare în cardul mare din partea de sus.",
    }),

    defineField({
      name: "isPublished",
      title: "Publicat pe website",
      type: "boolean",
      initialValue: true,
      description:
        "Dacă este dezactivat, testimonialul rămâne în Sanity, dar nu apare pe website.",
    }),

    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () =>
        new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: "company",
      project: "project",
      media: "brandImage",
      rating: "rating",
      isPinned: "isPinned",
      isPublished: "isPublished",
    },
    prepare({
      title,
      project,
      media,
      rating,
      isPinned,
      isPublished,
    }) {
      return {
        title: `${isPinned ? "📌 " : ""}${
          title || "Testimonial fără nume"
        }`,
        subtitle: `${project || "Testimonial"} · ${
          rating || 5
        }/5${isPinned ? " — Pinned" : ""}${
          isPublished === false
            ? " — Ascuns"
            : ""
        }`,
        media,
      };
    },
  },
});
