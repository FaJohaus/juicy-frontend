import { SimpleGrid, Flex, Spacer, Button, Icon, Text, ButtonGroup, Tooltip } from "@chakra-ui/react";
import { VscFilter, VscEdit } from "react-icons/vsc";
import PreviewCard from "../widgets/insight-previews/PreviewCard";
import PieChartPreview from "../widgets/insight-previews/PieChartPreview";
import { IoMdCloseCircle } from "react-icons/io";

const Dashboard = () => {
    /* ------ EXAMPLE DATA ----- */
    const exampleFilters = ["This Month", "Company A, Company C", "E-Mail, Phone Calls"];

    const pieChartData = [
        { name: 'Customer A', value: 400 },
        { name: 'Customer B', value: 300 },
        { name: 'Customer C', value: 300 },
        { name: 'Customer D', value: 200 },
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
                                    {`${f.substring(0, 12)} ${f.length >= 12 ? '...' : ''}`} {/* TBD: Maybe Custom Hook for this? Might be useful in other places */}
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
                minChildWidth="360px"
            >
                <PieChartPreview data={pieChartData} title="Pie Chart" />
                <PreviewCard title="Lorem Ipsum">Lorem Ipsum</PreviewCard>
                <PreviewCard title="Lorem Ipsum">Lorem Ipsum</PreviewCard>
                <PreviewCard title="Lorem Ipsum">Lorem Ipsum</PreviewCard>
                <PreviewCard title="Lorem Ipsum">Lorem Ipsum</PreviewCard>
                <PreviewCard title="Lorem Ipsum">Lorem Ipsum</PreviewCard>
                <PreviewCard title="Lorem Ipsum">Lorem Ipsum</PreviewCard>
                <PreviewCard title="Lorem Ipsum">Lorem Ipsum</PreviewCard>
            </SimpleGrid>
        </>
    );
}

export default Dashboard;