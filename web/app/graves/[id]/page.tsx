import { client } from '../../../sanity/client'
import GraveDetailsPageClient from './grave-details-page'

type GravePageProps = {
  params: Promise<{
    id: string;
  }>;
};

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

export default async function GraveDetailsPage({ params }: GravePageProps) {
  const { id } = await params;
  const grave = await getGrave(id);
  return <GraveDetailsPageClient grave={grave} />;
}