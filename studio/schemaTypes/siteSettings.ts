import { defineField, defineType } from 'sanity';

export default  defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      name: 'shortHistory',
      title: 'Short History',
      type: 'text',
    }),
    defineField({
      name: 'churchImage',
      title: 'Church Image',
      type: 'image',
    }),
    defineField({
      name: 'churchVideo',
      title: 'Church Video',
      type: 'file',
    }),
    defineField({
      name: 'historicalProjectSummary',
      title: 'Historical Project Summary',
      type: 'text',
    }),
    defineField({
      name: 'contactDetails',
      title: 'Contact Details',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Name', type: 'string' },
          { name: 'role', title: 'Role', type: 'string' },
          { name: 'email', title: 'Email', type: 'string' },
        ]
      }]
    }),
  ],
});