'use client'

import { Container, Box } from '@chakra-ui/react'
import { PortableText } from '@portabletext/react'
import { MarketingLayout } from '../../components/layout/marketing-layout'
import { Homehero } from '../../components/content-sections'

interface ContactData {
  contactPage?: {
    heroBanner?: {
      pageBreadcrumb?: string
      title?: string
      bodyText?: unknown[]
      backgroundImage?: unknown
      backgroundImageAltText?: string
      bannerColour?: string
    }
    label?: string
    name?: string
    info?: Array<Record<string, unknown>>
    email?: string
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

export default function ContactPageClient({ data }: { data: ContactData }) {
  return (
    <MarketingLayout
      headerProps={{ navigationConfig: data?.navigationBar }}
      footerProps={{ config: data?.footer }}
    >
      {/* Hero Banner */}
      {data?.contactPage?.heroBanner && (
        <Homehero
          pageBreadcrumb={data.contactPage.heroBanner.pageBreadcrumb}
          title={data.contactPage.heroBanner.title}
          bodyText={data.contactPage.heroBanner.bodyText}
          backgroundImage={data.contactPage.heroBanner.backgroundImage}
          backgroundImageAltText={data.contactPage.heroBanner.backgroundImageAltText}
          bannerColour={data.contactPage.heroBanner.bannerColour}
        />
      )}

      {/* Contact Content */}
      <Container maxW="container.xl" py={{ base: '32px', sm: '128px' }}>
        <Box maxW="3xl" mx="auto">
          {/* Label */}
          {data?.contactPage?.label && (
            <Box
              mb={6}
              sx={{
                color: 'var(--Core-Green, #2E4028) !important',
                textAlign: 'center !important' as const,
                fontFamily: '"Cormorant Garamond" !important',
                fontSize: {
                  base: '40px !important',
                  sm: '64px !important',
                },
                fontStyle: 'normal !important' as const,
                fontWeight: '600 !important',
                lineHeight: '90% !important',
              }}
            >
              {data.contactPage.label}
            </Box>
          )}

          {/* Name */}
          {data?.contactPage?.name && (
            <Box
              sx={{
                color: 'var(--Secondary-Dark-Green, #1A1F16) !important',
                textAlign: 'center !important' as const,
                fontFamily: '"Host Grotesk" !important',
                fontSize: {
                  base: '18px !important',
                  sm: '20px !important',
                },
                fontStyle: 'normal !important' as const,
                fontWeight: '700 !important',
                lineHeight: '150% !important',
              }}
            >
              {data.contactPage.name}
            </Box>
          )}

          {/* Info */}
          {Array.isArray(data?.contactPage?.info) && data.contactPage.info.length > 0 && (
            <Box
              className="prose prose-lg max-w-none"
              sx={{
                color: 'var(--Secondary-Dark-Green, #1A1F16) !important',
                textAlign: 'center !important' as const,
                fontFamily: '"Host Grotesk" !important',
                fontSize: {
                  base: '18px !important',
                  sm: '20px !important',
                },
                fontStyle: 'normal !important' as const,
                fontWeight: '400 !important',
                lineHeight: '150% !important',
                '& h2, & h3, & h4, & p, & ul, & ol, & li': {
                  color: 'var(--Secondary-Dark-Green, #1A1F16) !important',
                  textAlign: 'center !important' as const,
                  fontFamily: '"Host Grotesk" !important',
                  fontSize: {
                    base: '18px !important',
                    sm: '20px !important',
                  },
                  fontStyle: 'normal !important' as const,
                  fontWeight: '400 !important',
                  lineHeight: '150% !important',
                },
              }}
            >
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <PortableText value={data.contactPage.info as any} />
            </Box>
          )}

          {/* Email */}
          {data?.contactPage?.email && (
            <Box
              sx={{
                color: 'var(--Secondary-Dark-Green, #1A1F16) !important',
                textAlign: 'center !important' as const,
                fontFamily: '"Host Grotesk" !important',
                fontSize: {
                  base: '18px !important',
                  sm: '20px !important',
                },
                fontStyle: 'normal !important' as const,
                fontWeight: '400 !important',
                lineHeight: '150% !important',
                textDecoration: 'underline !important',
              }}
            >
              {data.contactPage.email}
            </Box>
          )}
        </Box>
      </Container>
    </MarketingLayout>
  )
}

