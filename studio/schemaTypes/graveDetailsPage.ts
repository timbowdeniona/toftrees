import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'graveDetailsPage',
  title: 'Grave Details Page',
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
      title: 'contentSections',
    },
    prepare({ title }) {
      return {
        title: 'Grave Details Page',
        subtitle: 'Content sections only',
      };
    },
  },
});

