'use client'

import { MarketingLayout } from '../components/layout/marketing-layout'
import { ContentSectionRenderer } from '../components/content-sections'

interface ContentSection {
  _type: string;
  _key: string;
  heading?: string;
  bodyText?: unknown[];
  image?: unknown;
  imageAltText?: string;
  logo?: unknown;
  logoPosition?: 'left' | 'right';
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
  spacing?: {
    mobile?: {
      top?: number;
      bottom?: number;
    };
    web?: {
      top?: number;
      bottom?: number;
    };
  };
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
    additionLinks?: Array<{
      _key?: string;
      label: string;
      url: string;
    }>;
  };
}

export default function HomePage({ settings }: { settings: Settings }) {
  return (
    <MarketingLayout 
      headerProps={{ navigationConfig: settings?.navigationBar }}
      footerProps={{ config: settings?.footer }}
    >
      <ContentSectionRenderer sections={settings?.contentSections} />
    </MarketingLayout>
  )
}
