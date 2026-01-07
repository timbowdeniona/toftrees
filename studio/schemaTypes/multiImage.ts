import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'multiImage',
  title: 'Multi Image',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      description: 'Add multiple images to display horizontally',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (rule) => rule.required().error('Image is required'),
            }),
            defineField({
              name: 'imageAltText',
              title: 'Image Alt Text',
              type: 'string',
              description: 'Alternative text for the image (required for accessibility)',
              validation: (rule) => rule.required().error('Image Alt Text is required'),
            }),
          ],
          preview: {
            select: {
              title: 'imageAltText',
              media: 'image',
            },
            prepare({ title, media }) {
              return {
                title: title || 'Untitled Image',
                media: media,
              };
            },
          },
        },
      ],
      validation: (rule) => rule.min(1).error('At least one image is required'),
    }),
  ],
  preview: {
    select: {
      images: 'images',
    },
    prepare({ images }) {
      const imageCount = images?.length || 0;
      
      return {
        title: 'Multi Image',
        subtitle: `${imageCount} image(s)`,
        media: images?.[0]?.image,
      };
    },
  },
});

