import { client } from '../../sanity/client'
import GrantsFundingPageClient from './grants-funding-page'

async function getGrantsFundingData() {
  const data = await client.fetch(`*[_type == "siteSettings"][0]{
    grantsFundingPage {
      contentSections[]{
        _type,
        _key,
        _type == "heroBanner" => {
          pageBreadcrumb,
          title,
          bodyText,
          backgroundImage,
          backgroundImageAltText,
          bannerColour,
          enableGraveSearch,
          searchPlaceholder
        },
        _type == "headingBodyText" => {
          heading,
          bodyText,
          spacing {
            mobile {
              top,
              bottom
            },
            web {
              top,
              bottom
            }
          }
        },
        _type == "imageText" => {
          image,
          imageAltText,
          imagePosition,
          title,
          bodyText,
          hyperlinkLabel,
          hyperlinkUrl,
          textBackgroundColor,
          spacing {
            mobile {
              top,
              bottom
            },
            web {
              top,
              bottom
            }
          }
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
          ctaUrl,
          spacing {
            mobile {
              top,
              bottom
            },
            web {
              top,
              bottom
            }
          },
          containerPadding {
            mobile {
              top,
              bottom
            },
            web {
              top,
              bottom
            }
          }
        },
        _type == "timeline" => {
          title,
          timelineItems[] {
            year,
            description
          },
          spacing {
            mobile {
              top,
              bottom
            },
            web {
              top,
              bottom
            }
          }
        },
        _type == "multiImage" => {
          images[] {
            image,
            imageAltText
          },
          spacing {
            mobile {
              top,
              bottom
            },
            web {
              top,
              bottom
            }
          }
        },
        _type == "logoText" => {
          logo,
          imageAltText,
          logoPosition,
          bodyText,
          backgroundColor,
          spacing {
            mobile {
              top,
              bottom
            },
            web {
              top,
              bottom
            }
          }
        },
        _type == "freeText" => {
          content,
          spacing {
            mobile {
              top,
              bottom
            },
            web {
              top,
              bottom
            }
          }
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
      additionLinks[] {
        _key,
        label,
        url
      }
    }
  }`)
  return data
}

export default async function GrantsFundingPage() {
  const data = await getGrantsFundingData()
  return <GrantsFundingPageClient data={data} />
}

