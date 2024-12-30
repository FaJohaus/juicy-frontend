import { Circle } from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import { Handle } from "@xyflow/react";

const CustomTimelineNode = () => {
    return (
        <Circle size={8} bgColor="gray.300">
            <PhoneIcon />
            <Handle type="source" style={{ top: '50%', zIndex: -1 }} isConnectable={false} />
            <Handle type="target" style={{ top: '50%', zIndex: -1 }} isConnectable={false} />
        </Circle>
    );
};

export default CustomTimelineNode;