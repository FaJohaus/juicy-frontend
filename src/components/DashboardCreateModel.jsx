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
    const [startDate, setStartDate] = useState(""); // State for start date
    const [endDate, setEndDate] = useState(""); // State for end date

    const { user } = useUser();

    const handleCreate = () => {
        onCreate(
            name,
            selectedCustomers,
            {
                start: new Date(startDate).toISOString().split("T")[0] + "T00:00:00.000Z",
                end: new Date(endDate).toISOString().split("T")[0] + "T23:59:59.999Z"
            }
        );
        setName("");
        setSelectedCustomers([]);
        setStartDate("");
        setEndDate("");
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
                    <FormControl mb={4}>
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
                    <FormControl mb={4}>
                        <FormLabel>Time span</FormLabel>
                        <Input
                            type="date"
                            placeholder="Start Date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            mb={2}
                        />
                        <Input
                            type="date"
                            placeholder="End Date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
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