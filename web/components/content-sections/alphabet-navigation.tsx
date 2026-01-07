'use client'

import { Box, Button, VStack } from '@chakra-ui/react'

interface AlphabetNavigationProps {
  onLetterClick?: (letterRange: string) => void
}

const alphabetRanges = [
  { label: 'A - C', letters: ['A', 'B', 'C'] },
  { label: 'D - G', letters: ['D', 'E', 'F', 'G'] },
  { label: 'H - N', letters: ['H', 'I', 'J', 'K', 'L', 'M', 'N'] },
  { label: 'O - Z', letters: ['O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'] },
]

export function AlphabetNavigation({ onLetterClick }: AlphabetNavigationProps) {
  const handleClick = (range: typeof alphabetRanges[0]) => {
    // Find the first existing letter section in the range
    const targetId = range.letters
      .map((l) => `letter-section-${l}`)
      .find((id) => document.getElementById(id))

    if (targetId) {
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    // Call callback if provided
    if (onLetterClick) {
      onLetterClick(range.label)
    }
  }

  return (
    <VStack spacing="8px" align="flex-start" justify="center">
      {alphabetRanges.map((range) => {
        // Calculate line width based on range (30px for longer ranges, 20px for shorter)
        const lineWidth = range.letters.length > 3 ? '30px' : '20px'
        const gap = range.letters.length > 3 ? '24px' : '34px'
        
        return (
          <Button
            key={range.label}
            variant="unstyled"
            onClick={() => handleClick(range)}
            display="flex"
            gap={gap}
            alignItems="center"
            justifyContent="flex-start"
            p={0}
            h="auto"
            minH="auto"
            cursor="pointer"
            _hover={{ opacity: 0.8 }}
            _active={{ opacity: 0.6 }}
          >
            <Box
              bg="#6B7A52"
              h="1px"
              w={lineWidth}
              flexShrink={0}
            />
            <Box
              as="span"
              sx={{
                fontFamily: '"Host Grotesk", sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                lineHeight: 'normal',
                color: '#6B7A52',
                textTransform: 'uppercase',
                textAlign: 'left',
              }}
            >
              {range.label}
            </Box>
          </Button>
        )
      })}
    </VStack>
  )
}

