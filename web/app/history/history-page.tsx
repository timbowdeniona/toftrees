'use client'

import { MarketingLayout } from '../../components/layout/marketing-layout'
import { Homehero } from '../../components/content-sections'
import { ContentSectionRenderer } from '../../components/content-sections'

interface ContentSection {
  _type: string
  _key: string
  heading?: string
  bodyText?: unknown[]
  image?: unknown
  imageAltText?: string
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
  backgroundColor?: 'white' | 'lightGreen'
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

interface HistoryData {
  historyPage?: {
    heroBanner?: {
      pageBreadcrumb?: string
      title?: string
      bodyText?: unknown[]
      backgroundImage?: unknown
      backgroundImageAltText?: string
      bannerColour?: string
    }
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

export default function HistoryPageClient({ data }: { data: HistoryData }) {
  return (
    <MarketingLayout
      headerProps={{ navigationConfig: data?.navigationBar }}
      footerProps={{ config: data?.footer }}
    >
      {/* Hero Banner */}
      {data?.historyPage?.heroBanner && (
        <Homehero
          pageBreadcrumb={data.historyPage.heroBanner.pageBreadcrumb}
          title={data.historyPage.heroBanner.title}
          bodyText={data.historyPage.heroBanner.bodyText}
          backgroundImage={data.historyPage.heroBanner.backgroundImage}
          backgroundImageAltText={data.historyPage.heroBanner.backgroundImageAltText}
          bannerColour={data.historyPage.heroBanner.bannerColour}
        />
      )}

      {/* Content Sections */}
      <ContentSectionRenderer sections={data?.historyPage?.contentSections} />
    </MarketingLayout>
  )
}

