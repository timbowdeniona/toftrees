'use client'

import { Container, Box } from '@chakra-ui/react'
import { PortableText } from '@portabletext/react'
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

interface ProjectData {
  projectPage?: {
    content?: Array<Record<string, unknown>>
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

export default function ProjectPageClient({ data }: { data: ProjectData }) {
  return (
    <MarketingLayout
      headerProps={{ navigationConfig: data?.navigationBar }}
      footerProps={{ config: data?.footer }}
    >
      {/* Content Sections */}
      <ContentSectionRenderer sections={data?.projectPage?.contentSections} />

      {/* Project Content */}
      {Array.isArray(data?.projectPage?.content) && data.projectPage.content.length > 0 && (
        <Container maxW="container.xl" py={{ base: '32px', sm: '128px' }}>
          <Box maxW="3xl" mx="auto">
            <Box
              className="prose prose-lg max-w-none"
              sx={{
                color: 'var(--Secondary-Dark-Green, #1A1F16)',
                fontFamily: '"Host Grotesk"',
                lineHeight: '150%',
                '& h2': {
                  fontSize: '2xl',
                  fontWeight: 'bold',
                  mt: 8,
                  mb: 4,
                  color: 'var(--Secondary-Dark-Green, #1A1F16)',
                },
                '& h3': {
                  fontSize: 'xl',
                  fontWeight: 'semibold',
                  mt: 6,
                  mb: 3,
                  color: 'var(--Secondary-Dark-Green, #1A1F16)',
                },
                '& p': {
                  mb: 4,
                  lineHeight: '150%',
                  color: 'var(--Secondary-Dark-Green, #1A1F16)',
                },
                '& ul, & ol': {
                  mb: 4,
                  pl: 6,
                  color: 'var(--Secondary-Dark-Green, #1A1F16)',
                },
                '& li': {
                  mb: 2,
                  lineHeight: '150%',
                },
              }}
            >
              <PortableText
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                value={data.projectPage.content as any}
                components={{
                  marks: {
                    fontSize: ({ children, value }: { children: React.ReactNode; value?: { 
                      web?: number
                      mobile?: number
                    } }) => {
                      const sx: Record<string, unknown> = {}
                      
                      if (value?.web || value?.mobile) {
                        if (value.web && value.mobile) {
                          sx.fontSize = { base: `${value.mobile}px`, md: `${value.web}px` }
                        } else if (value.web) {
                          sx.fontSize = `${value.web}px`
                        } else if (value.mobile) {
                          sx.fontSize = `${value.mobile}px`
                        }
                      }
                      
                      return (
                        <Box as="span" sx={sx}>
                          {children}
                        </Box>
                      )
                    },
                  },
                }}
              />
            </Box>
          </Box>
        </Container>
      )}
    </MarketingLayout>
  )
}
