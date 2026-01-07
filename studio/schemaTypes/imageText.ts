import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'imageText',
  title: 'Image + Text',
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
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
      validation: (rule) => rule.required().error('Image Position is required'),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().error('Title is required'),
    }),
    defineField({
      name: 'bodyText',
      title: 'Body Text',
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
    }),
    defineField({
      name: 'hyperlinkLabel',
      title: 'Hyperlink Label',
      type: 'string',
      description: 'The text displayed for the hyperlink',
    }),
    defineField({
      name: 'hyperlinkUrl',
      title: 'Hyperlink URL',
      type: 'url',
      description: 'The URL the hyperlink points to',
      validation: (rule) =>
        rule.custom((value, context) => {
          const { parent } = context as { parent?: { hyperlinkLabel?: string; hyperlinkUrl?: string } };
          const hasLabel = !!parent?.hyperlinkLabel;
          const hasUrl = !!value;

          // If one is provided, both must be provided
          if (hasLabel && !hasUrl) {
            return 'Hyperlink URL is required when Hyperlink Label is provided';
          }
          if (hasUrl && !hasLabel) {
            return 'Hyperlink Label is required when Hyperlink URL is provided';
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      imagePosition: 'imagePosition',
      image: 'image',
      bodyText: 'bodyText',
    },
    prepare({ title, imagePosition, image, bodyText }) {
      const block = (bodyText || []).find((block: any) => block._type === 'block');
      const text = block
        ? block.children
            .filter((child: any) => child._type === 'span')
            .map((span: any) => span.text)
            .join('')
        : 'No body text';
      
      const positionLabel = imagePosition === 'left' ? 'Left' : imagePosition === 'right' ? 'Right' : 'Unknown';
      
      return {
        title: title || 'Untitled Image + Text',
        subtitle: `Image: ${positionLabel} | ${text.substring(0, 50)}${text.length > 50 ? '...' : ''}`,
        media: image,
      };
    },
  },
});


