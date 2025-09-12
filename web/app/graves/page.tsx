import { client } from '../../sanity/client'
import GravesPageClient from './graves-page'

async function getGraves() {
  const graves = await client.fetch(`*[_type == "grave"]{
    _id,
    graveNo,
    familySurname
  } | order(graveNo)`);
  return graves;
}

export default async function GravesPage() {
  const graves = await getGraves();
  return <GravesPageClient graves={graves} />;
}