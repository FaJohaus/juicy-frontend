import { SimpleGrid, Flex, Spacer, Button, Icon, Text, ButtonGroup, Tooltip, useTheme } from "@chakra-ui/react";
import { VscFilter, VscEdit } from "react-icons/vsc";
import PreviewCard from "../widgets/insight-previews/PreviewCard";
import PieChartPreview from "../widgets/insight-previews/PieChartPreview";
import { IoMdCloseCircle } from "react-icons/io";
import BarChartPreview from "../widgets/insight-previews/BarChartPreview";
import { truncateText } from "../utils";
import LineChartPreview from "../widgets/insight-previews/LineChartPreview";
import { DashboardContextProvider } from "../context/DashboardContext";
import TimeLinePreview from "../widgets/insight-previews/TimeLinePreview";

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
            "name": "KW 23",
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
        { "_id": "1", "subevent": "1.1", "nextevent": "2", "previousevent": null, "type": "mail", "date": "01.01.2023" },
        { "_id": "1.1", "subevent": null, "nextevent": null, "previousevent": null, "type": "call", "date": "05.01.2023" },
        { "_id": "2", "subevent": "2.1", "nextevent": "3", "previousevent": "1", "type": "retour", "date": "15.01.2023" },
        { "_id": "2.1", "subevent": "2.1.1", "nextevent": null, "previousevent": null, "type": "visit", "date": "28.01.2023" },
        { "_id": "2.1.1", "subevent": "2.1.1.1", "nextevent": null, "previousevent": null, "type": "mail", "date": "10.02.2023" },
        { "_id": "2.1.1.1", "subevent": null, "nextevent": null, "previousevent": null, "type": "call", "date": "25.02.2023" },
        { "_id": "3", "subevent": null, "nextevent": "4", "previousevent": "2", "type": "purchase", "date": "10.03.2023" },
        { "_id": "4", "subevent": "4.1", "nextevent": null, "previousevent": "3", "type": "retour", "date": "25.03.2023" },
        { "_id": "4.1", "subevent": "4.1.1", "nextevent": null, "previousevent": null, "type": "visit", "date": "15.04.2023" },
        { "_id": "4.1.1", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "05.05.2023" },
        { "_id": "5", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.2023" },

        /* { "_id": "6", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.2023" },
        { "_id": "7", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.2023" },
        { "_id": "8", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.2023" },
        { "_id": "9", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.2023" },
        { "_id": "51", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.2023" },
        { "_id": "52", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.2023" },
        { "_id": "53", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.2023" },
        { "_id": "54", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.2023" }, */
    ];



    /* ---------- */
    const { widget } = useTheme();

    const customers = ["Customer A", "Customer B", "Customer C", "Customer D", "Customer E"]; // Will of course later just be fetched...

    return (
        <DashboardContextProvider customers={customers}>
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
                gap={2}
                minChildWidth={widget.baseMinWidth}
            >
                <PieChartPreview data={pieChartData} title="Relativer Umsatzanteil" />
                <BarChartPreview data={barChartData} title="Aktuelle Kundenzufriedenheit" maxVal={10} />
                <LineChartPreview data={lineChartData} title="Verlauf Kundenzufriedenheit" maxVal={10} />
                <TimeLinePreview data={timelineData} title="Timeline alle Events" />

                {/* <PreviewCard title="Lorem Ipsum" doubleWidth doubleHeight>
                    Chunky Lorem Ipsum
                </PreviewCard>
                <PreviewCard title="Lorem Ipsum" doubleHeight>
                    Double height Lorem Ipsum
                </PreviewCard> */}
            </SimpleGrid>
        </DashboardContextProvider>
    );
}

export default Dashboard;