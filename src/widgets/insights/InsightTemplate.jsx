// Insight view should be switchable between almost fullscreen modal or 2/3-sized side drawer (like Notion Pages)
// Maybe add full page view later (other options allow for quicker switch between Dashboard and Insight)

import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Button, ModalHeader } from "@chakra-ui/react";

const InsightTemplate = () => {
    return (
        <Modal /* onClose={onClose} isOpen={isOpen} */ size="full">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>Dolor sit amet</ModalHeader>
                <ModalBody>
                    Lorem Ipsum
                </ModalBody>
                <ModalCloseButton />
            </ModalContent>
        </Modal>
    );
}

export default InsightTemplate;