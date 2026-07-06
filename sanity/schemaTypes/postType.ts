import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Descriere scurtă afișată pe pagina de blog.',
      validation: (Rule) => Rule.required().max(180),
    }),

    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Meta description pentru Google.',
      validation: (Rule) => Rule.max(160),
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        },
      ],
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
    }),

    defineField({
      name: 'postType',
      title: 'Post Type',
      type: 'string',
      options: {
        list: [
          {title: 'SEO Article', value: 'seo'},
          {title: 'Social Embed', value: 'social'},
          {title: 'Case Study', value: 'caseStudy'},
          {title: 'Update', value: 'update'},
        ],
        layout: 'radio',
      },
      initialValue: 'seo',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'isPinned',
      title: 'Pinned Article',
      type: 'boolean',
      description:
        'Dacă este bifat, articolul apare mare pe pagina de blog indiferent de data publicării.',
      initialValue: false,
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'excerpt',
      media: 'coverImage',
      isPinned: 'isPinned',
    },
    prepare({title, subtitle, media, isPinned}) {
      return {
        title: isPinned ? `📌 ${title}` : title,
        subtitle,
        media,
      }
    },
  },
})