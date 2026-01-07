import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'historyPage',
  title: 'History Page',
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
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heroBanner.title',
      breadcrumb: 'heroBanner.pageBreadcrumb',
    },
    prepare({ title, breadcrumb }) {
      return {
        title: title || 'History Page',
        subtitle: breadcrumb || 'No breadcrumb',
      };
    },
  },
});

