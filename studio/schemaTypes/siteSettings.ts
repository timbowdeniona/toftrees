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
      type: 'array',
      of: [{type: 'block'}],
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
    defineField({
      name: 'contentSections',
      title: 'Content Sections',
      type: 'array',
      description: 'Add content sections to your pages',
      of: [
        { type: 'heroBanner' },
        { type: 'headingBodyText' },
        { type: 'imageText' },
        { type: 'heroImage' },
        { type: 'graveSearch' },
        { type: 'textComponent2' },
        { type: 'timeline' },
        { type: 'multiImage' },
        { type: 'logoText' },
        { type: 'freeText' },
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer Configuration',
      type: 'footer',
      description: 'Configure the site footer displayed on all pages',
    }),
    defineField({
      name: 'navigationBar',
      title: 'Navigation Bar Configuration',
      type: 'navigationBar',
      description: 'Configure the site navigation bar displayed on all pages',
    }),
    defineField({
      name: 'termPage',
      title: 'Term Page',
      type: 'termPage',
      description: 'Configure the Terms & Conditions page content and hero banner',
    }),
    defineField({
      name: 'contactPage',
      title: 'Contact Page',
      type: 'contactPage',
      description: 'Configure the Contact page content and hero banner',
    }),
    defineField({
      name: 'historyPage',
      title: 'History Page',
      type: 'historyPage',
      description: 'Configure the History page content and hero banner',
    }),
    defineField({
      name: 'projectPage',
      title: 'Project Page',
      type: 'projectPage',
      description: 'Configure the Project page content sections',
    }),
    defineField({
      name: 'grantsFundingPage',
      title: 'Grants & Funding Page',
      type: 'grantsFundingPage',
      description: 'Configure the Grants & Funding page content sections',
    }),
  ],
});