import { SimpleGrid, Flex, Spacer, Button, Icon, Text, Tooltip, useTheme, TagLeftIcon, Select, Tag } from "@chakra-ui/react";
import { VscEdit } from "react-icons/vsc";
import { BsPeople } from "react-icons/bs";
import { VscCalendar } from "react-icons/vsc";
import { truncateText } from "../utils";
import { DashboardContextProvider } from "../context/DashboardContext";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import { getDashboard } from "../actions/dashboards";
import { getCustomerName } from "../actions/customers";
import { useNavigate, useParams } from "react-router-dom";
import PreviewWrapper from "../widgets/insight-previews/PreviewWrapper";

const Dashboard = () => {
    const navigate = useNavigate();

    const { widget } = useTheme();
    const { user } = useUser();
    const { id } = useParams();

    const [dashboardTitles, setDashboardTitles] = useState([]);
    const [current, setCurrent] = useState(); // the current dashboard
    const [customers, setCustomers] = useState([]);

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
        const titles = [];
        const fetchData = async (id) => {
            try {
                const { name } = await getDashboard(id);

                titles.push({ id: id, title: name });
            } catch (e) {
                console.error("Error fetching titles: ", e);
            }
        };

        user.dashboards.forEach(d => {
            fetchData(d);
        });

        setDashboardTitles(titles);
    }, [user]);

    /* EFFECTS WHEN NEW CURRENT DASHBOARD */
    useEffect(() => {
        if (!current) return;

        /* get all customer names */
        const fetchCustomers = async () => {
            const custs = [];

            try {
                for (const id of current.customers) {
                    const cust = await getCustomerName(id);

                    custs.push({ id: id, name: cust })
                }
            } catch (error) {
                console.error("Error fetching customers:", error);
            }

            setCustomers(custs);
        };

        fetchCustomers();
    }, [current]);

    return (
        <>
            {!current ? <div>loading...</div> :
                <DashboardContextProvider customers={customers} time={current.time}>
                    <Flex mb={2}>
                        {/* LEFT SIDE */}
                        <Tag mr={2}>
                            <TagLeftIcon as={VscCalendar} />
                            <Text>
                                Time: {current.time.start.substring(0, 10)} - {current.time.end.substring(0, 10)}
                            </Text>
                        </Tag>
                        <Tooltip label={customers.map((c) => c.name).join(", ")}>
                            <Tag mr={2}>
                                <TagLeftIcon as={BsPeople} />
                                <Text>
                                    Customers: {truncateText(customers.map((c) => c.name).join(", "), 30)}
                                </Text>
                            </Tag>
                        </Tooltip>

                        <Spacer />

                        {/* RIGHT SIDE */}
                        <Select size="sm" width="300px" mr={2} variant="filled">
                            {dashboardTitles.map(d => {
                                return <option key={d.id} onClick={() => navigate(`/dashboard/${d.id}`)}>
                                    {d.title}
                                </option>
                            })}
                        </Select>
                        <Button
                            leftIcon={<Icon as={VscEdit} />}
                            size="sm"
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