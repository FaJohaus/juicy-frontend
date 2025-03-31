import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Menu,
    MenuList, Flex, Card, MenuButton, Button, MenuOptionGroup, MenuItemOption, CardBody,
    Heading
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons"
import { useDashboard } from "../context/DashboardContext";

import WidgetListItem from "../widgets/WidgetListItem";

const DashboardEditModal = ({ isOpen, onClose }) => {
    /* TBD: Get ALL customers of one user instead*/
    const { name, time, customers, widgets } = useDashboard();

    const handleCustomerChange = (values) => {
        /* console.log(values); */
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
                maxW="88vw"
                maxH="90vh"
            >
                <ModalCloseButton />
                <ModalHeader textAlign="center">
                    {name}
                </ModalHeader>
                <ModalBody>
                    {/* TOP MENU */}
                    <Flex justify="space-between" px={20}>
                        <Menu >
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} width="50%" mr={5}>
                                Select Time
                            </MenuButton>
                            <MenuList>
                                <MenuOptionGroup defaultValue='current' type='radio'>
                                    <MenuItemOption value="current">
                                        {time.start.substring(0, 10)} - {time.end.substring(0, 10)}
                                    </MenuItemOption>
                                    <MenuItemOption value="last week">Last Week</MenuItemOption>
                                    <MenuItemOption value="last quarter">Last Quarter</MenuItemOption>
                                    <MenuItemOption value="last month">Last Month</MenuItemOption>
                                    <MenuItemOption value="last year">Last Year</MenuItemOption>
                                    <MenuItemOption value="last 2 years">Last 2 Years</MenuItemOption>
                                    <MenuItemOption value="last 5 years">Last 5 Years</MenuItemOption>
                                    <MenuItemOption value="custom">Custom Time</MenuItemOption>
                                </MenuOptionGroup>
                            </MenuList>
                        </Menu>

                        <Menu closeOnSelect={false}>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} width="50%">
                                Select Customers
                            </MenuButton>
                            <MenuList>
                                <MenuOptionGroup
                                    type='checkbox'
                                    onChange={handleCustomerChange}
                                >
                                    {customers.map(c =>
                                        <MenuItemOption value={c.id} key={c.id}>{c.name}</MenuItemOption>
                                    )}
                                </MenuOptionGroup>
                            </MenuList>
                        </Menu>
                    </Flex>

                    {/* WIDGET LIST SECTION */}
                    <Heading size="md" mt={5} textAlign="center">
                        Widgets
                    </Heading>
                    <Card
                        mt={5}
                        variant='outline'
                    >
                        <CardBody>
                            {widgets.map(w =>
                                <WidgetListItem widget={w} key={w._id} />
                            )}
                        </CardBody>
                    </Card>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" mr={2} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="blue">
                        Save Changes
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default DashboardEditModal;