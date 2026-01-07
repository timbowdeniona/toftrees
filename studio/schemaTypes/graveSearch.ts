import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'graveSearch',
  title: 'Grave Search Component',
  type: 'object',
  fields: [
    defineField({
      name: 'titleText',
      title: 'Title Text',
      type: 'string',
      validation: (rule) => rule.required().error('Title Text is required'),
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
      name: 'searchBarPlaceholder',
      title: 'Search Bar Placeholder Text',
      type: 'string',
      validation: (rule) => rule.required().error('Search Bar Placeholder Text is required'),
    }),
    defineField({
      name: 'hyperlinkLabel',
      title: 'Hyperlink Label',
      type: 'string',
      description: 'The text displayed for the hyperlink (e.g., "View All Graves")',
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
      title: 'titleText',
      placeholder: 'searchBarPlaceholder',
      bodyText: 'bodyText',
    },
    prepare({ title, placeholder, bodyText }) {
      const block = (bodyText || []).find((block: any) => block._type === 'block');
      const text = block
        ? block.children
            .filter((child: any) => child._type === 'span')
            .map((span: any) => span.text)
            .join('')
        : 'No body text';
      
      return {
        title: title || 'Untitled Grave Search',
        subtitle: `Placeholder: "${placeholder || 'Not set'}" | ${text.substring(0, 50)}${text.length > 50 ? '...' : ''}`,
      };
    },
  },
});

