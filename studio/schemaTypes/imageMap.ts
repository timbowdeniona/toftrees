import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'imageMap',
  title: 'Image Map',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'hotspots',
      title: 'Hotspots',
      type: 'array',
      of: [
        defineType({
          name: 'hotspot',
          title: 'Hotspot',
          type: 'object',
          fields: [
            defineField({
              name: 'grave',
              title: 'Grave',
              type: 'reference',
              to: [{type: 'grave'}],
            }),
            defineField({
              name: 'x',
              title: 'X coordinate',
              type: 'number',
            }),
            defineField({
              name: 'y',
              title: 'Y coordinate',
              type: 'number',
            }),
          ],
        }),
      ],
    }),
  ],
})
