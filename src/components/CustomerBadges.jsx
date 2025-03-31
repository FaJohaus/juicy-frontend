import { useDashboard } from "../context/DashboardContext";
import { Tag, TagLeftIcon, Text } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";

const CustomerBadges = () => {
    const { chartColors, customers } = useDashboard();

    return (
        <>
            {customers.map((c, i) => {
                return (
                    <Tag m={1} key={i}>
                        <TagLeftIcon as={FaCircle} color={chartColors[i]} />
                        <Text color={chartColors[i]}>{c.name}</Text>
                    </Tag>
                )
            })}
            {/* <Tag m={1} >
                <TagLeftIcon as={FaCircle} color="red" />
                <Text >ALARAM SUPER LANGE NAME!!</Text>
            </Tag>
            <Tag m={1} >
                <TagLeftIcon as={FaCircle} color="red" />
                <Text >ALARAM SUPER LANGE NAME!!</Text>
            </Tag>
            <Tag m={1} >
                <TagLeftIcon as={FaCircle} color="red" />
                <Text >ALARAM SUPER LANGE NAME!!</Text>
            </Tag>
            <Tag m={1} >
                <TagLeftIcon as={FaCircle} color="red" />
                <Text >ALARAM SUPER LANGE NAME!!</Text>
            </Tag>
            <Tag m={1} >
                <TagLeftIcon as={FaCircle} color="red" />
                <Text >ALARAM SUPER LANGE NAME!!</Text>
            </Tag>
            <Tag m={1} >
                <TagLeftIcon as={FaCircle} color="red" />
                <Text >ALARAM SUPER LANGE NAME!!</Text>
            </Tag>
            <Tag m={1} >
                <TagLeftIcon as={FaCircle} color="red" />
                <Text >ALARAM SUPER LANGE NAME!!</Text>
            </Tag>
            <Tag m={1} >
                <TagLeftIcon as={FaCircle} color="red" />
                <Text >ALARAM SUPER LANGE NAME!!</Text>
            </Tag>
            <Tag m={1} >
                <TagLeftIcon as={FaCircle} color="red" />
                <Text >ALARAM SUPER LANGE NAME!!</Text>
            </Tag>
            <Tag m={1} >
                <TagLeftIcon as={FaCircle} color="red" />
                <Text >ALARAM SUPER LANGE NAME!!</Text>
            </Tag>
            <Tag m={1} >
                <TagLeftIcon as={FaCircle} color="red" />
                <Text >ALARAM SUPER LANGE NAME!!</Text>
            </Tag> */}
        </>
    );
};

export default CustomerBadges;