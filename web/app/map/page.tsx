import { client } from '../../sanity/client'
import MapPageClient from './map-page'

async function getImageMap() {
  const imageMap = await client.fetch(`*[_type == "imageMap"][0]`);
  return imageMap;
}

export default async function MapPage() {
  const imageMap = await getImageMap();
  return <MapPageClient imageMap={imageMap} />;
}
