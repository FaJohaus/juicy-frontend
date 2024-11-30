import { Box, IconButton, Flex, Icon, Button, Text, Center } from "@chakra-ui/react";
import { HamburgerIcon, SettingsIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { FaHome, FaChartBar } from "react-icons/fa";
import { PiOrangeSlice } from "react-icons/pi";
import pageTitles from '../assets/pageTitles.json'
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);
    const [logoColor, setLogoColor] = useState();

    /* This is very important business logic, please don't touch it */
    useEffect(() => {
        if (!collapsed) {
            const colors = ["orange", "yellow", "lime"].filter(i => i !== logoColor);

            setLogoColor(Math.floor(Math.random() * 2) === 0 ? colors[0] : colors[1]);
        };
    }, [collapsed]);


    const items = [
        {
            title: pageTitles[""],
            link: "/",
            icon: FaHome
        },
        {
            title: pageTitles["insights"],
            link: "/insights",
            icon: FaChartBar
        },
        {
            title: pageTitles["automation"],
            link: "/automation",
            icon: SettingsIcon
        }
    ]

    return (
        <Box
            width={collapsed ? "55px" : "230px"}
            minHeight="100vh"
            backgroundColor="gray.900"
        >
            <Flex direction="column">
                <Center
                    height="55px"
                >
                    <Center height="55px" width="55px" position="absolute" left={0} >
                        <IconButton
                            onClick={() => setCollapsed(!collapsed)}
                            icon={<HamburgerIcon boxSize={5} color="white" />}
                            variant='ghost'
                            colorScheme="whiteAlpha"
                        />
                    </Center>
                    {!collapsed ?
                        /* What a beautiful company logo, did we hire a fucking designer for that? */
                        <Flex direction="row" width="100px">
                            <Icon as={PiOrangeSlice} boxSize={10} color={`${logoColor}.400`} />
                            <Center>
                                <Text
                                    color={`${logoColor}.200`}
                                    fontSize='2xl'
                                    paddingLeft={1}
                                    marginTop={1}
                                    fontFamily="cursive"
                                >
                                    Juicy
                                </Text>
                            </Center>
                        </Flex> : <></>
                    }
                </Center>
                {
                    items.map(i => (
                        <Button
                            key={i.title}
                            variant='ghost'
                            onClick={() => navigate(i.link)}
                            colorScheme="whiteAlpha"
                            align="left"
                            justifyContent="flex-start"
                        >
                            <Icon
                                as={i.icon}
                                boxSize={5}
                                color="white"
                            />
                            {!collapsed ?
                                <Text
                                    color="white"
                                    fontSize='md'
                                    marginTop={1}
                                    paddingLeft={1}
                                >
                                    {i.title}
                                </Text> : <></>
                            }
                        </Button>
                    ))
                }
            </Flex>
        </Box >
    );
};

export default Sidebar;