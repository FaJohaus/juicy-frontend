import { SimpleGrid, Flex, Spacer, Button, Icon, Text, useTheme, TagLeftIcon, Select, Tag, Spinner, useToast, IconButton, Tooltip } from "@chakra-ui/react";
import { CalendarIcon, SmallAddIcon } from "@chakra-ui/icons"
import { MdModeEdit } from "react-icons/md";
import { DashboardContextProvider } from "../context/DashboardContext";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import { createDashboard, getDashboard, getMyDashboards } from "../actions/dashboards";
import { useNavigate, useParams } from "react-router-dom";
import PreviewWrapper from "../widgets/insight-previews/PreviewWrapper";
import CustomerBadges from "../components/CustomerBadges";
import DashboardEditModal from "../components/DashboardEditModal";
import { updateDashboard } from "../actions/dashboards";
import DashboardCreateModal from "../components/DashboardCreateModel";

const Dashboard = () => {
    const navigate = useNavigate();
    const toast = useToast();

    const { widget } = useTheme();
    const { user, refetchUser } = useUser();
    const { id } = useParams();

    const [dashboardTitles, setDashboardTitles] = useState([]);
    const [current, setCurrent] = useState(); // the current dashboard
    const [customers, setCustomers] = useState();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    /* EFFECTS WHEN ID CHANGES */
    useEffect(() => {
        if (!user) return;

        if (id === "0") {
            // => user has no dashboard yet
            if (!user.dashboards[0]) {
                // guide user to create first dashboard or something idgaf
            } else {
                navigate(`/dashboard/${user.dashboards[0]}`);
            }

            return;
        }

        /* get the current dashboard */
        fetchDashboard();
    }, [id, user]);

    /* EFFECTS WHEN NEW USER OBJECT */
    useEffect(() => {
        if (!id) return;

        /* get the titles of all dashboards */
        const fetchDashboardTitles = async () => {
            try {
                const titles = await getMyDashboards();

                setDashboardTitles(titles);
            } catch (e) {
                console.error("Error fetching dashboard titles: ", e);
            }
        };

        fetchDashboardTitles();
    }, [user]);

    /* EFFECTS WHEN NEW CURRENT DASHBOARD */
    useEffect(() => {
        if (!current) return;

        /* get all customer names */
        setCustomers(user.customers.filter(c => current.customers.includes(c.id)));
    }, [current]);

    const fetchDashboard = async () => {
        setCurrent(null);

        try {
            const data = await getDashboard(id);

            setCurrent(data);
        } catch (e) {
            console.error("Error fetching current dashboard: ", e);
        }
    }

    const onEdit = async (changes) => {
        if (!changes) return;
        const newCurrent = await updateDashboard(id, changes);

        setCurrent(newCurrent);
        setShowEditModal(false);
        fetchDashboard();
        toast({
            title: "Changes were saved",
            status: "success",
            duration: 2000,
            isClosable: true
        })
    };

    const onCreate = async (name, customers) => {
        try {
            const id = await createDashboard(name, customers);

            await refetchUser();
            navigate(`/dashboard/${id}`);
        } catch (e) {
            console.error("Error creating dashboard: ", e);
        }
    }

    return (
        <>
            {!(current && customers) ? <Spinner /> :
                <DashboardContextProvider
                    dashboardCustomers={customers}
                    time={current.time}
                    name={current.name}
                    widgets={current.widgets}
                    id={id}
                >
                    <DashboardEditModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} onEdit={onEdit} />
                    <DashboardCreateModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} onCreate={onCreate} />
                    <Flex mb={2}>
                        {/* LEFT SIDE */}
                        <Tag mr={1} height={8} minWidth="200px">
                            <TagLeftIcon as={CalendarIcon} />
                            <Text>
                                {current.time.start.substring(0, 10)} - {current.time.end.substring(0, 10)}
                            </Text>
                        </Tag>
                        <CustomerBadges />

                        <Spacer />

                        {/* RIGHT SIDE */}
                        <Tooltip label="Create new dashboard">
                            <IconButton
                                as={SmallAddIcon}
                                size="sm"
                                mr={2}
                                onClick={() => setShowCreateModal(true)}
                            />
                        </Tooltip>
                        <Select
                            size="sm"
                            width="300px"
                            mr={2}
                            variant="filled"
                            defaultValue={id}
                        >
                            {dashboardTitles.map(d => {
                                return <option key={d._id} value={d._id} onClick={() => navigate(`/dashboard/${d._id}`)}>
                                    {d.name}
                                </option>
                            })}
                        </Select>
                        <Button
                            leftIcon={<Icon as={MdModeEdit} />}
                            size="sm"
                            onClick={() => setShowEditModal(true)}
                            minW="60px"
                        >
                            <Text fontWeight="normal">Edit</Text>
                        </Button>
                    </Flex>

                    <SimpleGrid
                        gap={2}
                        minChildWidth={widget.baseMinWidth}
                    >
                        {current.widgets.map(w => <PreviewWrapper widget={w} key={w._id} />)}
                    </SimpleGrid>
                </DashboardContextProvider>
            }
        </>
    );
}

export default Dashboard;