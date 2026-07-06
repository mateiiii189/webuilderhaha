import { defineField, defineType } from "sanity";

export const reviewType = defineType({
  name: "review",
  title: "Reviews",
  type: "document",
  fields: [
    defineField({
      name: "company",
      title: "Company / Brand Name",
      type: "string",
      description: "Numele firmei/clientului cu care ai colaborat.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "brandImage",
      title: "Brand Image / Logo",
      type: "image",
      description: "Logo-ul firmei, poza brandului sau o imagine reprezentativă.",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "project",
      title: "Project Type",
      type: "string",
      description: "Ex: Website prezentare, Landing page, Magazin online",
    }),

    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5),
    }),

    defineField({
      name: "text",
      title: "Review Text",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "isFeatured",
      title: "Featured Review",
      type: "boolean",
      initialValue: true,
    }),

    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: "company",
      subtitle: "project",
      media: "brandImage",
      rating: "rating",
    },
    prepare({ title, subtitle, media, rating }) {
      return {
        title,
        subtitle: `${subtitle || "Review"} · ${rating || 5}/5`,
        media,
      };
    },
  },
});