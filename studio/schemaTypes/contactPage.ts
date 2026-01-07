import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'object',
  fields: [
    defineField({
      name: 'contentSections',
      title: 'Content Sections',
      type: 'array',
      description: 'Add content sections to your pages',
      of: [
        { type: 'heroBanner' },
        { type: 'headingBodyText' },
        { type: 'imageText' },
        { type: 'heroImage' },
        { type: 'graveSearch' },
        { type: 'textComponent2' },
        { type: 'timeline' },
        { type: 'multiImage' },
        { type: 'logoText' },
        { type: 'freeText' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'contentSections.0._type',
    },
    prepare({ title }) {
      return {
        title: title || 'Contact Page',
        subtitle: 'Content sections',
      };
    },
  },
});

