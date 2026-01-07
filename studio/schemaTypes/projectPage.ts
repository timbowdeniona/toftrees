import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'projectPage',
  title: 'Project Page',
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
      ],
    }),
    defineField({
      name: 'content',
      title: 'Project Content',
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
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (rule) =>
                      rule.uri({
                        allowRelative: true,
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: false,
                  },
                ],
              },
              {
                name: 'fontSize',
                type: 'object',
                title: 'Font Size',
                options: {
                  columns: 2,
                },
                fields: [
                  {
                    name: 'web',
                    type: 'number',
                    title: 'Web (px)',
                    validation: (rule) =>
                      rule.min(8).max(200).error('Font size must be between 8 and 200 pixels'),
                  },
                  {
                    name: 'mobile',
                    type: 'number',
                    title: 'Mobile (px)',
                    validation: (rule) =>
                      rule.min(8).max(200).error('Font size must be between 8 and 200 pixels'),
                  },
                ],
              },
            ],
          },
        },
      ],
      description: 'Content for the Project page',
    }),
  ],
  preview: {
    select: {
      title: 'heroBanner.title',
      breadcrumb: 'heroBanner.pageBreadcrumb',
    },
    prepare({ title, breadcrumb }) {
      return {
        title: title || 'Project Page',
        subtitle: breadcrumb || 'No breadcrumb',
      };
    },
  },
});
