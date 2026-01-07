import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'freeText',
  title: 'Free Text',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
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
            ],
          },
        },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for accessibility and SEO.',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (rule) => rule.required().error('Content is required'),
    }),
    defineField({
      name: 'spacing',
      title: 'Spacing',
      type: 'spacing',
      description: 'Top and bottom spacing for this section (mobile and web)',
    }),
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare({ content }) {
      const block = (content || []).find((item: any) => item._type === 'block');
      const text = block
        ? block.children
            .filter((child: any) => child._type === 'span')
            .map((span: any) => span.text)
            .join('')
        : 'No content';
      
      const imageCount = (content || []).filter((item: any) => item._type === 'image').length;
      const subtitle = imageCount > 0 
        ? `${text.substring(0, 50)}${text.length > 50 ? '...' : ''} (${imageCount} image${imageCount > 1 ? 's' : ''})`
        : text.substring(0, 100) + (text.length > 100 ? '...' : '');
      
      return {
        title: 'Free Text',
        subtitle: subtitle,
      };
    },
  },
});

