import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'termPage',
  title: 'Term Page',
  type: 'object',
  fields: [
    defineField({
      name: 'heroBanner',
      title: 'Hero Banner',
      type: 'heroBanner',
      description: 'Configure the hero banner for the Terms & Conditions page',
    }),
    defineField({
      name: 'content',
      title: 'Terms & Conditions Content',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Content for the Terms & Conditions page',
    }),
  ],
  preview: {
    select: {
      title: 'heroBanner.title',
      breadcrumb: 'heroBanner.pageBreadcrumb',
    },
    prepare({ title, breadcrumb }) {
      return {
        title: title || 'Term Page',
        subtitle: breadcrumb || 'No breadcrumb',
      };
    },
  },
});

