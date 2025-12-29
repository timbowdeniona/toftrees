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
      type: 'text',
      description: 'Title can span multiple lines. Press Enter to create a new line.',
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
    defineField({
      name: 'textBackgroundColor',
      title: 'Text Block Background Color',
      type: 'string',
      description: 'Enter a hex color code (e.g., #FBFAF7) or rgba (e.g., rgba(251, 250, 247, 1)). Leave empty for default Light Beige',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true // Optional field
          // Validate hex color format
          const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
          // Validate rgba format: rgba(r, g, b, a) where r,g,b are 0-255 and a is 0-1
          const rgbaColorRegex = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*([\d.]+))?\s*\)$/
          
          if (hexColorRegex.test(value)) {
            return true
          }
          
          if (rgbaColorRegex.test(value)) {
            const match = value.match(rgbaColorRegex)
            if (match) {
              const r = parseInt(match[1])
              const g = parseInt(match[2])
              const b = parseInt(match[3])
              const a = match[4] ? parseFloat(match[4]) : 1
              
              if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255 && a >= 0 && a <= 1) {
                return true
              }
            }
          }
          
          return 'Please enter a valid hex color code (e.g., #FBFAF7) or rgba (e.g., rgba(251, 250, 247, 1))'
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


