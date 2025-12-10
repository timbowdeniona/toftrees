'use client'

import { HeadingBodyTextSection } from './heading-body-text'
import { ImageTextSection } from './image-text'

interface ContentSection {
  _type: string
  _key: string
  heading?: string
  bodyText?: unknown[]
  image?: unknown
  imageAltText?: string
  imagePosition?: 'left' | 'right'
  title?: string
  hyperlinkLabel?: string
  hyperlinkUrl?: string
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
          case 'headingBodyText':
            return (
              <HeadingBodyTextSection
                key={section._key}
                heading={section.heading}
                bodyText={section.bodyText}
              />
            )

          case 'imageText':
            return (
              <ImageTextSection
                key={section._key}
                image={section.image}
                imageAltText={section.imageAltText}
                imagePosition={section.imagePosition}
                title={section.title}
                bodyText={section.bodyText}
                hyperlinkLabel={section.hyperlinkLabel}
                hyperlinkUrl={section.hyperlinkUrl}
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

