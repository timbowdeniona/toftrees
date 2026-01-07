'use client'

import { MarketingLayout } from '../../components/layout/marketing-layout'
import { ContentSectionRenderer, GraveListView } from '../../components/content-sections'
import { Grave, ImageMap } from '../../types'
import { useState } from 'react'

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

interface GraveListData {
  graveListPage?: {
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

export default function GravesPageClient({
  data,
  graves,
  imageMap,
}: {
  data: GraveListData
  graves?: Grave[]
  imageMap?: ImageMap | null
}) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <MarketingLayout
      headerProps={{ navigationConfig: data?.navigationBar }}
      footerProps={{ config: data?.footer }}
    >
      {/* Content Sections */}
      <ContentSectionRenderer
        sections={data?.graveListPage?.contentSections}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      {/* Grave List View Component */}
      <GraveListView
        graves={graves}
        imageMap={imageMap || undefined}
        searchQuery={searchQuery}
      />
    </MarketingLayout>
  )
}

