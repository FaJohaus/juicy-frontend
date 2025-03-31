import { Box, Text, Icon, Flex, IconButton } from "@chakra-ui/react"
import { ArrowUpDownIcon, DeleteIcon } from "@chakra-ui/icons"
import { FaChartPie, FaChartBar, FaProjectDiagram } from "react-icons/fa";
import { FaTableList, FaChartLine } from "react-icons/fa6";
import { MdOutlineNumbers, MdModeEdit } from "react-icons/md";

const WidgetListItem = ({ widget }) => {
    const getWidgetIcon = () => {
        switch (widget.diagramType) {
            case "bar":
                return FaChartBar;
            case "pie":
                return FaChartPie;
            case "graph":
                return FaChartLine;
            case "timeline":
                return FaProjectDiagram;
            case "table":
                return FaTableList;
            case "big number":
                return MdOutlineNumbers;
            default:
                return null;
        }
    }

    return (
        <Flex
            my={1}
            backgroundColor="gray.100"
            borderRadius="md"
            height={9}
            display="flex"
            alignItems="center"
            justify="space-between"
            px={2}
        >
            <Box alignItems="center" display="flex">
                <ArrowUpDownIcon mr={5} />
                <Icon as={getWidgetIcon()} mr={2} />
                <Text as="b">
                    {widget.name}
                </Text>
                {": (short description of data here)"}
            </Box>
            <Box>
                <IconButton variant="ghost" size="sm" rounded={50} icon={<MdModeEdit />} />
                <IconButton variant="ghost" size="sm" rounded={50} icon={<DeleteIcon />} />
            </Box>
        </Flex>
    );
};

export default WidgetListItem;