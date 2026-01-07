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
              {
                name: 'textAlign',
                type: 'object',
                title: 'Text Align',
                options: {
                  columns: 2,
                },
                fields: [
                  {
                    name: 'web',
                    type: 'string',
                    title: 'Web',
                    options: {
                      list: [
                        { title: 'Left', value: 'left' },
                        { title: 'Center', value: 'center' },
                        { title: 'Right', value: 'right' },
                        { title: 'Justify', value: 'justify' },
                      ],
                    },
                  },
                  {
                    name: 'mobile',
                    type: 'string',
                    title: 'Mobile',
                    options: {
                      list: [
                        { title: 'Left', value: 'left' },
                        { title: 'Center', value: 'center' },
                        { title: 'Right', value: 'right' },
                        { title: 'Justify', value: 'justify' },
                      ],
                    },
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

