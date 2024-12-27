import { createContext } from "react";
import { SimpleGrid, Flex, Spacer, Button, Icon, Text, ButtonGroup, Tooltip } from "@chakra-ui/react";
import { VscFilter, VscEdit } from "react-icons/vsc";
import PreviewCard from "../widgets/insight-previews/PreviewCard";
import PieChartPreview from "../widgets/insight-previews/PieChartPreview";
import { IoMdCloseCircle } from "react-icons/io";
import BarChartPreview from "../widgets/insight-previews/BarChartPreview";
import { truncateText } from "../utils";
import LineChartPreview from "../widgets/insight-previews/LineChartPreview";
import useChartColors from "../hooks/useChartColors";

const Dashboard = () => {
    /* ------ EXAMPLE DATA ----- */
    const exampleFilters = ["This Month", "Company A, Company C", "E-Mail, Phone Calls"];

    const pieChartData = [
        { name: 'Customer A', value: 400 },
        { name: 'Customer B', value: 300 },
        { name: 'Customer C', value: 300 },
        { name: 'Customer D', value: 200 },
    ];

    const barChartData = [
        {
            name: "Customer A",
            value1: 9,
        },
        {
            name: "Customer B",
            value1: 6.5,
        },
        {
            name: "Customer C",
            value1: 5,
        },
        {
            name: "Customer D",
            value1: 1,
        },
        {
            name: "Bodenlos langer Name, der bitte abgeschnitten werden soll",
            value1: 8,
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
            "Customer D": 2
        },
        {
            "name": "KW 22",
            "Customer A": 5.5,
            "Customer B": 4,
            "Customer C": 8,
            "Customer D": 1
        },
        {
            "name": "KW 23",
            "Customer A": 4,
            "Customer B": 6,
            "Customer C": 8,
            "Customer D": 1.5
        },
        {
            "name": "KW 24",
            "Customer A": 6,
            "Customer B": 6,
            "Customer C": 7,
            "Customer D": 1
        },
    ];

    /* ---------- */

    const customers = ["Customer A", "Customer B", "Customer C", "Customer D"]; // Will of course later just be fetched...
    const chartColors = useChartColors(customers.length);

    const DashboardContext = createContext({ customers, chartColors });

    return (
        <DashboardContext.Provider value={{ customers, chartColors }}>
            <Flex mb={2}>
                {/* LEFT SIDE */}
                <ButtonGroup size='sm' isAttached zIndex={0}>
                    <Button
                        leftIcon={<Icon as={VscFilter} />}
                        size="sm"
                    >
                        <Text fontWeight="normal">Filter</Text>
                    </Button>
                    {exampleFilters.map((f, i) => (
                        <Tooltip key={i} label={f}>
                            <Button
                                leftIcon={<Icon as={IoMdCloseCircle} color="red.500" />}
                                variant='outline'
                            >
                                <Text fontWeight="thin" fontSize='xs'>
                                    {truncateText(f, 15)}
                                </Text>
                            </Button>
                        </Tooltip>
                    ))}
                </ButtonGroup>

                <Spacer />

                {/* RIGHT SIDE */}
                <Button
                    leftIcon={<Icon as={VscEdit} />}
                    size="sm"
                >
                    <Text fontWeight="normal">Edit</Text>
                </Button>
            </Flex>

            <SimpleGrid
                columns={4}
                gap={2}
                minChildWidth="370px"
            >
                <PieChartPreview data={pieChartData} title="Relativer Umsatzanteil" />
                <BarChartPreview data={barChartData} title="Aktuelle Kundenzufriedenheit" maxVal={10} />
                <LineChartPreview data={lineChartData} title="Verlauf Kundenzufriedenheit" maxVal={10} />
                <PreviewCard title="Lorem Ipsum">Lorem Ipsum</PreviewCard>
                <PreviewCard title="Lorem Ipsum">Lorem Ipsum</PreviewCard>
                <PreviewCard title="Lorem Ipsum">Lorem Ipsum</PreviewCard>
            </SimpleGrid>
        </DashboardContext.Provider>
    );
}

export default Dashboard;