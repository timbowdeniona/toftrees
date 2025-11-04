# Data Model

The `grave` schema in `studio/schemaTypes/grave.ts` will be updated to include a new field for the inscription.

## `grave.ts` Schema Update

An `inscription` field will be added to the `defineField` array in the `grave` schema.

```typescript
defineField({
  name: 'inscription',
  title: 'Inscription',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      lists: [],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
        ],
        annotations: [],
      },
    }),
  ],
}),
```
