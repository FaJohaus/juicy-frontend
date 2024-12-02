import { Box, IconButton, Flex, Icon, Button, Text, Center } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { FaHome, FaChartBar } from "react-icons/fa";
import { VscServerProcess } from "react-icons/vsc";
import pageTitles from '../assets/pageTitles.json'
import { useNavigate } from "react-router-dom";
import JuciyLogo from "../widgets/JuciyLogo";

const Sidebar = () => {
    const logoColors = ["orange", "yellow", "lime"];
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);
    const [logoColor, setLogoColor] = useState(logoColors[Math.floor(Math.random() * 3)]);

    /* This is very important business logic, please don't touch it */
    useEffect(() => {
        if (!collapsed) setLogoColor(logoColors.filter(i => i !== logoColor)[Math.floor(Math.random() * 2)]);
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
            icon: VscServerProcess
        }
    ]

    return (
        <Box
            width={collapsed ? "55px" : "230px"}
            minHeight="100vh"
            height="100%"
            backgroundColor="gray.900"
        >
            <Flex direction="column" position="sticky" top={0}>
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
                    {!collapsed ? <JuciyLogo color={logoColor} /> : <></>}
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
                                    fontWeight="normal"
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