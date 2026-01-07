"use client";

import { Box } from "@chakra-ui/react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "../../sanity/client";

interface FreeTextProps {
  content: Array<Record<string, unknown>>;
  skipWrapper?: boolean;
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
}

const components: PortableTextComponents = {
  types: {
    image: ({
      value,
    }: {
      value: { asset?: { _ref: string }; alt?: string; caption?: string };
    }) => {
      if (!value?.asset) return null;

      return (
        <Box
          width="100%"
          position="relative"
          sx={{
            "& img": {
              width: "100%",
              height: "auto",
              objectFit: "contain",
            },
          }}
        >
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "Image"}
            width={1200}
            height={800}
            style={{
              width: "100%",
              height: "auto",
            }}
          />
          {value.caption && (
            <Box
              as="figcaption"
              mt="8px"
              fontSize="14px"
              color="#666"
              fontStyle="italic"
              textAlign="center"
            >
              {value.caption}
            </Box>
          )}
        </Box>
      );
    },
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children: React.ReactNode;
      value?: { href?: string; blank?: boolean };
    }) => {
      const target = value?.blank ? "_blank" : undefined;
      const rel = value?.blank ? "noopener noreferrer" : undefined;

      return (
        <Box
          as="a"
          href={value?.href}
          target={target}
          rel={rel}
          color="#2E4028"
          textDecoration="underline"
          _hover={{ opacity: 0.8 }}
        >
          {children}
        </Box>
      );
    },
    fontSize: ({
      children,
      value,
    }: {
      children: React.ReactNode;
      value?: { web?: number; mobile?: number };
    }) => {
      const sx: Record<string, unknown> = {};

      if (value?.web || value?.mobile) {
        if (value.web && value.mobile) {
          sx.fontSize = { base: `${value.mobile}px`, md: `${value.web}px` };
        } else if (value.web) {
          sx.fontSize = `${value.web}px`;
        } else if (value.mobile) {
          sx.fontSize = `${value.mobile}px`;
        }
      }

      return (
        <Box as="span" sx={sx}>
          {children}
        </Box>
      );
    },
    textAlign: ({
      children,
      value,
    }: {
      children: React.ReactNode;
      value?: { web?: string; mobile?: string };
    }) => {
      const sx: Record<string, unknown> = {};

      if (value?.web || value?.mobile) {
        if (value.web && value.mobile) {
          sx.textAlign = { base: value.mobile, md: value.web };
        } else if (value.web) {
          sx.textAlign = value.web;
        } else if (value.mobile) {
          sx.textAlign = value.mobile;
        }
      }

      return (
        <Box as="span" sx={sx} display="block">
          {children}
        </Box>
      );
    },
  },
};

export function FreeTextSection({
  content,
  skipWrapper = false,
  spacing,
}: FreeTextProps) {
  if (!content || content.length === 0) {
    return null;
  }

  const spacingStyle = spacing
    ? {
        pt:
          spacing.mobile?.top !== undefined && spacing.web?.top !== undefined
            ? { base: `${spacing.mobile.top}px`, md: `${spacing.web.top}px` }
            : spacing.mobile?.top !== undefined
            ? `${spacing.mobile.top}px`
            : spacing.web?.top !== undefined
            ? `${spacing.web.top}px`
            : undefined,
        pb:
          spacing.mobile?.bottom !== undefined && spacing.web?.bottom !== undefined
            ? { base: `${spacing.mobile.bottom}px`, md: `${spacing.web.bottom}px` }
            : spacing.mobile?.bottom !== undefined
            ? `${spacing.mobile.bottom}px`
            : spacing.web?.bottom !== undefined
            ? `${spacing.web.bottom}px`
            : undefined,
      }
    : {};

  const contentBox = (
    <Box
      maxW={skipWrapper ? "100%" : "3xl"}
      mx={skipWrapper ? 0 : "auto"}
      sx={{
        fontFamily: '"Host Grotesk", sans-serif',
        fontSize: "20px",
        fontWeight: 300,
        lineHeight: "1.5",
        color: "#1A1F16",
        "& p": {
          mb: "16px",
          "&:last-child": {
            mb: 0,
          },
        },
        "& h2": {
          fontSize: "2xl",
          fontWeight: "bold",
          mt: "32px",
          mb: "16px",
          color: "#1A1F16",
          "&:first-of-type": {
            mt: 0,
          },
        },
        "& h3": {
          fontSize: "xl",
          fontWeight: "semibold",
          mt: "24px",
          mb: "12px",
          color: "#1A1F16",
          "&:first-of-type": {
            mt: 0,
          },
        },
        "& h4": {
          fontSize: "lg",
          fontWeight: "semibold",
          mt: "20px",
          mb: "10px",
          color: "#1A1F16",
          "&:first-of-type": {
            mt: 0,
          },
        },
        "& ul, & ol": {
          mb: "16px",
          pl: "24px",
          color: "#1A1F16",
        },
        "& li": {
          mb: "8px",
          lineHeight: "1.5",
        },
        "& strong": {
          fontWeight: 600,
        },
        "& em": {
          fontStyle: "italic",
        },
      }}
    >
      <PortableText
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value={content as any}
        components={components}
      />
    </Box>
  );

  return <Box {...spacingStyle} px={{ base: '24px', md: 0 }}>{contentBox}</Box>;
}
