import { Flex, Spacer, Avatar, Button, Center, IconButton, Text, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Box } from "@chakra-ui/react";
import { ChevronDownIcon, BellIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import pageTitles from '../assets/pageTitles.json'
import Sidebar from "./Sidebar";
import LogoutModal from "./LogoutModal";
import { getDashboard } from "../actions/dashboards";

const Navbar = ({ children }) => {
    const NAVBAR_HEIGHT = "55px";

    const navigate = useNavigate();
    const location = useLocation();

    const [pageTitle, setPageTitle] = useState("");
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        const title = pageTitles[location.pathname.split("/")[1]];

        setPageTitle(title);

        if (title === "Dashboard") {
            const getTitle = async () => {
                try {
                    const { name } = await getDashboard(location.pathname.split("/")[2]);

                    setPageTitle(`Dashboard: ${name}`);
                } catch (e) {
                    console.error("Could not get dashboard title: ", e)
                };
            }

            getTitle();
        }
    }, [location.pathname]);

    return (
        <>
            <LogoutModal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)} />
            <Flex>
                <div style={{ flexShrink: 0 }}>
                    <Sidebar />
                </div>
                <div style={{ width: "100%" }}>
                    <Flex
                        h={NAVBAR_HEIGHT}
                        borderWidth='1px'
                        position="sticky"
                        top={0}
                        backgroundColor="white"
                        zIndex={10}
                    >
                        {/* LEFT SIDE */}
                        <Center>
                            <Text fontSize='xl' ml={2} pt={1}>
                                {pageTitle}
                            </Text>
                        </Center>
                        <Spacer />
                        {/* RIGHT SIDE */}
                        <Center>
                            <IconButton icon={<BellIcon boxSize={5} />} variant='ghost' rounded={100} />
                            <Menu gutter={7}>
                                <MenuButton
                                    as={Button}
                                    rightIcon={<ChevronDownIcon />}
                                    variant='ghost'
                                    w={20}
                                    rounded={100}
                                >
                                    <Avatar
                                        src="https://i.pinimg.com/736x/ca/78/3f/ca783fbe94d559e23dc9b7dcc4065a42.jpg"
                                        boxSize={7}
                                    />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>
                                        Account
                                    </MenuItem>
                                    <MenuItem onClick={() => navigate('/settings')}>
                                        Settings
                                    </MenuItem>
                                    <MenuDivider />
                                    <MenuItem textColor="red" onClick={() => setShowLogoutModal(true)}>
                                        Log out
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Center>
                    </Flex>
                    <Box p={2} bgColor="gray.50" minHeight={`calc(100vh - ${NAVBAR_HEIGHT})`}>
                        {children}
                    </Box>
                </div>
            </Flex>
        </>
    );
}

export default Navbar;