import { Circle, Text, Box } from "@chakra-ui/react";
import { Handle, Position, NodeToolbar } from "@xyflow/react";
import { Icon } from "@chakra-ui/icons";
import { FaDollarSign, FaHandshake } from "react-icons/fa";
import { RiArrowGoBackFill, RiMailFill, RiPhoneFill } from "react-icons/ri";

/* TBD: 
    - Modal with more Event Details if clicked on (Disable this on preview or give small Tooltip on hover instead?)
*/
const CustomTimelineNode = ({ variant, data: { hasNext, hasPrev, hasSub, hasMain, date, label } }) => {
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
            <NodeToolbar isVisible offset={-7}>
                <Box backgroundColor="whiteAlpha.800" rounded={10}>
                    {/* <Text fontSize="sm" as="b">{label}</Text> */}
                    <Text fontSize="sm" textAlign="right" width="105%">{date.replace("-", "/").replace("-", "/")}</Text>
                </Box>
            </NodeToolbar >
            <Circle size={7} bgColor="gray.900">
                <Circle size={6} bgColor="gray.300">
                    <Icon as={icon()} />
                    {hasSub ?
                        <Handle
                            type="source"
                            position={Position.Bottom}
                            id="bottom"
                            isConnectable={false}
                        /> : <></>
                    }
                    {hasNext ?
                        <Handle
                            type="source"
                            position={Position.Right}
                            id="right"
                            isConnectable={false}
                        /> : <></>
                    }
                    {(hasPrev || hasMain) ?
                        <Handle
                            type="target"
                            position={Position.Left}
                            id="left"
                            isConnectable={false}
                        /> : <></>
                    }
                </Circle>
            </Circle>
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