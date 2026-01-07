import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'object',
  fields: [
    defineField({
      name: 'navigationLinks',
      title: 'Navigation Links',
      type: 'array',
      description: 'Links to display in the footer navigation',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Link Label',
              type: 'string',
              validation: (rule) => rule.required().error('Link label is required'),
            },
            {
              name: 'url',
              title: 'Link URL',
              type: 'string',
              validation: (rule) => rule.required().error('Link URL is required'),
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      description: 'e.g., © 2025 Toftrees Churchyard. All rights reserved.',
      validation: (rule) => rule.required().error('Copyright text is required'),
    }),
    defineField({
      name: 'additionLinks',
      title: 'Additional Links',
      type: 'array',
      description: 'Additional links to display in the footer (e.g., Privacy Policy, Terms & Conditions, Contact)',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Link Label',
              type: 'string',
              validation: (rule) => rule.required().error('Link label is required'),
            },
            {
              name: 'url',
              title: 'Link URL',
              type: 'string',
              validation: (rule) => rule.required().error('Link URL is required'),
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      copyrightText: 'copyrightText',
      navLinksCount: 'navigationLinks.length',
      additionLinksCount: 'additionLinks.length',
    },
    prepare({ copyrightText, navLinksCount, additionLinksCount }) {
      return {
        title: 'Footer Configuration',
        subtitle: `${copyrightText || 'No copyright text'} | ${navLinksCount || 0} nav links | ${additionLinksCount || 0} additional links`,
      };
    },
  },
});

