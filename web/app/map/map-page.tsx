'use client'

import { Box, Container, Heading, Text, Menu, MenuButton, MenuList, MenuItem, useDisclosure } from '@chakra-ui/react'
import { MarketingLayout } from '../../components/layout/marketing-layout'
import Image from 'next/image'
import { urlFor, client } from '../../sanity/client'
import Link from 'next/link'
import { ImageMap, Hotspot, Grave } from '../../types'
import { useState, useRef } from 'react'
import GraveSelectionModal from './grave-selection-modal'

export default function MapPageClient({ imageMap: initialImageMap }: { imageMap: ImageMap }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLImageElement>(null)
  const [imageMap, setImageMap] = useState<ImageMap | undefined>(initialImageMap)

  if (!imageMap) {
    return (
      <MarketingLayout>
        <Container maxW="container.xl" py="20">
          <Text textAlign="center">No map found.</Text>
        </Container>
      </MarketingLayout>
    )
  }

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    const rect = imageRef.current?.getBoundingClientRect()
    if (rect) {
      setMenuPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top })
      onOpen()
    }
  }

  const handleAddHotspot = () => {
    onClose()
    onModalOpen()
  }

  const handleSelectGrave = async (grave: Grave) => {
    onModalClose()

    if (imageRef.current && imageMap) {
      const { width, height } = imageRef.current.getBoundingClientRect()
      const x = (menuPosition.x / width) * 100
      const y = (menuPosition.y / height) * 100

      const newHotspotForSanity = {
        _key: new Date().toISOString(),
        _type: 'hotspot',
        x,
        y,
        grave: {
          _type: 'reference',
          _ref: grave._id,
        },
      }

      const newHotspotForState: Hotspot = {
        _key: newHotspotForSanity._key,
        x: newHotspotForSanity.x,
        y: newHotspotForSanity.y,
        grave: {
          _ref: newHotspotForSanity.grave._ref,
        },
      }

      setImageMap(prev => {
        if (!prev) return prev;
        return {
            ...prev,
            hotspots: [...(prev.hotspots || []), newHotspotForState],
        }
      })

      await client.patch(imageMap._id).setIfMissing({ hotspots: [] }).append('hotspots', [newHotspotForSanity]).commit()
    }
  }

  return (
    <MarketingLayout>
      <Container maxW="container.xl" py="20">
        <Heading as="h1" size="2xl" textAlign="center" mb="12">
          {imageMap.title}
        </Heading>
        {imageMap.image ? (
          <Box position="relative" onContextMenu={handleContextMenu}>
            <Image
              ref={imageRef}
              src={urlFor(imageMap.image).url()}
              alt={imageMap.title}
              width={2000}
              height={1000}
            />
            {imageMap.hotspots?.map((hotspot: Hotspot) => (
              <Link href={`/graves/${hotspot.grave._ref}`} key={hotspot._key}>
                <Box
                  position="absolute"
                  top={`${hotspot.y}%`}
                  left={`${hotspot.x}%`}
                  width="10px"
                  height="10px"
                  bg="red.500"
                  borderRadius="full"
                  transform="translate(-50%, -50%)"
                />
              </Link>
            ))}
            <Menu isOpen={isOpen} onClose={onClose}>
              <MenuButton style={{ position: 'absolute', top: menuPosition.y, left: menuPosition.x }} />
              <MenuList>
                <MenuItem onClick={handleAddHotspot}>Add Hotspot</MenuItem>
              </MenuList>
            </Menu>
            <GraveSelectionModal isOpen={isModalOpen} onClose={onModalClose} onSelectGrave={handleSelectGrave} />
          </Box>
        ) : (
          <Text textAlign="center">No map image found.</Text>
        )}
      </Container>
    </MarketingLayout>
  )
}
