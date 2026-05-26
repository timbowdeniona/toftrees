import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'microtext',
  title: 'Microtext (Content Snippet)',
  type: 'document',
  fields: [
    defineField({
      name: 'key',
      title: 'Identifier Key',
      type: 'slug',
      description: 'Unique key used by the frontend to fetch this content (e.g. "grave-details-explanation")',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('Key is required'),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().error('Title is required'),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imageAltText',
      title: 'Image Alt Text',
      type: 'string',
      description: 'Alternative text for accessibility (required if image is set)',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { image?: any };
          if (parent?.image?.asset && !value) {
            return 'Image Alt Text is required when an image is selected';
          }
          return true;
        }),
    }),
    defineField({
      name: 'text',
      title: 'Text Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      key: 'key.current',
      media: 'image',
    },
    prepare({ title, key, media }) {
      return {
        title: title || 'Untitled Microtext',
        subtitle: key ? `Key: ${key}` : 'No key set',
        media,
      };
    },
  },
});
