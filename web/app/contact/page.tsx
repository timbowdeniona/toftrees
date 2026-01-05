import { client } from '../../sanity/client'
import ContactPageClient from './contact-page'

async function getContactData() {
  const data = await client.fetch(`*[_type == "siteSettings"][0]{
      contactPage {
        heroBanner {
          pageBreadcrumb,
          title,
          bodyText,
          backgroundImage,
          backgroundImageAltText,
          bannerColour,
          enableGraveSearch,
          searchPlaceholder
        },
        label,
        name,
        info,
        email
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

export default async function ContactPage() {
  const data = await getContactData()
  return <ContactPageClient data={data} />
}

