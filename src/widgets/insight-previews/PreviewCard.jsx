import { Card, CardBody, CardFooter, Center, Divider, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const PreviewCard = ({ children, title }) => {
    return (
        <Card
            h="330px"
            variant="outline"
            style={{ boxShadow: "1px 1px 1px lightgray" }}
        >
            <CardBody>
                <Center>
                    {children}
                </Center>
            </CardBody>
            <Divider />
            <CardFooter height="45px">
                <Center>
                    <Text>{title}</Text>
                    <ExternalLinkIcon />
                </Center>
            </CardFooter>
        </Card>
    );
}

export default PreviewCard;