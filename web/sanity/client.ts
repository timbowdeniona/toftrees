import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION!
// WARNING: It is not recommended to expose a write token in a public environment variable.
// This should be handled in a secure way, for example by using a serverless function.
const token = process.env.NEXT_PUBLIC_SANITY_API_TOKEN!

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
})

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN || process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  perspective: 'previewDrafts',
  stega: {
    enabled: true,
    studioUrl: '/studio',
  },
})

// Helper to reliably choose correct client based on context
export const getClient = (isDraftMode: boolean = false) => {
  return isDraftMode ? previewClient : client
}

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => {
  return builder.image(source)
}
