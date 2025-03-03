import { Modal, ModalOverlay, ModalContent, ModalBody, ModalFooter, Button, ModalHeader } from "@chakra-ui/react";
import { useUser } from "../context/UserContext";

const LogoutModal = ({ isOpen, onClose }) => {
    const { logout } = useUser();

    return (
        <Modal onClose={onClose} isOpen={isOpen} size="sm">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Logout</ModalHeader>
                <ModalBody>
                    Are you sure you want to logout?
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose} mr={2}>
                        Cancel
                    </Button>
                    <Button colorScheme='red' onClick={logout}>
                        Logout
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default LogoutModal