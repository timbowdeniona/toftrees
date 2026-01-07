import { client } from '../../sanity/client'
import TermsPageClient from './terms-page'

async function getTermsData() {
  const data = await client.fetch(`*[_type == "siteSettings"][0]{
    termPage {
      heroBanner {
        pageBreadcrumb,
        title,
        bodyText,
        backgroundImage,
        backgroundImageAltText,
        bannerColour
      },
      content
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
  }`)
  return data
}

export default async function TermsPage() {
  const data = await getTermsData()
  return <TermsPageClient data={data} />
}

