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
      _type == "heroBanner" => {
        pageBreadcrumb,
        title,
        bodyText,
        backgroundImage,
        backgroundImageAltText,
        bannerColour
      },
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
        hyperlinkUrl,
        textBackgroundColor
      },
      _type == "heroImage" => {
        heroBackgroundImage,
        heroImageAltText,
        overlayIconImage,
        overlayIconAltText
      },
      _type == "graveSearch" => {
        titleText,
        bodyText,
        searchBarPlaceholder,
        hyperlinkLabel,
        hyperlinkUrl
      },
      _type == "textComponent2" => {
        title,
        column1 {
          columnTitle,
          headingLevel,
          bodyText
        },
        column2 {
          columnTitle,
          headingLevel,
          bodyText
        },
        backgroundColor,
        ctaLabel,
        ctaUrl
      },
      _type == "timeline" => {
        title,
        timelineItems[] {
          year,
          description
        }
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