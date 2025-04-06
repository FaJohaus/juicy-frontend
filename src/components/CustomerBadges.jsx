import { useDashboard } from "../context/DashboardContext";
import { Box, Tag, TagLeftIcon, Text, Tooltip } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";
import { truncateText } from "../utils";

const CustomerBadges = () => {
    const { chartColors, dashboardCustomers } = useDashboard();

    return (
        <Box width="100%">
            {dashboardCustomers.map((c, i) => {
                return (
                    <Tooltip key={i} label={c.name}>
                        <Tag m={1}>
                            <TagLeftIcon as={FaCircle} color={chartColors[i]} />
                            <Text color={chartColors[i]}>{truncateText(c.name, 10)}</Text>
                        </Tag>
                    </Tooltip>
                )
            })}
        </Box>
    );
};

export default CustomerBadges;