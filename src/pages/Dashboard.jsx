import { SimpleGrid, Flex, Spacer, Button, Icon, Text, Tooltip, useTheme, TagLeftIcon, Select, Tag } from "@chakra-ui/react";
import { VscEdit } from "react-icons/vsc";
import PreviewCard from "../widgets/insight-previews/PreviewCard";
import PieChartPreview from "../widgets/insight-previews/PieChartPreview";
import { BsPeople } from "react-icons/bs";
import { VscCalendar } from "react-icons/vsc";
import BarChartPreview from "../widgets/insight-previews/BarChartPreview";
import { truncateText } from "../utils";
import LineChartPreview from "../widgets/insight-previews/LineChartPreview";
import { DashboardContextProvider } from "../context/DashboardContext";
import TimeLinePreview from "../widgets/insight-previews/TimeLinePreview";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import { getDashboard } from "../actions/dashboards";
import { getCustomerName } from "../actions/customers";

const Dashboard = () => {
    /* ------ EXAMPLE DATA ----- */

    // Rework the idea of those. Only time and customer subset make sense globally. Subfilterning events is only for Timeline Preview
    const exampleFilters = ["This Month", "Company A, Company C"];

    const pieChartData = [
        { name: 'Customer A', value: 400 },
        { name: 'Customer B', value: 300 },
        { name: 'Customer C', value: 300 },
        { name: 'Customer D', value: 200 },
        { name: 'Customer E', value: 150 },
    ];

    const barChartData = [
        {
            name: "Customer A",
            value1: 6,
        },
        {
            name: "Customer B",
            value1: 6,
        },
        {
            name: "Customer C",
            value1: 7,
        },
        {
            name: "Customer D",
            value1: 1,
        },
        {
            name: "Customer E",
            value1: 8
        }
    ];

    // TBD: "Abtastrate" dynamisch nach Zeitintervall und verfügbarem Screenplatz anpassen
    // TBD: Methode schreiben, die die echten Daten in diese scheiss Form hier überträgt
    const lineChartData = [
        {
            "name": "KW 21",
            "Customer A": 5,
            "Customer B": 6,
            "Customer C": 7,
            "Customer D": 2,
            "Customer E": null
        },
        {
            "name": "KW 22",
            "Customer A": 5.5,
            "Customer B": 4,
            "Customer C": 8,
            "Customer D": 1,
            "Customer E": null
        },
        {
            "name": "KW 24",
            "Customer A": 4,
            "Customer B": 6,
            "Customer C": 8,
            "Customer D": 1.5,
            "Customer E": 5
        },
        {
            "name": "KW 24",
            "Customer A": 6,
            "Customer B": 6,
            "Customer C": 7,
            "Customer D": 1,
            "Customer E": 8
        },
    ];

    const timelineData = [
        { "_id": "1", "subevent": "1.1", "nextevent": "2", "previousevent": null, "type": "mail", "date": "01.01.24" },
        { "_id": "1.1", "subevent": null, "nextevent": null, "previousevent": null, "type": "call", "date": "05.01.24" },
        { "_id": "2", "subevent": "2.1", "nextevent": "3", "previousevent": "1", "type": "retour", "date": "15.01.24" },
        { "_id": "2.1", "subevent": "2.1.1", "nextevent": null, "previousevent": null, "type": "visit", "date": "28.01.24" },
        { "_id": "2.1.1", "subevent": "2.1.1.1", "nextevent": null, "previousevent": null, "type": "mail", "date": "10.02.24" },
        { "_id": "2.1.1.1", "subevent": null, "nextevent": null, "previousevent": null, "type": "call", "date": "25.02.24" },
        { "_id": "3", "subevent": null, "nextevent": "4", "previousevent": "2", "type": "purchase", "date": "10.03.24" },
        { "_id": "4", "subevent": "4.1", "nextevent": null, "previousevent": "3", "type": "retour", "date": "25.03.24" },
        { "_id": "4.1", "subevent": "4.1.1", "nextevent": null, "previousevent": null, "type": "visit", "date": "15.04.24" },
        { "_id": "4.1.1", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "05.05.24" },
        { "_id": "5", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },

        /* { "_id": "6", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },
        { "_id": "7", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },
        { "_id": "8", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },
        { "_id": "9", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },
        { "_id": "51", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },
        { "_id": "52", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },
        { "_id": "53", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },
        { "_id": "54", "subevent": null, "nextevent": null, "previousevent": null, "type": "call", "date": "20.05.24" },

        { "_id": "116", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },
        { "_id": "117", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },
        { "_id": "118", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },
        { "_id": "119", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },
        { "_id": "151", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },
        { "_id": "152", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },
        { "_id": "153", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },
        { "_id": "154", "subevent": null, "nextevent": null, "previousevent": null, "type": "call", "date": "20.05.24" }, */
    ];



    /* ---------- */
    const { widget } = useTheme();
    const { user } = useUser();

    const [dashboardTitles, setDashboardTitles] = useState([]);
    const [currentId, setCurrentId] = useState();
    const [current, setCurrent] = useState(); // the current dashboard
    const [customers, setCustomers] = useState([]);
    const [time, setTime] = useState();

    /* EFFECTS WHEN NEW USER OBJECT */
    useEffect(() => {
        if (!user) return;

        /* set current dashboard id */
        setCurrentId(user.dashboards[0]);

        /* get the titles of all dashboards */
        const titles = [];
        const fetchData = async (id) => {
            try {
                const { name } = await getDashboard(id);

                titles.push(name);
            } catch (e) {
                console.error("Error fetching titles: ", e);
            }
        };

        user.dashboards.forEach(d => {
            fetchData(d);
        });

        setDashboardTitles(titles);
    }, [user]);

    /* EFFECTS WHEN NEW CURRENT DASHBOARD ID */
    useEffect(() => {
        if (!currentId) return;

        /* get the current dashboard */
        const fetchDashboard = async () => {
            try {
                const data = await getDashboard(currentId);

                setCurrent(data);
            } catch (e) {
                console.error("Error fetching current dashboard: ", e);
            }
        }

        fetchDashboard();
    }, [currentId]);

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
                                return <option key={d}>{d}</option>
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
                        <PieChartPreview data={pieChartData} title="Relativer Umsatzanteil" />
                        <BarChartPreview data={barChartData} title="Aktuelle Kundenzufriedenheit" maxVal={10} />
                        <LineChartPreview data={lineChartData} title="Verlauf Kundenzufriedenheit" maxVal={10} />
                        <TimeLinePreview data={timelineData} title="Timeline alle Events" />
                    </SimpleGrid>
                </DashboardContextProvider>
            }
        </>
    );
}

export default Dashboard;