import { getClient } from '../../sanity/client'
import MapPageClient from './map-page'
import { Grave } from '../../types'
import { draftMode } from 'next/headers'

export const revalidate = 0

async function getData(isDraftMode: boolean) {
  const sanityClient = getClient(isDraftMode)
  const imageMap = await sanityClient.fetch(`*[_type == "imageMap"][0]`)
  const graves = await sanityClient.fetch<Grave[]>(`*[_type == "grave"] | order(graveNo asc)`)
  return { imageMap, graves }
}

export default async function MapPage() {
  const mode = await draftMode()
  const { imageMap, graves } = await getData(mode.isEnabled)
  return <MapPageClient imageMap={imageMap} graves={graves} />
}
