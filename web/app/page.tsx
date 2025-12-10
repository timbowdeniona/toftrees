import HomePage from './home-page'
import { client } from '../sanity/client'

async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0] {
    title,
    churchImage,
    shortHistory,
    contentSections[]{
      _type,
      _key,
      _type == "headingBodyText" => {
        heading,
        bodyText
      },
      _type == "imageText" => {
        image,
        imageAltText,
        imagePosition,
        title,
        bodyText,
        hyperlinkLabel,
        hyperlinkUrl
      }
    },
    navigationBar {
      logoImage,
      titleText,
      navigationLinks[] {
        _key,
        linkText,
        linkUrl
      }
    },
    footer {
      navigationLinks[] {
        _key,
        label,
        url
      },
      copyrightText,
      privacyPolicyLabel,
      privacyPolicyUrl,
      termsLabel,
      termsUrl
    }
  }`
  const data = await client.fetch(query)
  return data
}

export default async function Page() {
  const settings = await getSiteSettings()
  return <HomePage settings={settings} />
}