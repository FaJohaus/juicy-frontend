import { Card, CardBody, CardFooter, Center, Divider, Text, Flex, IconButton, useTheme } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const PreviewCard = ({ children, title, doubleWidth = false, doubleHeight = false, additionalFooter }) => {
    const { widget } = useTheme();
    const height = widget.baseHeight * (doubleHeight ? 2 : 1);

    return (
        <Card
            h={height}
            variant="outline"
            style={{ boxShadow: "1px 1px 1px lightgray" }}
            gridColumn={doubleWidth ? "span 2" : undefined}
            minWidth={widget.baseMinWidth}
        >
            <CardBody maxHeight={height - 55}>
                <Center>
                    {children}
                </Center>
            </CardBody>
            <Divider />
            <CardFooter height={50}>
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    w="100%"
                >
                    <Text>{title}</Text>
                    {additionalFooter ? additionalFooter() : <></>}
                    <IconButton
                        icon={<ExternalLinkIcon />}
                        variant='ghost'
                        size="sm"
                        rounded={4}
                        onClick={() => alert("Bald kommt hier eine Insight")}
                    />
                </Flex>
            </CardFooter>
        </Card >
    );
}

export default PreviewCard;