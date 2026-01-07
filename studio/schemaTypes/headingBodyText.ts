import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'headingBodyText',
  title: 'Heading & Body Text',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required().error('Heading is required'),
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
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'bodyText',
    },
    prepare({ title, subtitle }) {
      const block = (subtitle || []).find((block: any) => block._type === 'block');
      const text = block
        ? block.children
            .filter((child: any) => child._type === 'span')
            .map((span: any) => span.text)
            .join('')
        : 'No body text';
      return {
        title: title || 'Untitled Heading',
        subtitle: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
      };
    },
  },
});


