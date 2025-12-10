import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'navigationBar',
  title: 'Navigation Bar',
  type: 'object',
  fields: [
    defineField({
      name: 'logoImage',
      title: 'Logo Image',
      type: 'image',
      description: 'Optional logo image for the navigation bar',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'titleText',
      title: 'Title Text',
      type: 'string',
      description: 'Text displayed next to or instead of the logo',
      validation: (rule) => rule.required().error('Title Text is required'),
    }),
    defineField({
      name: 'navigationLinks',
      title: 'Navigation Links',
      type: 'array',
      description: 'Navigation links (maximum 5 items)',
      validation: (rule) => rule.max(5).error('Maximum 5 navigation links allowed'),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'linkText',
              title: 'Link Text',
              type: 'string',
              validation: (rule) => rule.required().error('Link Text is required'),
            },
            {
              name: 'linkUrl',
              title: 'Link URL',
              type: 'string',
              description: 'e.g., "/graves" or "/history"',
              validation: (rule) => rule.required().error('Link URL is required'),
            },
          ],
          preview: {
            select: {
              title: 'linkText',
              subtitle: 'linkUrl',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'titleText',
      linksCount: 'navigationLinks.length',
    },
    prepare({ title, linksCount }) {
      return {
        title: title || 'Navigation Bar',
        subtitle: `${linksCount || 0} navigation links`,
      };
    },
  },
});

