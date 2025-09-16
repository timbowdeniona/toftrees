import { client } from '../../sanity/client'
import MapPageClient from './map-page'
import { Grave } from '../../types'

export const revalidate = 0

async function getData() {
  const imageMap = await client.fetch(`*[_type == "imageMap"][0]`)
  const graves = await client.fetch<Grave[]>(`*[_type == "grave"] | order(graveNo asc)`)
  return { imageMap, graves }
}

export default async function MapPage() {
  const { imageMap, graves } = await getData()
  return <MapPageClient imageMap={imageMap} graves={graves} />
}
