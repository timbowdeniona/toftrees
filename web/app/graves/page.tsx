import { client } from '../../sanity/client'
import GravesPageClient from './graves-page'
import { Grave, ImageMap } from '../../types'

async function getGraveListData() {
  const [siteSettings, graves, imageMap] = await Promise.all([
    client.fetch(`*[_type == "siteSettings"][0]{
    graveListPage {
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
  }`),
    client.fetch<Grave[]>(`*[_type == "grave"] | order(familySurname asc)`),
    client.fetch<ImageMap>(`*[_type == "imageMap"][0]{
      _id,
      title,
      image {
        asset {
          _ref
        }
      },
      hotspots[] {
        _key,
        _type,
        x,
        y,
        grave-> {
          _id,
          graveNo,
          familySurname,
          headstoneImage,
          persons[] {
            name,
            year
          }
        }
      }
    }`),
  ])

  return {
    siteSettings,
    graves: graves || [],
    imageMap: imageMap || null,
  }
}

export default async function GravesPage() {
  const { siteSettings, graves, imageMap } = await getGraveListData()
  return <GravesPageClient data={siteSettings} graves={graves} imageMap={imageMap} />
}

