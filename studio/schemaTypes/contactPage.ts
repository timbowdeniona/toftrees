import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'object',
  fields: [
    defineField({
      name: 'heroBanner',
      title: 'Hero Banner',
      type: 'heroBanner',
      description: 'Configure the hero banner for the Contact page',
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Label for the contact content section',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name field for contact information',
    }),
    defineField({
      name: 'info',
      title: 'Info',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [],
          },
        },
      ],
      description: 'Info field for contact information',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Email field for contact information',
    }),
  ],
  preview: {
    select: {
      title: 'heroBanner.title',
      breadcrumb: 'heroBanner.pageBreadcrumb',
    },
    prepare({ title, breadcrumb }) {
      return {
        title: title || 'Contact Page',
        subtitle: breadcrumb || 'No breadcrumb',
      };
    },
  },
});

