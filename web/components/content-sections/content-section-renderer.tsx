'use client'

import { HeadingBodyTextSection } from './heading-body-text'
import { ImageTextSection } from './image-text'
import { HeroImageSection } from './hero-image'
import { GraveSearchSection } from './grave-search'
import { TextComponent2 } from './text-component-2'
import { TimelineSection } from './timeline'
import { Homehero } from './homehero'
import { MultiImageSection } from './multi-image'
import { LogoTextSection } from './logo-text'
import { FreeTextSection } from './free-text'

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
  backgroundColor?: 'white' | 'lightGreen' | string
  title?: string
  titleText?: string
  searchBarPlaceholder?: string
  hyperlinkLabel?: string
  hyperlinkUrl?: string
  textBackgroundColor?: string
  heroBackgroundImage?: unknown
  heroImageAltText?: string
  overlayIconImage?: unknown
  overlayIconAltText?: string
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
  ctaLabel?: string
  ctaUrl?: string
  pageBreadcrumb?: string
  backgroundImage?: unknown
  backgroundImageAltText?: string
  bannerColour?: string
  timelineItems?: Array<{
    year: string
    description: string
  }>
  content?: unknown[]
  spacing?: {
    mobile?: {
      top?: number
      bottom?: number
    }
    web?: {
      top?: number
      bottom?: number
    }
  }
  containerPadding?: {
    mobile?: {
      top?: number
      bottom?: number
    }
    web?: {
      top?: number
      bottom?: number
    }
  }
}

interface ContentSectionRendererProps {
  sections?: ContentSection[]
}

export function ContentSectionRenderer({ sections }: ContentSectionRendererProps) {
  if (!sections || sections.length === 0) {
    return null
  }

  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case 'heroBanner':
            return (
              <Homehero
                key={section._key}
                pageBreadcrumb={section.pageBreadcrumb}
                title={section.title as string}
                bodyText={Array.isArray(section.bodyText) ? (section.bodyText as Array<{
                  _type: string
                  _key: string
                  [key: string]: unknown
                }>) : undefined}
                backgroundImage={section.backgroundImage}
                backgroundImageAltText={section.backgroundImageAltText}
                bannerColour={section.bannerColour}
              />
            )

          case 'headingBodyText':
            return (
              <HeadingBodyTextSection
                key={section._key}
                heading={section.heading ?? ''}
                bodyText={section.bodyText ?? []}
                spacing={section.spacing as { mobile?: { top?: number; bottom?: number }; web?: { top?: number; bottom?: number } } | undefined}
              />
            )

          case 'imageText':
            // ImageTextSection only supports 'left' | 'right', so convert 'centre' to 'left'
            const imageTextPosition = section.imagePosition === 'centre' 
              ? 'left' 
              : (section.imagePosition === 'right' ? 'right' : 'left') as 'left' | 'right'
            return (
              <ImageTextSection
                key={section._key}
                image={section.image as { asset: { _ref: string } }}
                imageAltText={section.imageAltText ?? ''}
                imagePosition={imageTextPosition}
                title={section.title ?? ''}
                bodyText={section.bodyText ?? []}
                hyperlinkLabel={section.hyperlinkLabel}
                hyperlinkUrl={section.hyperlinkUrl}
                textBackgroundColor={section.textBackgroundColor}
                spacing={section.spacing as { mobile?: { top?: number; bottom?: number }; web?: { top?: number; bottom?: number } } | undefined}
              />
            )

          case 'heroImage':
            return (
              <HeroImageSection
                key={section._key}
                heroBackgroundImage={section.heroBackgroundImage}
                heroImageAltText={section.heroImageAltText || 'Hero image'}
                overlayIconImage={section.overlayIconImage}
                overlayIconAltText={section.overlayIconAltText}
              />
            )

          case 'graveSearch':
            return (
              <GraveSearchSection
                key={section._key}
                titleText={section.titleText ?? ''}
                bodyText={Array.isArray(section.bodyText) ? (section.bodyText as Array<{
                  _type: string
                  _key: string
                  [key: string]: unknown
                }>) : undefined}
                searchBarPlaceholder={section.searchBarPlaceholder ?? ''}
                hyperlinkLabel={section.hyperlinkLabel}
                hyperlinkUrl={section.hyperlinkUrl}
              />
            )

          case 'textComponent2':
            return (
              <TextComponent2
                key={section._key}
                title={section.title}
                column1={section.column1 as {
                  columnTitle?: string
                  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
                  bodyText?: unknown[]
                }}
                column2={section.column2 as {
                  columnTitle?: string
                  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
                  bodyText?: unknown[]
                }}
                backgroundColor={section.backgroundColor as 'white' | 'lightGreen' | undefined}
                ctaLabel={section.ctaLabel}
                ctaUrl={section.ctaUrl}
                spacing={section.spacing as { mobile?: { top?: number; bottom?: number }; web?: { top?: number; bottom?: number } } | undefined}
                containerPadding={section.containerPadding as { mobile?: { top?: number; bottom?: number }; web?: { top?: number; bottom?: number } } | undefined}
              />
            )

          case 'timeline':
            return (
              <TimelineSection
                key={section._key}
                title={section.title}
                timelineItems={section.timelineItems as Array<{
                  year: string
                  description: string
                }>}
                spacing={section.spacing as { mobile?: { top?: number; bottom?: number }; web?: { top?: number; bottom?: number } } | undefined}
              />
            )

          case 'multiImage':
            return (
              <MultiImageSection
                key={section._key}
                images={(section.images as Array<{
                  image: { asset: { _ref: string } }
                  imageAltText: string
                }>) || []}
                spacing={section.spacing as { mobile?: { top?: number; bottom?: number }; web?: { top?: number; bottom?: number } } | undefined}
              />
            )

          case 'logoText':
            return (
              <LogoTextSection
                key={section._key}
                logo={section.logo as { asset: { _ref: string } }}
                imageAltText={section.imageAltText ?? ''}
                logoPosition={section.logoPosition as 'left' | 'right' | undefined}
                bodyText={Array.isArray(section.bodyText) ? (section.bodyText as Array<Record<string, unknown>>) : []}
                backgroundColor={section.backgroundColor}
                spacing={section.spacing as { mobile?: { top?: number; bottom?: number }; web?: { top?: number; bottom?: number } } | undefined}
              />
            )

          case 'freeText':
            return (
              <FreeTextSection
                key={section._key}
                content={Array.isArray(section.content) ? (section.content as Array<Record<string, unknown>>) : []}
                skipWrapper={true}
                spacing={section.spacing as { mobile?: { top?: number; bottom?: number }; web?: { top?: number; bottom?: number } } | undefined}
              />
            )

          default:
            console.warn(`Unknown content section type: ${section._type}`)
            return null
        }
      })}
    </>
  )
}

