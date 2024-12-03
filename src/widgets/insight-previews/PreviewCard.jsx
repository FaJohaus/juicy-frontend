import { Card, CardBody, CardFooter, Center, Divider, Text } from "@chakra-ui/react";

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
            <CardFooter>
                <Text>{title}</Text>
            </CardFooter>
        </Card>
    );
}

export default PreviewCard;