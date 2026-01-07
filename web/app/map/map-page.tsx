'use client'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Container,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { MarketingLayout } from '../../components/layout/marketing-layout'
import Image from 'next/image'
import { urlFor, writeClient } from '../../sanity/client'
import Link from 'next/link'
import { ImageMap, Hotspot, Grave } from '../../types'
import { useSearchParams } from 'next/navigation';
import { useState, useRef, MouseEvent, useMemo } from 'react'
import { FaFlag } from 'react-icons/fa'

export default function MapPageClient({
  imageMap: initialImageMap,
  graves,
}: {
  imageMap: ImageMap
  graves: Grave[]
}) {
  const [imageMap, setImageMap] = useState(initialImageMap)
  const [contextMenu, setContextMenu] = useState<{
    x: number
    y: number
    hotspot: Hotspot | null
    type: 'add' | 'delete'
    coords?: { x: number; y: number }
  } | null>(null)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [isGraveSelectorOpen, setIsGraveSelectorOpen] = useState(false)
  const [newHotspotCoords, setNewHotspotCoords] = useState<{ x: number; y: number } | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const cancelRef = useRef<HTMLButtonElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [hotspotToDelete, setHotspotToDelete] = useState<Hotspot | null>(null)

  const searchParams = useSearchParams()
  const graveId = searchParams.get('grave')

  const filteredGraves = useMemo(() => {
    if (!searchTerm) return graves
    return graves.filter((grave) =>
      `${grave.graveNo} ${grave.familySurname}`.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [graves, searchTerm])

  const graveMap = useMemo(() => {
    if (!graves) return new Map()
    return new Map(graves.map((grave) => [grave._id, grave]))
  }, [graves])

  if (!imageMap) {
    return (
      <MarketingLayout>
        <Container maxW="container.xl" py="20">
          <Text textAlign="center">No map found.</Text>
        </Container>
      </MarketingLayout>
    )
  }

  const handleHotspotContextMenu = (e: MouseEvent<HTMLDivElement>, hotspot: Hotspot) => {
    e.preventDefault()
    e.stopPropagation()
    setContextMenu({ x: e.clientX, y: e.clientY, hotspot, type: 'delete' })
  }

  const handleMapContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (imageContainerRef.current) {
      const rect = imageContainerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setContextMenu({ x: e.clientX, y: e.clientY, hotspot: null, type: 'add', coords: { x, y } })
    }
  }

  const closeContextMenu = () => {
    setContextMenu(null)
  }

  const handleDeleteClick = () => {
    if (contextMenu && contextMenu.hotspot) {
      setHotspotToDelete(contextMenu.hotspot)
      setIsAlertOpen(true)
      closeContextMenu()
    }
  }

  const handleAddHotspotClick = () => {
    if (contextMenu && contextMenu.type === 'add' && contextMenu.coords) {
      setNewHotspotCoords(contextMenu.coords)
      setIsGraveSelectorOpen(true)
      closeContextMenu()
    }
  }

  const handleGraveSelect = async (grave: Grave) => {
    if (newHotspotCoords) {
      const newHotspot: Hotspot = {
        _key: Date.now().toString(),
        _type: 'hotspot',
        x: newHotspotCoords.x,
        y: newHotspotCoords.y,
        grave: { _ref: grave._id, _type: 'reference' },
      }
      await writeClient
        .patch(imageMap._id)
        .insert('after', 'hotspots[-1]', [newHotspot])
        .commit()
      setImageMap({ ...imageMap, hotspots: [...(imageMap.hotspots || []), newHotspot] })
      setNewHotspotCoords(null)
    }
    setIsGraveSelectorOpen(false)
  }

  const onConfirmDelete = async () => {
    if (hotspotToDelete) {
      await writeClient
        .patch(imageMap._id)
        .unset([`hotspots[_key=="${hotspotToDelete._key}"]`])
        .commit()
      const updatedHotspots = imageMap.hotspots.filter(
        (h) => h._key !== hotspotToDelete._key,
      )
      setImageMap({ ...imageMap, hotspots: updatedHotspots })
      setHotspotToDelete(null)
    }
    setIsAlertOpen(false)
  }

  return (
    <MarketingLayout>
      <Container maxW="container.xl" py="20" onClick={closeContextMenu}>
        <Heading as="h1" size="2xl" textAlign="center" mb="12">
          {imageMap.title}
        </Heading>
        {imageMap.image ? (
          <Box position="relative" onContextMenu={handleMapContextMenu} ref={imageContainerRef}>
            <Image
              ref={imageRef}
              src={urlFor(imageMap.image).url()}
              alt={imageMap.title}
              width={2000}
              height={1000}
            />
            {imageMap.hotspots?.map((hotspot: Hotspot) => {
              // Handle both reference and object types
              const graveIdFromHotspot = hotspot.grave && '_ref' in hotspot.grave 
                ? hotspot.grave._ref 
                : hotspot.grave && '_id' in hotspot.grave 
                ? hotspot.grave._id 
                : undefined
              const grave = graveIdFromHotspot ? graveMap.get(graveIdFromHotspot) : undefined
              const isSelected = grave?._id === graveId
              return (
                <Tooltip label={grave?.familySurname || ''} aria-label="A tooltip" key={hotspot._key} isOpen={isSelected}>
                  {isSelected ? (
                    <Box
                      as={FaFlag}
                      position="absolute"
                      top={`${hotspot.y}%`}
                      left={`${hotspot.x}%`}
                      color="yellow.500"
                      size="20px"
                      transform="translate(-50%, -100%)" // Adjust to position flag correctly
                    />
                  ) : (
                    <Box
                      as={Link}
                      href={`/graves/${graveIdFromHotspot || ''}`}
                      onContextMenu={(e: MouseEvent<HTMLDivElement>) => handleHotspotContextMenu(e, hotspot)}
                      position="absolute"
                      top={`${hotspot.y}%`}
                      left={`${hotspot.x}%`}
                      width="10px"
                      height="10px"
                      bg="red.500"
                      borderRadius="full"
                      transform="translate(-50%, -50%)"
                    />
                  )}
                </Tooltip>
              )
            })}
            {contextMenu && (
              <Box
                position="fixed"
                top={`${contextMenu.y}px`}
                left={`${contextMenu.x}px`}
                bg="gray.800"
                color="white"
                border="1px solid"
                borderColor="gray.600"
                borderRadius="md"
                p={2}
                boxShadow="md"
              >
                {contextMenu.type === 'delete' ? (
                  <Button variant="ghost" size="sm" onClick={handleDeleteClick}>
                    Delete Hotspot
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" onClick={handleAddHotspotClick}>
                    Add Hotspot
                  </Button>
                )}
              </Box>
            )}
          </Box>
        ) : (
          <Text textAlign="center">No map image found.</Text>
        )}
      </Container>
      <AlertDialog isOpen={isAlertOpen} leastDestructiveRef={cancelRef} onClose={() => setIsAlertOpen(false)}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Hotspot
            </AlertDialogHeader>
            <AlertDialogBody>Are you sure you want to delete this hotspot?</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsAlertOpen(false)}>
                No
              </Button>
              <Button colorScheme="red" onClick={onConfirmDelete} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Modal isOpen={isGraveSelectorOpen} onClose={() => setIsGraveSelectorOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select a Grave</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Search by grave number or surname"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              mb={4}
            />
            <VStack spacing={2} align="stretch" maxH="400px" overflowY="auto">
              {filteredGraves.map((grave) => (
                <Button key={grave._id} onClick={() => handleGraveSelect(grave)} justifyContent="flex-start">
                  {grave.graveNo} - {grave.familySurname}
                </Button>
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </MarketingLayout>
  )
}
