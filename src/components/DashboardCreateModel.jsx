import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Button,
    Input,
    FormControl,
    FormLabel,
    Menu,
    MenuButton,
    MenuList,
    MenuOptionGroup,
    MenuItemOption,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useUser } from "../context/UserContext";

const DashboardCreateModal = ({ isOpen, onClose, onCreate }) => {
    const [name, setName] = useState("");
    const [selectedCustomers, setSelectedCustomers] = useState([]);

    const { user } = useUser();

    const handleCreate = () => {
        onCreate(name, selectedCustomers);
        setName("");
        setSelectedCustomers([]);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create New Dashboard</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl mb={4}>
                        <FormLabel>Name</FormLabel>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Select Customers</FormLabel>
                        <Menu closeOnSelect={false}>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                Select Customers
                            </MenuButton>
                            <MenuList>
                                <MenuOptionGroup
                                    type="checkbox"
                                    value={selectedCustomers}
                                    onChange={(values) => setSelectedCustomers(values)}
                                >
                                    {user.customers.map((customer) => (
                                        <MenuItemOption key={customer.id} value={customer.id}>
                                            {customer.name}
                                        </MenuItemOption>
                                    ))}
                                </MenuOptionGroup>
                            </MenuList>
                        </Menu>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="blue" ml={2} onClick={handleCreate}>
                        Create
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DashboardCreateModal;