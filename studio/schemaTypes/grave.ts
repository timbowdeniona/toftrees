import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'grave',
  title: 'Grave',
  type: 'document',
  fields: [
    defineField({
      name: 'graveNo',
      title: 'Grave Number',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'familySurname',
      title: 'Family Surname',
      type: 'string',
    }),
    defineField({
      name: 'locationDescription',
      title: 'Location Description',
      type: 'text',
      description: 'e.g., Corner of West and South Boundaries.',
    }),
    defineField({
      name: 'persons',
      title: 'Persons Buried',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Name', type: 'string' },
          { name: 'year', title: 'Year of Death', type: 'number' },
          { name: 'age', title: 'Age', type: 'number' },
          { name: 'page', title: 'Page', type: 'string' },
          { name: 'dateBurial', title: 'Date of Burial', type: 'string' },
          { name: 'groReference', title: 'GRO Reference', type: 'string' },
          { name: 'official', title: 'Official', type: 'string' },
          { name: 'ref', title: 'Page/Folio Ref', type: 'string' },
          { name: 'folio', title: 'Folio', type: 'string' },
          { name: 'abode', title: 'Abode', type: 'string' },
          { name: 'notes', title: 'Notes', type: 'text' },
        ],
        preview: {
          select: {
            title: 'name',
            subtitle: 'deathYear',
          }
        }
      }],
    }),
    defineField({
      name: 'graveyardLocation',
      title: 'Graveyard Location',
      type: 'geopoint',
    }),
    defineField({
      name: 'headstoneImage',
      title: 'Headstone Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'headstoneVideo',
      title: 'Headstone Video',
      type: 'file',
    }),
  ],
});