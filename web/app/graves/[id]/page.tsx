import { client } from '../../../sanity/client'
import GraveDetailsPageClient from './grave-details-page'

async function getGrave(id: string) {
  const grave = await client.fetch(`*[_id == "${id}"][0]{
    _id,
    graveNo,
    familySurname,
    locationDescription,
    persons,
    graveyardLocation,
    headstoneImage,
    headstoneVideo
  }`);
  return grave;
}

export default async function GraveDetailsPage({ params }: { params: { id: string } }) {
  const grave = await getGrave(params.id);
  return <GraveDetailsPageClient grave={grave} />;
}