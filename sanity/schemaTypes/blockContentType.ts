import {defineArrayMember, defineType} from 'sanity'

export const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [
          {
            title: 'Link',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),

    defineArrayMember({
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          description: 'Descriere scurtă pentru SEO și accesibilitate.',
        },
      ],
    }),

    defineArrayMember({
      name: 'instagramEmbed',
      title: 'Instagram Embed',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'Instagram Post URL',
          type: 'url',
        },
      ],
      preview: {
        select: {
          url: 'url',
        },
        prepare({url}) {
          return {
            title: 'Instagram Embed',
            subtitle: url,
          }
        },
      },
    }),

    defineArrayMember({
      name: 'facebookEmbed',
      title: 'Facebook Embed',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'Facebook Post URL',
          type: 'url',
        },
      ],
      preview: {
        select: {
          url: 'url',
        },
        prepare({url}) {
          return {
            title: 'Facebook Embed',
            subtitle: url,
          }
        },
      },
    }),

    defineArrayMember({
      name: 'ctaBlock',
      title: 'CTA Block',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'text',
          title: 'Text',
          type: 'text',
          rows: 3,
        },
        {
          name: 'buttonLabel',
          title: 'Button label',
          type: 'string',
        },
        {
          name: 'buttonHref',
          title: 'Button link',
          type: 'string',
          initialValue: '/contact',
        },
      ],
      preview: {
        select: {
          title: 'title',
          subtitle: 'text',
        },
      },
    }),
  ],
})