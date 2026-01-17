'use client'

import { Box, Container, VStack } from '@chakra-ui/react'
import { MarketingLayout } from '../../components/layout/marketing-layout'
import { ContentSectionRenderer } from '../../components/content-sections'

interface ContentSection {
  _type: string
  _key: string
  heading?: string
  bodyText?: unknown[]
  image?: unknown
  imageAltText?: string
  logo?: unknown
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

interface GrantsFundingData {
  grantsFundingPage?: {
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

export default function GrantsFundingPageClient({ data }: { data: GrantsFundingData }) {
  const sections = data?.grantsFundingPage?.contentSections || []
  
  // Full-width sections that should not be constrained
  const fullWidthSections = ['heroBanner', 'heroImage']
  
  return (
    <MarketingLayout
      headerProps={{ navigationConfig: data?.navigationBar }}
      footerProps={{ config: data?.footer }}
    >
      <VStack 
        spacing={0} 
        align="stretch" 
        width="100%"
        sx={{
          '& > *:not(:nth-child(-n + 2))': {
            marginTop: { base: '32px', md: '24px' },
          },
        }}
      >
          {sections.map((section) => {
            const isFullWidth = fullWidthSections.includes(section._type)
            
            const renderedSection = <ContentSectionRenderer key={section._key} sections={[section]} name="grantsFundingPage"/>
            
            if (isFullWidth) {
              return <Box key={section._key}>{renderedSection}</Box>
            }
            
            return (
              <Container key={section._key} maxW="container.xl" px={0}>
                <Box maxW="800" mx="auto">
                  {renderedSection}
                </Box>
              </Container>
            )
          })}
        </VStack>
    </MarketingLayout>
  )
}

