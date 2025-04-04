import { SimpleGrid, Flex, Spacer, Button, Icon, Text, useTheme, TagLeftIcon, Select, Tag, Spinner } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons"
import { MdModeEdit } from "react-icons/md";
import { DashboardContextProvider } from "../context/DashboardContext";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import { getDashboard, getMyDashboards } from "../actions/dashboards";
import { useNavigate, useParams } from "react-router-dom";
import PreviewWrapper from "../widgets/insight-previews/PreviewWrapper";
import CustomerBadges from "../components/CustomerBadges";
import DashboardEditModal from "../components/DashboardEditModal";

const Dashboard = () => {
    const navigate = useNavigate();

    const { widget } = useTheme();
    const { user } = useUser();
    const { id } = useParams();

    const [dashboardTitles, setDashboardTitles] = useState([]);
    const [current, setCurrent] = useState(); // the current dashboard
    const [customers, setCustomers] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);

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
        const fetchDashboard = async () => {
            setCurrent(null);

            try {
                const data = await getDashboard(id);

                setCurrent(data);
            } catch (e) {
                console.error("Error fetching current dashboard: ", e);
            }
        }

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

    return (
        <>
            {!current ? <Spinner /> :
                <DashboardContextProvider dashboardCustomers={customers} time={current.time} name={current.name} widgets={current.widgets}>
                    <DashboardEditModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} />
                    <Flex mb={2}>
                        {/* LEFT SIDE */}
                        <Tag mr={1}>
                            <TagLeftIcon as={CalendarIcon} />
                            <Text>
                                Time: {current.time.start.substring(0, 10)} - {current.time.end.substring(0, 10)}
                            </Text>
                        </Tag>
                        <CustomerBadges />

                        <Spacer />

                        {/* RIGHT SIDE */}
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