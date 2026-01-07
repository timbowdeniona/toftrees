'use client'

import { HeadingBodyTextSection } from './heading-body-text'
import { ImageTextSection } from './image-text'
import { HeroImageSection } from './hero-image'
import { GraveSearchSection } from './grave-search'
import { TextComponent2 } from './text-component-2'
import { TimelineSection } from './timeline'
import { Homehero } from './homehero'

interface ContentSection {
  _type: string
  _key: string
  heading?: string
  bodyText?: unknown[]
  image?: unknown
  imageAltText?: string
  imagePosition?: 'left' | 'right'
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
  backgroundColor?: 'white' | 'lightGreen'
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
              />
            )

          case 'imageText':
            return (
              <ImageTextSection
                key={section._key}
                image={section.image as { asset: { _ref: string } }}
                imageAltText={section.imageAltText ?? ''}
                imagePosition={section.imagePosition ?? 'left'}
                title={section.title ?? ''}
                bodyText={section.bodyText ?? []}
                hyperlinkLabel={section.hyperlinkLabel}
                hyperlinkUrl={section.hyperlinkUrl}
                textBackgroundColor={section.textBackgroundColor}
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

