
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';


interface StepTwoProps {
    onOkClick: () => void;
}


export default function StepTwo({ onOkClick }: StepTwoProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef(null)

    return (
        <Box w='100%' p={4} color='black' >
            <Button mt={4} onClick={onOpen} size='sm'>
                Info 🎁
            </Button>
            <Modal isCentered finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader></ModalHeader>
                    <ModalBody>
                        <p>1. The max. amount of money spent per gift is 20lv 💵 - it could be anything from a single vafla 🍪 to a box of vafli. 📦</p>
                        <p>2. The gifts will be exchanged on the 31st of December, New Year's Eve 🎉 🥳.</p>
                        <p>3. The most important thing is to hand it to the person with love 🥰 and care 🎄.</p>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='green' mr={3} size="xs" onClick={() => { onClose(); onOkClick(); }}>
                            OK
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}
