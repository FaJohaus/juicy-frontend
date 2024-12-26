import { SimpleGrid, Flex, Spacer, Button, Icon, Text, ButtonGroup, Tooltip } from "@chakra-ui/react";
import { VscFilter, VscEdit } from "react-icons/vsc";
import PreviewCard from "../widgets/insight-previews/PreviewCard";
import PieChartPreview from "../widgets/insight-previews/PieChartPreview";
import { IoMdCloseCircle } from "react-icons/io";
import BarChartPreview from "../widgets/insight-previews/BarChartPreview";
import { truncateText } from "../utils";
import LineChartPreview from "../widgets/insight-previews/LineChartPreview";

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

    /* ---------- */

    return (
        <>
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

            {/* TBD: Give all components the same colors for each customer */}
            <SimpleGrid
                columns={4}
                gap={2}
                minChildWidth="370px"
            >
                <PieChartPreview data={pieChartData} title="Relativer Umsatzanteil" />
                <BarChartPreview maxVal={10} data={barChartData} title="Aktuelle Kundenzufriedenheit" />
                <LineChartPreview title="Verlauf Kundenzufriedenheit" maxVal={10} />
                <PreviewCard title="Lorem Ipsum">Lorem Ipsum</PreviewCard>
                <PreviewCard title="Lorem Ipsum">Lorem Ipsum</PreviewCard>
                <PreviewCard title="Lorem Ipsum">Lorem Ipsum</PreviewCard>
            </SimpleGrid>
        </>
    );
}

export default Dashboard;