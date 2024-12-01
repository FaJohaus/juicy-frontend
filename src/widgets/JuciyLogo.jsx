import { Flex, Icon, Text, Center } from "@chakra-ui/react";
import { PiOrangeSlice } from "react-icons/pi";

/* TBD: Just make an svg out of this */

const JuciyLogo = ({ color }) => {
    return (
        /* What a beautiful company logo, did we hire a fucking designer for that? */
        <Flex direction="row" width="100px">
            <Icon as={PiOrangeSlice} boxSize={10} color={`${color}.400`} />
            <Center>
                <Text
                    color={`${color}.200`}
                    fontSize='2xl'
                    paddingLeft={1}
                    marginTop={1}
                    fontFamily="cursive"
                >
                    Juicy
                </Text>
            </Center>
        </Flex>
    );
}

export default JuciyLogo;