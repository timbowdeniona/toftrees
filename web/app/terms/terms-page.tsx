'use client'

import { Container, Box } from '@chakra-ui/react'
import { PortableText } from '@portabletext/react'
import { MarketingLayout } from '../../components/layout/marketing-layout'
import { Homehero } from '../../components/content-sections'

interface TermsData {
  termPage?: {
    heroBanner?: {
      pageBreadcrumb?: string
      title?: string
      bodyText?: unknown[]
      backgroundImage?: unknown
      backgroundImageAltText?: string
      bannerColour?: string
    }
    content?: Array<Record<string, unknown>>
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

export default function TermsPageClient({ data }: { data: TermsData }) {
  return (
    <MarketingLayout
      headerProps={{ navigationConfig: data?.navigationBar }}
      footerProps={{ config: data?.footer }}
    >
      {/* Hero Banner */}
      {data?.termPage?.heroBanner && (
        <Homehero
          pageBreadcrumb={data.termPage.heroBanner.pageBreadcrumb}
          title={data.termPage.heroBanner.title}
          bodyText={data.termPage.heroBanner.bodyText}
          backgroundImage={data.termPage.heroBanner.backgroundImage}
          backgroundImageAltText={data.termPage.heroBanner.backgroundImageAltText}
          bannerColour={data.termPage.heroBanner.bannerColour}
        />
      )}

      {/* Terms Content */}
      <Container maxW="container.xl" py={{ base: '32px', sm: '128px' }}>
        <Box maxW="3xl" mx="auto">
          {Array.isArray(data?.termPage?.content) && data.termPage.content.length > 0 ? (
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
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <PortableText value={data.termPage.content as any} />
            </Box>
          ) : (
            <Box textAlign="center" py="12">
              <Box as="p" fontSize="lg" color="gray.500" _dark={{ color: 'gray.400' }}>
                No terms and conditions content available.
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </MarketingLayout>
  )
}

