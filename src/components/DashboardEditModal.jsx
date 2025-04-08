import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Menu,
    MenuList, Flex, Card, MenuButton, Button, MenuOptionGroup, MenuItemOption, CardBody, Heading,
    IconButton, FormControl, FormLabel, Input, Text
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ChevronDownIcon, SmallAddIcon } from "@chakra-ui/icons";
import { MdModeEdit } from "react-icons/md";
import { useDashboard } from "../context/DashboardContext";
import { useUser } from "../context/UserContext";
import { swapInState } from "../utils";
import WidgetListItem from "../widgets/WidgetListItem";
import CreateWidgetMenu from "../widgets/CreateWidgetMenu";

const DashboardEditModal = ({ isOpen, onClose, onEdit }) => {
    const { name, time, dashboardCustomers, widgets } = useDashboard();
    const { user } = useUser();

    const [widgetList, setWidgetList] = useState([...widgets]);
    const [customerList, setCustomerList] = useState(dashboardCustomers.map(c => c.id));
    const [changes, setChanges] = useState({});
    const [showCreateMenu, setShowCreateMenu] = useState(false);

    const [startDate, setStartDate] = useState(time.start.substring(0, 10));
    const [endDate, setEndDate] = useState(time.end.substring(0, 10));

    useEffect(() => {
        if (!isOpen) setWidgetList([...widgets]);
    }, [isOpen]);

    useEffect(() => {
        setCustomerList(dashboardCustomers.map(c => c.id));
    }, [dashboardCustomers]);

    /* -------------------- SAVING CHANGES ------------------ */
    useEffect(() => {
        const _changes = JSON.parse(JSON.stringify(changes));
        _changes.time = {
            start: new Date(startDate).toISOString().split("T")[0] + "T00:00:00.000Z",
            end: new Date(endDate).toISOString().split("T")[0] + "T23:59:59.999Z"
        };

        setChanges(_changes);
    }, [startDate, endDate]);

    useEffect(() => {
        if (JSON.stringify(widgets) === JSON.stringify(widgetList)) return;

        const _changes = JSON.parse(JSON.stringify(changes));
        _changes.widgets = widgetList;
        setChanges(_changes);
    }, [widgetList]);

    useEffect(() => {
        if (JSON.stringify(dashboardCustomers.map(c => c.id)) === JSON.stringify(customerList)) return;

        const _changes = JSON.parse(JSON.stringify(changes));
        _changes.customers = customerList;
        setChanges(_changes);
    }, [customerList]);

    /* -------------------- SAVING CHANGES ------------------ */

    const onMoveWidget = (up, id) => {
        const i = widgetList.findIndex(w => w._id === id);

        if ((!up && i === widgetList.length - 1) || (up && i === 0)) return;

        if (up) {
            swapInState(widgetList, setWidgetList, i, i - 1);
        } else {
            swapInState(widgetList, setWidgetList, i, i + 1);
        };
    }

    const onDeleteWidget = (id) => {
        const temp = [...widgetList];

        temp.splice(temp.findIndex(w => w._id === id), 1);
        setWidgetList(temp);
    }

    const addWidget = (widget) => {
        setWidgetList([...widgetList, widget]);
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
                maxW="70vw"
            >
                <ModalCloseButton />
                <ModalHeader textAlign="center">
                    {name}
                    {/* <IconButton
                        icon={<MdModeEdit />}
                        variant="ghost"
                        rounded={100}
                    /> */}
                </ModalHeader>
                <ModalBody>
                    {/* TOP MENU */}
                    <Flex justify="space-between" px={20}>
                        <FormControl mb={4} mr={4}>
                            <FormLabel>Select Timespan</FormLabel>
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

                        <Menu closeOnSelect={false}>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} width="50%">
                                Select Customers
                            </MenuButton>
                            <MenuList>
                                <MenuOptionGroup
                                    type='checkbox'
                                    value={customerList}
                                    onChange={(value) => setCustomerList(value)}
                                >
                                    {user.customers.map(c =>
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
                            {widgetList.map(w =>
                                <WidgetListItem
                                    widget={w}
                                    key={w._id}
                                    onMove={onMoveWidget}
                                    onDelete={onDeleteWidget}
                                />
                            )}
                            <Flex justify="center">
                                <Menu
                                    closeOnSelect={false}
                                    placement="top"
                                    isOpen={showCreateMenu}
                                    onClose={() => setShowCreateMenu(false)}
                                >
                                    <MenuButton
                                        as={IconButton}
                                        icon={<SmallAddIcon />}
                                        height={9}
                                        width="200px"
                                        onClick={() => setShowCreateMenu(true)}
                                    />
                                    <CreateWidgetMenu addWidget={addWidget} closeMenu={() => setShowCreateMenu(false)} />
                                </Menu>
                            </Flex>
                        </CardBody>
                    </Card>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" mr={2} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="blue" onClick={() => onEdit(changes)}>
                        Save Changes
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default DashboardEditModal;