import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'logoText',
  title: 'Logo and Text',
  type: 'object',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required().error('Logo is required'),
    }),
    defineField({
      name: 'imageAltText',
      title: 'Image Alt Text',
      type: 'string',
      description: 'Alternative text for the logo (required for accessibility)',
      validation: (rule) => rule.required().error('Image Alt Text is required'),
    }),
    defineField({
      name: 'logoPosition',
      title: 'Logo Position',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'right',
      validation: (rule) => rule.required().error('Logo Position is required'),
    }),
    defineField({
      name: 'bodyText',
      title: 'Text Content',
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
      ],
      validation: (rule) => rule.required().error('Text Content is required'),
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Enter a hex color code (e.g., #FBFAF7) or rgba (e.g., rgba(251, 250, 247, 0.9)). Leave empty for default',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true
          const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
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
          
          return 'Please enter a valid hex color code (e.g., #FBFAF7) or rgba (e.g., rgba(251, 250, 247, 0.9))'
        }),
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
      logo: 'logo',
      bodyText: 'bodyText',
    },
    prepare({ logo, bodyText }) {
      const block = (bodyText || []).find((block: any) => block._type === 'block');
      const text = block
        ? block.children
            .filter((child: any) => child._type === 'span')
            .map((span: any) => span.text)
            .join('')
        : 'No text content';
      
      return {
        title: 'Logo and Text',
        subtitle: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
        media: logo,
      };
    },
  },
});

