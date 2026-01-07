import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'heroImage',
  title: 'Hero Image',
  type: 'object',
  fields: [
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required().error('Hero Background Image is required'),
    }),
    defineField({
      name: 'heroImageAltText',
      title: 'Hero Image Alt Text',
      type: 'string',
      description: 'Accessible description for the background image',
      validation: (rule) => rule.required().error('Hero Image Alt Text is required'),
    }),
    defineField({
      name: 'overlayIconImage',
      title: 'Overlay Icon Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'overlayIconAltText',
      title: 'Overlay Icon Alt Text',
      type: 'string',
      description: 'Optional accessible description for the overlay icon',
    }),
  ],
  preview: {
    select: {
      title: 'heroImageAltText',
      media: 'heroBackgroundImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Hero Image',
        media,
      };
    },
  },
});

