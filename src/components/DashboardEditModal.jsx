import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from "@chakra-ui/react";

const DashboardEditModal = ({ isOpen, onClose }) => {


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
                maxW="85vw"
                maxH="85vh"
            >
                <ModalCloseButton />
                <ModalHeader>Custom Large Modal</ModalHeader>
                <ModalBody>
                    Hier ist der Inhalt des Modals.
                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default DashboardEditModal;