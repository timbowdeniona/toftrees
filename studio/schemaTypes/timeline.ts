import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'timeline',
  title: 'Timeline',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title displayed at the top of the timeline (e.g., "Our Timeline")',
      initialValue: 'Our Timeline',
    }),
    defineField({
      name: 'timelineItems',
      title: 'Timeline Items',
      type: 'array',
      description: 'Add timeline events',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'year',
              title: 'Year',
              type: 'string',
              description: 'Year of the event (e.g., "1086", "1302")',
              validation: (rule) => rule.required().error('Year is required'),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              description: 'Description of the timeline event',
              validation: (rule) => rule.required().error('Description is required'),
            }),
          ],
          preview: {
            select: {
              year: 'year',
              description: 'description',
            },
            prepare({ year, description }) {
              return {
                title: year || 'No year',
                subtitle: description ? description.substring(0, 60) + (description.length > 60 ? '...' : '') : 'No description',
              };
            },
          },
        },
      ],
      validation: (rule) => rule.min(1).error('At least one timeline item is required'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      itemCount: 'timelineItems',
    },
    prepare({ title, itemCount }) {
      const count = Array.isArray(itemCount) ? itemCount.length : 0;
      return {
        title: title || 'Timeline',
        subtitle: `${count} item${count !== 1 ? 's' : ''}`,
      };
    },
  },
});

