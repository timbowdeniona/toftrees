import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'spacing',
  title: 'Spacing',
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
          description: 'Top spacing for mobile devices in pixels',
          validation: (rule) => rule.min(0).max(500).error('Spacing must be between 0 and 500 pixels'),
        }),
        defineField({
          name: 'bottom',
          title: 'Bottom (px)',
          type: 'number',
          description: 'Bottom spacing for mobile devices in pixels',
          validation: (rule) => rule.min(0).max(500).error('Spacing must be between 0 and 500 pixels'),
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
          description: 'Top spacing for web/desktop devices in pixels',
          validation: (rule) => rule.min(0).max(500).error('Spacing must be between 0 and 500 pixels'),
        }),
        defineField({
          name: 'bottom',
          title: 'Bottom (px)',
          type: 'number',
          description: 'Bottom spacing for web/desktop devices in pixels',
          validation: (rule) => rule.min(0).max(500).error('Spacing must be between 0 and 500 pixels'),
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
        title: 'Spacing',
        subtitle: `${mobile} | ${web}`,
      };
    },
  },
});

