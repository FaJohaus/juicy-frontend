import { Circle } from "@chakra-ui/react";
import { Handle } from "@xyflow/react";
import { Icon } from "@chakra-ui/icons";
import { FaDollarSign, FaHandshake } from "react-icons/fa";
import { RiArrowGoBackFill, RiMailFill, RiPhoneFill } from "react-icons/ri";

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
        <Circle size={8} bgColor="gray.700">
            <Circle size={7} bgColor="gray.300">
                <Icon as={icon()} />
                <Handle type="source" style={{ top: '50%', zIndex: -1 }} isConnectable={false} />
                <Handle type="target" style={{ top: '50%', zIndex: -1 }} isConnectable={false} />
            </Circle>
        </Circle>
    );
};


/* Not proud of this */
const MailNode = ({ data }) => <CustomTimelineNode variant="mail" data={data} />;
const CallNode = ({ data }) => <CustomTimelineNode variant="call" data={data} />;
const PurchaseNode = ({ data }) => <CustomTimelineNode variant="purchase" data={data} />;
const RetourNode = ({ data }) => <CustomTimelineNode variant="retour" data={data} />;
const VisitNode = ({ data }) => <CustomTimelineNode variant="visit" data={data} />;

export { MailNode, CallNode, PurchaseNode, RetourNode, VisitNode };