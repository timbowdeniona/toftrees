'use client'

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, List, ListItem, Button } from '@chakra-ui/react'
import { client } from '../../sanity/client'
import { Grave } from '../../types'
import { useEffect, useState } from 'react'

async function getGraves(): Promise<Grave[]> {
  const graves = await client.fetch(`*[_type == "grave"]{_id, graveNo, familySurname} | order(graveNo)`);
  return graves;
}

export default function GraveSelectionModal({ isOpen, onClose, onSelectGrave }: { isOpen: boolean, onClose: () => void, onSelectGrave: (grave: Grave) => void }) {
  const [graves, setGraves] = useState<Grave[]>([]);

  useEffect(() => {
    getGraves().then(setGraves);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select a Grave</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <List spacing={3}>
            {graves.map((grave) => (
              <ListItem key={grave._id}>
                <Button onClick={() => onSelectGrave(grave)} width="full">
                  {grave.graveNo} - {grave.familySurname}
                </Button>
              </ListItem>
            ))}
          </List>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
