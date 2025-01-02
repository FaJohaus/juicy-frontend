import { Circle, Text } from "@chakra-ui/react";
import { Handle, Position } from "@xyflow/react";
import { Icon } from "@chakra-ui/icons";
import { FaDollarSign, FaHandshake } from "react-icons/fa";
import { RiArrowGoBackFill, RiMailFill, RiPhoneFill } from "react-icons/ri";

/* TBD: 
    1. Add Title and Date above Node. 
    2. Modal with more Event Details if clicked on (Disable this on preview or give small Tooltip on hover instead?)
*/
const CustomTimelineNode = ({ variant, data }) => {
    const icon = () => {
        switch (variant) {
            case "mail":
                return RiMailFill;
            case "call":
                return RiPhoneFill;
            case "purchase":
                return FaDollarSign;
            case "retour":
                return RiArrowGoBackFill;
            case "visit":
                return FaHandshake;
            default:
                return null;
        }
    }

    return (
        <>
            {/* <Text fontSize="xs">{variant}</Text> */}
            <Circle size={8} bgColor="gray.700">
                <Circle size={7} bgColor="gray.300">
                    <Icon as={icon()} />
                    <Handle
                        type="source"
                        position={Position.Bottom}
                        id="bottom"
                        isConnectable={true}
                        style={{ zIndex: -1 }}
                    />
                    <Handle
                        type="target"
                        position={Position.Top}
                        id="top"
                        isConnectable={true}
                        style={{ zIndex: -1 }}
                    />
                    <Handle
                        type="source"
                        position={Position.Right}
                        id="right"
                        isConnectable={true}
                        style={{ zIndex: -1 }}
                    />
                    <Handle
                        type="target"
                        position={Position.Left}
                        id="left"
                        isConnectable={true}
                        style={{ zIndex: -1 }}
                    />
                </Circle>
            </Circle>
            {/* <Text fontSize="xs">{data.label}</Text> */}
        </>
    );
};


/* Not proud of this */
const MailNode = ({ data }) => <CustomTimelineNode variant="mail" data={data} />;
const CallNode = ({ data }) => <CustomTimelineNode variant="call" data={data} />;
const PurchaseNode = ({ data }) => <CustomTimelineNode variant="purchase" data={data} />;
const RetourNode = ({ data }) => <CustomTimelineNode variant="retour" data={data} />;
const VisitNode = ({ data }) => <CustomTimelineNode variant="visit" data={data} />;

export { MailNode, CallNode, PurchaseNode, RetourNode, VisitNode };