import { Box, Text, Icon, Flex, IconButton, Stack, Menu, MenuButton } from "@chakra-ui/react"
import { DeleteIcon, ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons"
import { MdModeEdit } from "react-icons/md";
import { getWidgetIcon } from "../utils/widgets";
import CreateWidgetMenu from "./CreateWidgetMenu";

const WidgetListItem = ({ widget, onMove, onDelete }) => {

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
                <Icon as={getWidgetIcon(widget)} mr={2} />
                <Text as="b">
                    {widget.view.name}
                </Text>
            </Box>
            <Box>
                <Menu closeOnSelect={false} placement="right">
                    <MenuButton
                        as={IconButton}
                        variant="ghost"
                        size="sm"
                        rounded={100}
                        icon={<MdModeEdit />}
                    />
                    <CreateWidgetMenu widget={widget} />
                </Menu>
                <IconButton
                    variant="ghost"
                    size="sm"
                    rounded={100}
                    icon={<DeleteIcon />}
                    onClick={() => onDelete(widget._id)}
                />
            </Box>
        </Flex>
    );
};

export default WidgetListItem;