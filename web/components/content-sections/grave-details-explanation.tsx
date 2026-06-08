'use client'

import { Box, Container, Flex, Heading } from '@chakra-ui/react'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '../../sanity/client'

interface BlockContent {
  _type: string
  [key: string]: unknown
}

interface MicrotextContent {
  title?: string
  image?: {
    asset: {
      _ref: string
    }
  }
  imageAltText?: string
  text?: BlockContent[]
}

interface GraveDetailsExplanationProps {
  data?: MicrotextContent | null
}

const DEFAULT_TITLE = 'Understanding Our Records'

const DEFAULT_PARAGRAPHS = [
  'GRO refers to the General Records Office records of deaths. So Q is the quarter of the year when the death occurred, followed by the year of birth. Then comes the local government area where the death was registered, followed by the volume number, and sometimes the letter of an additional volume, of their records, and finally the page where it is recorded.',
  'REF refers to the parish Burial Register. First there is the year of the death, then the page number, and finally the entry number.',
  'Deaths after 1999 may not yet have a GRO or Parish Register entry recorded on the website.',
  'A portion of the interactive churchyard map is shown for context, although you can also view the whole churchyard by clicking on the Map button at the top of the page. This is especially useful if you find that there are more than one person buried in our churchyard with the name you are searching for.',
  'We are always mindful that there are many people buried in our churchyard that do not have a memorial, and so are not included in this list. We remember all of them in our prayers.',
]

export function GraveDetailsExplanation({ data }: GraveDetailsExplanationProps) {
  // Use Sanity image if available, fallback to local parish-register image
  const imageSrc = data?.image?.asset?._ref
    ? urlFor(data.image).url()
    : '/parish-register.png'

  const imageAlt = data?.imageAltText || 'A historic parish burial register illustration'
  const title = data?.title || DEFAULT_TITLE

  return (
    <Box w="full" bg="#FBFAF7" borderTop="1px solid #EFECE6">
      <Container maxW="full" px={{ base: '24px', md: '88px' }} py={{ base: '48px', md: '80px' }}>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          gap={{ base: '32px', md: '64px', lg: '88px' }}
          align="center"
        >
          {/* Left Side: Illustrative Image */}
          <Box
            flex={{ base: 'none', lg: '4' }}
            w="full"
            position="relative"
            h={{ base: '300px', sm: '400px', lg: '500px' }}
            borderRadius="4px"
            overflow="hidden"
            boxShadow="0 4px 20px rgba(26, 31, 22, 0.08)"
            bg="#EFECE6"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              sizes="(max-width: 992px) 100vw, 40vw"
              priority
            />
          </Box>

          {/* Right Side: Managed Copy */}
          <Flex flex={{ base: 'none', lg: '6' }} direction="column" align="start" w="full">
            <Heading
              as="h3"
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: { base: '32px', md: '44px' },
                fontWeight: 600,
                lineHeight: '110%',
                color: 'var(--Secondary-Dark-Green, #1A1F16)',
                mb: '24px',
              }}
            >
              {title}
            </Heading>

            <Box
              sx={{
                fontFamily: '"Host Grotesk", sans-serif',
                fontSize: { base: '16px', md: '18px' },
                fontWeight: 300,
                lineHeight: '160%',
                color: 'var(--Secondary-Dark-Green, #1A1F16)',
                '& p': {
                  mb: '20px',
                },
                '& p:last-of-type': {
                  mb: 0,
                },
                '& ul': {
                  listStyleType: 'disc',
                  listStylePosition: 'outside',
                  pl: '24px',
                  mb: '16px',
                  mt: '8px',
                },
                '& ol': {
                  listStyleType: 'decimal',
                  listStylePosition: 'outside',
                  pl: '24px',
                  mb: '16px',
                  mt: '8px',
                },
                '& li': {
                  mb: '8px',
                  lineHeight: '1.5',
                },
              }}
            >
              {data?.text && data.text.length > 0 ? (
                <PortableText value={data.text} />
              ) : (
                DEFAULT_PARAGRAPHS.map((p, idx) => <p key={idx}>{p}</p>)
              )}
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
