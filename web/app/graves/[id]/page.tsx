import { client } from '../../../sanity/client'
import GraveDetailsPageClient from './grave-details-page'
import { notFound } from 'next/navigation'

async function getGraveData(id: string) {
  const grave = await client.fetch(
    `*[_type == "grave" && _id == $id][0]{
      _id,
      graveNo,
      familySurname,
      locationDescription,
      headstoneImage,
      persons[] {
        _key,
        name,
        year,
        age,
        page,
        dateBurial,
        dateOfBirth,
        groReference,
        baptism,
        parents,
        brcri,
        official,
        ref,
        folio,
        abode,
        notes
      },
      graveyardLocation,
      headstoneVideo,
      notes,
      graveImages,
      locationDescription,
      headstoneCondition,
      footstone,
      footstoneInscription,
      additionalInformation,
      scenicGraveImage,
      inscription[] {
        _key,
        _type,
        style,
        children[] {
          _key,
          _type,
          text,
          marks
        },
        markDefs
      },
      _createdAt,
      _updatedAt,
      _rev
    }`,
    { id }
  )

  if (!grave) {
    return null
  }

  // Fetch imageMap to get grave location on map
  const imageMap = await client.fetch(`*[_type == "imageMap"][0]{
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
        _id
      }
    }
  }`)

  // Fetch site settings for navigation, footer, and grave details page content
  const siteSettings = await client.fetch(`*[_type == "siteSettings"][0]{
    graveDetailsPage {
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
          },
          maxWidth,
          iconDecorator
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

  return {
    grave,
    siteSettings,
    imageMap: imageMap || null,
  }
}

export async function generateStaticParams() {
  const graves = await client.fetch<Array<{ _id: string }>>(
    `*[_type == "grave"]{ _id }`
  )

  return graves.map((grave) => ({
    id: grave._id,
  }))
}

export default async function GraveDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const data = await getGraveData(id)

  if (!data || !data.grave) {
    notFound()
  }

  return (
    <GraveDetailsPageClient
      grave={data.grave}
      siteSettings={data.siteSettings}
      imageMap={data.imageMap}
    />
  )
}

