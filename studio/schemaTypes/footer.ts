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
      name: 'privacyPolicyLabel',
      title: 'Privacy Policy Link Label',
      type: 'string',
      description: 'e.g., "Privacy Policy"',
    }),
    defineField({
      name: 'privacyPolicyUrl',
      title: 'Privacy Policy URL',
      type: 'string',
      description: 'e.g., "/privacy"',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as any;
          const hasLabel = parent?.privacyPolicyLabel;
          const hasUrl = value;

          // Both must be filled or both must be empty
          if ((hasLabel && !hasUrl) || (!hasLabel && hasUrl)) {
            return 'Both Privacy Policy Label and URL must be provided together, or both left empty';
          }
          return true;
        }),
    }),
    defineField({
      name: 'termsLabel',
      title: 'Terms & Conditions Link Label',
      type: 'string',
      description: 'e.g., "Terms & Conditions"',
    }),
    defineField({
      name: 'termsUrl',
      title: 'Terms & Conditions URL',
      type: 'string',
      description: 'e.g., "/terms"',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as any;
          const hasLabel = parent?.termsLabel;
          const hasUrl = value;

          // Both must be filled or both must be empty
          if ((hasLabel && !hasUrl) || (!hasLabel && hasUrl)) {
            return 'Both Terms & Conditions Label and URL must be provided together, or both left empty';
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      copyrightText: 'copyrightText',
      linksCount: 'navigationLinks.length',
    },
    prepare({ copyrightText, linksCount }) {
      return {
        title: 'Footer Configuration',
        subtitle: `${copyrightText || 'No copyright text'} | ${linksCount || 0} navigation links`,
      };
    },
  },
});

