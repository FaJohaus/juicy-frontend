import { Box, Text, Icon, Flex, IconButton, Stack } from "@chakra-ui/react"
import { DeleteIcon, ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons"
import { FaChartPie, FaChartBar, FaProjectDiagram } from "react-icons/fa";
import { FaTableList, FaChartLine } from "react-icons/fa6";
import { MdOutlineNumbers, MdModeEdit } from "react-icons/md";

const WidgetListItem = ({ widget, onMove, onDelete }) => {
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
                <Stack spacing={0.5} mr={5} height="100%" justify="center">
                    <IconButton
                        size="xs"
                        height={4}
                        icon={<ChevronUpIcon boxSize={5} />}
                        onClick={() => onMove(true, widget._id)}
                    />
                    <IconButton
                        size="xs"
                        height={4}
                        icon={<ChevronDownIcon boxSize={5} />}
                        onClick={() => onMove(false, widget._id)}
                    />
                </Stack>
                <Icon as={getWidgetIcon()} mr={2} />
                <Text as="b">
                    {widget.name}
                </Text>
            </Box>
            <Box>
                <IconButton
                    variant="ghost"
                    size="sm"
                    rounded={10}
                    icon={<MdModeEdit />}
                />
                <IconButton
                    variant="ghost"
                    size="sm"
                    rounded={10}
                    icon={<DeleteIcon />}
                    onClick={() => onDelete(widget._id)}
                />
            </Box>
        </Flex>
    );
};

export default WidgetListItem;