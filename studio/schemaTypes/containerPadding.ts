import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'containerPadding',
  title: 'Container Padding',
  type: 'object',
  fields: [
    defineField({
      name: 'mobile',
      title: 'Mobile',
      type: 'object',
      options: {
        columns: 2,
      },
      fields: [
        defineField({
          name: 'top',
          title: 'Top (px)',
          type: 'number',
          description: 'Top padding for mobile devices in pixels',
          validation: (rule) => rule.min(0).max(200).error('Padding must be between 0 and 200 pixels'),
          initialValue: 0,
        }),
        defineField({
          name: 'bottom',
          title: 'Bottom (px)',
          type: 'number',
          description: 'Bottom padding for mobile devices in pixels',
          validation: (rule) => rule.min(0).max(200).error('Padding must be between 0 and 200 pixels'),
          initialValue: 0,
        }),
      ],
    }),
    defineField({
      name: 'web',
      title: 'Web',
      type: 'object',
      options: {
        columns: 2,
      },
      fields: [
        defineField({
          name: 'top',
          title: 'Top (px)',
          type: 'number',
          description: 'Top padding for web/desktop devices in pixels',
          validation: (rule) => rule.min(0).max(200).error('Padding must be between 0 and 200 pixels'),
          initialValue: 0,
        }),
        defineField({
          name: 'bottom',
          title: 'Bottom (px)',
          type: 'number',
          description: 'Bottom padding for web/desktop devices in pixels',
          validation: (rule) => rule.min(0).max(200).error('Padding must be between 0 and 200 pixels'),
          initialValue: 0,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      mobileTop: 'mobile.top',
      mobileBottom: 'mobile.bottom',
      webTop: 'web.top',
      webBottom: 'web.bottom',
    },
    prepare({ mobileTop, mobileBottom, webTop, webBottom }) {
      const mobile = mobileTop || mobileBottom ? `Mobile: ${mobileTop || 0}px/${mobileBottom || 0}px` : 'Mobile: 0px/0px'
      const web = webTop || webBottom ? `Web: ${webTop || 0}px/${webBottom || 0}px` : 'Web: 0px/0px'
      return {
        title: 'Container Padding',
        subtitle: `${mobile} | ${web}`,
      };
    },
  },
});

