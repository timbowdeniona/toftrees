'use client'

import { VStack } from '@chakra-ui/react'
import { MarketingLayout } from '../../../components/layout/marketing-layout'
import { Grave, ImageMap } from '../../../types'
import { ContentSectionRenderer } from '../../../components/content-sections'
import { GraveHeroBanner } from '../../../components/content-sections/grave-hero-banner'
import { BurialDetails } from '../../../components/content-sections/burial-details'
import { OtherPeopleBuried } from '../../../components/content-sections/other-people-buried'
import { Inscription } from '../../../components/content-sections/inscription'
import { GraveDetailsSection } from '../../../components/content-sections/grave-details-section'

interface ContentSection {
  _type: string
  _key: string
  heading?: string
  bodyText?: unknown[]
  image?: unknown
  imageAltText?: string
  logo?: unknown
  logoPosition?: 'left' | 'right'
  images?: Array<{
    image: unknown
    imageAltText: string
  }>
  imagePosition?: 'left' | 'right' | 'centre'
  title?: string
  textBackgroundColor?: string
  titleText?: string
  searchBarPlaceholder?: string
  hyperlinkLabel?: string
  hyperlinkUrl?: string
  column1?: {
    columnTitle?: string
    headingLevel?: string
    bodyText?: unknown[]
  }
  column2?: {
    columnTitle?: string
    headingLevel?: string
    bodyText?: unknown[]
  }
  backgroundColor?: 'white' | 'lightGreen' | string
  ctaLabel?: string
  ctaUrl?: string
  heroBackgroundImage?: unknown
  heroImageAltText?: string
  overlayIconImage?: unknown
  overlayIconAltText?: string
  pageBreadcrumb?: string
  backgroundImage?: unknown
  backgroundImageAltText?: string
  bannerColour?: string
  timelineItems?: Array<{
    year: string
    description: string
  }>
}

interface SiteSettings {
  graveDetailsPage?: {
    contentSections?: ContentSection[]
  }
  navigationBar?: {
    logoImage?: {
      asset: {
        _ref: string
        _type: 'reference'
      }
      _type: 'image'
    }
    titleText?: string
    navigationLinks?: Array<{ _key?: string; linkText: string; linkUrl: string }>
  }
  footer?: {
    navigationLinks?: Array<{ _key?: string; label: string; url: string }>
    copyrightText?: string
    privacyPolicyLabel?: string
    privacyPolicyUrl?: string
    termsLabel?: string
    termsUrl?: string
  }
}

export default function GraveDetailsPageClient({
  grave,
  siteSettings,
  imageMap,
}: {
  grave: Grave
  siteSettings?: SiteSettings
  imageMap?: ImageMap | null
}) {
  // Get person name for breadcrumb
  const getPersonName = (): string => {
    if (grave.persons && grave.persons.length > 0) {
      const firstPerson = grave.persons[0]
      if (firstPerson.name) {
        const name = firstPerson.name.trim()
        if (name.includes(',')) {
          return name
        }
        const parts = name.split(/\s+/)
        if (parts.length > 1) {
          const lastName = parts[parts.length - 1]
          const firstName = parts.slice(0, -1).join(' ')
          return `${lastName}, ${firstName}`
        }
        return name
      }
    }
    return grave.familySurname || 'Unknown'
  }

  const personName = getPersonName()

  // Prepare images for carousel (use graveImages if available, otherwise fallback to headstoneImage)
  const allImages = grave.graveImages && grave.graveImages.length > 0
    ? grave.graveImages
        .filter((img) => img.asset?._ref) // Only include images with asset
        .map((img) => ({
          image: {
            asset: {
              _ref: img.asset!._ref,
            },
          },
          alt: `Grave image for ${personName}`,
        }))
    : grave.headstoneImage && grave.headstoneImage.asset?._ref
    ? [
        {
          image: {
            asset: {
              _ref: grave.headstoneImage.asset._ref,
            },
          },
          alt: `Headstone for ${personName}`,
        },
      ]
    : []

  // More info link - link to map location if available
  const moreInfoLink = grave.graveyardLocation
    ? {
        label: 'More info',
        url: `/graves?search=${encodeURIComponent(personName)}`,
      }
    : undefined

  return (
    <MarketingLayout
      headerProps={{ navigationConfig: siteSettings?.navigationBar }}
      footerProps={{ config: siteSettings?.footer }}
     
    >
      <VStack spacing="0px" align="stretch" w="full">
        {/* Hardcoded Grave Hero Banner */}
        <GraveHeroBanner
          grave={grave}
          moreInfoLink={moreInfoLink}
          images={allImages.map((img) => ({
            image: img.image,
            imageAltText: img.alt,
          }))}
          bannerColour="#2E4028"
        />

        {/* Burial Details Section */}
        <BurialDetails grave={grave} />

        {/* Other People Buried Section */}
        <OtherPeopleBuried grave={grave} />

        {/* Inscription Section */}
        <Inscription grave={grave} />

        {/* Grave Details Section */}
        <GraveDetailsSection grave={grave} imageMap={imageMap} />

        {/* Content Sections */}
        <ContentSectionRenderer
          sections={siteSettings?.graveDetailsPage?.contentSections}
        />
      </VStack>
    </MarketingLayout>
  )
}

