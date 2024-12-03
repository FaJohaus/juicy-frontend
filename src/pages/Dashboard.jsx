import { SimpleGrid, Flex, Spacer, Button, Icon, Text, ButtonGroup, Tooltip } from "@chakra-ui/react";
import { VscFilter, VscEdit } from "react-icons/vsc";
import PreviewTemplate from "../widgets/insight-previews/PreviewTemplate";
import { IoMdCloseCircle } from "react-icons/io";

const Dashboard = () => {
    const exampleFilters = ["This Month", "Company A, Company C", "E-Mail, Phone Calls"];

    return (
        <>
            <Flex mb={2}>
                {/* LEFT SIDE */}
                <ButtonGroup size='sm' isAttached>
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
                                    {`${f.substring(0, 12)} ${f.length >= 12 ? '...' : ''}`}
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
                <PreviewTemplate />
                <PreviewTemplate />
                <PreviewTemplate />
                <PreviewTemplate />
                <PreviewTemplate />
                <PreviewTemplate />
            </SimpleGrid>
        </>
    );
}

export default Dashboard;