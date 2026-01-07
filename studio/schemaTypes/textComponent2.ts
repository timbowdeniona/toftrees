import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'textComponent2',
  title: 'Two Column Text Component',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Main title displayed at the top of the section',
    }),
    defineField({
      name: 'column1',
      title: 'Column 1',
      type: 'object',
      fields: [
        defineField({
          name: 'columnTitle',
          title: 'Column Title',
          type: 'string',
          description: 'Optional title for this column',
        }),
        defineField({
          name: 'headingLevel',
          title: 'Heading Level',
          type: 'string',
          options: {
            list: [
              { title: 'H1', value: 'h1' },
              { title: 'H2', value: 'h2' },
              { title: 'H3', value: 'h3' },
              { title: 'H4', value: 'h4' },
              { title: 'H5', value: 'h5' },
              { title: 'H6', value: 'h6' },
            ],
          },
          initialValue: 'h2',
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
        }),
      ],
    }),
    defineField({
      name: 'column2',
      title: 'Column 2',
      type: 'object',
      fields: [
        defineField({
          name: 'columnTitle',
          title: 'Column Title',
          type: 'string',
          description: 'Optional title for this column',
        }),
        defineField({
          name: 'headingLevel',
          title: 'Heading Level',
          type: 'string',
          options: {
            list: [
              { title: 'H1', value: 'h1' },
              { title: 'H2', value: 'h2' },
              { title: 'H3', value: 'h3' },
              { title: 'H4', value: 'h4' },
              { title: 'H5', value: 'h5' },
              { title: 'H6', value: 'h6' },
            ],
          },
          initialValue: 'h2',
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
        }),
      ],
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Light Green', value: 'lightGreen' },
        ],
      },
      initialValue: 'white',
      description: 'Select background color for the component',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      description: 'Optional call-to-action button label (e.g., "Explore the History")',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA URL',
      type: 'url',
      description: 'URL for the call-to-action button',
    }),
    defineField({
      name: 'spacing',
      title: 'Spacing',
      type: 'spacing',
      description: 'Top and bottom spacing for this section (mobile and web)',
    }),
    defineField({
      name: 'containerPadding',
      title: 'Container Padding',
      type: 'containerPadding',
      description: 'Left and right padding for the container (mobile and web)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      column1Text: 'column1.bodyText',
      column2Text: 'column2.bodyText',
    },
    prepare({ title, column1Text, column2Text }) {
      const getText = (blocks: any[]) => {
        if (!blocks || !Array.isArray(blocks)) return '';
        const block = blocks.find((b: any) => b._type === 'block');
        return block
          ? block.children
              .filter((child: any) => child._type === 'span')
              .map((span: any) => span.text)
              .join('')
          : '';
      };
      const text1 = getText(column1Text || []);
      const text2 = getText(column2Text || []);
      const preview = [text1, text2].filter(Boolean).join(' | ').substring(0, 100);
      return {
        title: title || 'Two Column Text',
        subtitle: preview + (preview.length >= 100 ? '...' : ''),
      };
    },
  },
});

