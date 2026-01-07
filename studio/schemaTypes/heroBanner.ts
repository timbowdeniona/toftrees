import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'heroBanner',
  title: 'Hero Banner',
  type: 'object',
  fields: [
    defineField({
      name: 'pageBreadcrumb',
      title: 'Page Breadcrumb',
      type: 'string',
      description: 'e.g., "Home / Terms and Conditions"',
      validation: (rule) => rule.required().error('Page Breadcrumb is required'),
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
      validation: (rule) => rule.required().error('Body Text is required'),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional background image for the hero banner',
    }),
    defineField({
      name: 'backgroundImageAltText',
      title: 'Background Image Alt Text',
      type: 'string',
      description: 'Accessible description for the background image (required if background image is provided)',
    }),
    defineField({
      name: 'bannerColour',
      title: 'Banner Colour',
      type: 'string',
      description: 'Hex color code for the banner background (e.g., #e0e6db)',
      validation: (rule) => rule.required().error('Banner Colour is required'),
    }),
    defineField({
      name: 'enableGraveSearch',
      title: 'Enable Grave Search',
      type: 'boolean',
      description: 'Show search input for graves in the hero banner',
      initialValue: false,
    }),
    defineField({
      name: 'searchPlaceholder',
      title: 'Search Placeholder',
      type: 'string',
      description: 'Placeholder text for the search input (e.g., "Enter surname")',
      hidden: ({ parent }) => !parent?.enableGraveSearch,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      breadcrumb: 'pageBreadcrumb',
      color: 'bannerColour',
    },
    prepare({ title, breadcrumb, color }) {
      return {
        title: title || 'Untitled Hero Banner',
        subtitle: `${breadcrumb || 'No breadcrumb'} • ${color || 'No color'}`,
      };
    },
  },
});
