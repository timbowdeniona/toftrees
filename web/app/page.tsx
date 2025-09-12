import HomePage from './home-page'
import { client } from '../sanity/client'

async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0] {
    title,
    churchImage,
    shortHistory
  }`
  const data = await client.fetch(query)
  return data
}

export default async function Page() {
  const settings = await getSiteSettings()
  return <HomePage settings={settings} />
}