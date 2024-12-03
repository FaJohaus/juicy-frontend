import { Card, CardBody, CardFooter, Center, Divider } from "@chakra-ui/react";

const PreviewTemplate = () => {
    return (
        <Card h="330px" /* variant="outline" */>
            <CardBody>
                <Center>
                    Lorem Ipsum
                </Center>
            </CardBody>
            <Divider />
            <CardFooter>
                Insight #42
            </CardFooter>
        </Card>
    );
}

export default PreviewTemplate;