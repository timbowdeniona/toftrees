'use client'

import { Box, Container, Heading, Text, VStack, Button } from '@chakra-ui/react'
import { MarketingLayout } from '../components/layout/marketing-layout'
import { ContentSectionRenderer } from '../components/content-sections'
import Image from 'next/image'
import { urlFor } from '../sanity/client'

interface ChurchImage {
  asset: {
    _ref: string;
  };
}

interface ContentSection {
  _type: string;
  _key: string;
  heading?: string;
  bodyText?: unknown[];
  image?: unknown;
  imageAltText?: string;
  images?: Array<{
    image: unknown;
    imageAltText: string;
  }>;
  imagePosition?: 'left' | 'right' | 'centre';
  title?: string;
  textBackgroundColor?: string;
  titleText?: string;
  searchBarPlaceholder?: string;
  hyperlinkLabel?: string;
  hyperlinkUrl?: string;
  column1?: {
    columnTitle?: string;
    headingLevel?: string;
    bodyText?: unknown[];
  };
  column2?: {
    columnTitle?: string;
    headingLevel?: string;
    bodyText?: unknown[];
  };
  backgroundColor?: 'white' | 'lightGreen';
  ctaLabel?: string;
  ctaUrl?: string;
  heroBackgroundImage?: unknown;
  heroImageAltText?: string;
  overlayIconImage?: unknown;
  overlayIconAltText?: string;
  pageBreadcrumb?: string;
  backgroundImage?: unknown;
  backgroundImageAltText?: string;
  bannerColour?: string;
  timelineItems?: Array<{
    year: string;
    description: string;
  }>;
}

interface Settings {
  churchImage: ChurchImage;
  shortHistory: string;
  contentSections?: ContentSection[];
  navigationBar?: {
    logoImage?: {
      asset: {
        _ref: string;
        _type: 'reference';
      };
      _type: 'image';
    };
    titleText?: string;
    navigationLinks?: Array<{ _key?: string; linkText: string; linkUrl: string }>;
  };
  footer?: {
    navigationLinks?: Array<{ _key?: string; label: string; url: string }>;
    copyrightText?: string;
    privacyPolicyLabel?: string;
    privacyPolicyUrl?: string;
    termsLabel?: string;
    termsUrl?: string;
  };
}

const HeroSection: React.FC<{ churchImage: ChurchImage }> = ({ churchImage }) => {
  return (
    <Box position="relative" overflow="hidden">
      <Container maxW="container.xl" pt={{ base: 40, lg: 60 }} pb="40">
        <VStack spacing="8" textAlign="center">
          <Heading as="h1" size="2xl" fontWeight="bold">
            Toftrees Churchyard
          </Heading>
          <Text fontSize="xl" maxW="2xl">
            A history of the graves in the Toftrees churchyard in Norfolk.
          </Text>
          {churchImage && (
            <Box w="full" maxW="xl" h="96" rounded="lg" overflow="hidden" mx="auto">
              <Image
                src={urlFor(churchImage).url()}
                alt="Toftrees Church"
                width={800}
                height={192}
                objectFit="contain"
              />
            </Box>
          )}
          <Button as="a" href="#history" size="lg" colorScheme="gray">
            Learn More
          </Button>
        </VStack>
      </Container>
    </Box>
  )
}

const HistorySection: React.FC<{ shortHistory: string }> = ({ shortHistory }) => {
  return (
    <Box id="history">
      <Container maxW="container.lg" py="20">
        <VStack spacing="8">
          <Heading as="h2" size="xl">
            A Short History
          </Heading>
          <Text>
            {shortHistory}
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}

export default function HomePage({ settings }: { settings: Settings }) {
  return (
    <MarketingLayout 
      headerProps={{ navigationConfig: settings?.navigationBar }}
      footerProps={{ config: settings?.footer }}
    >
      <HeroSection churchImage={settings?.churchImage} />
      <HistorySection shortHistory={settings?.shortHistory} />
      <ContentSectionRenderer sections={settings?.contentSections} />
    </MarketingLayout>
  )
}
