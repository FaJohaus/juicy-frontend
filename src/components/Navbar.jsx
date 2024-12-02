import { Flex, Spacer, Avatar, Button, Center, IconButton, Text, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Box } from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon, BellIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import pageTitles from '../assets/pageTitles.json'
import Sidebar from "./Sidebar";

/* TBD: 
    1. Fix Navbar not taking full width if page doesn't 
    2. Sidebar ending if content becomes scrollable    
*/
const Navbar = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [pageTitle, setPageTitle] = useState("");

    useEffect(() => {
        setPageTitle(pageTitles[location.pathname.substring(1)]); /* TBD: Just write a custom hook for this shit */
    }, [location.pathname]);

    return (
        <Flex>
            <div style={{ flexShrink: 0 }}>
                <Sidebar />
            </div>
            <div>
                <Flex
                    h='55px'
                    borderWidth='1px'
                    position="sticky" top={0}
                    backgroundColor="white"
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
                        <IconButton icon={<SearchIcon boxSize={4} />} variant='ghost' rounded={100} />
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
                                <MenuItem textColor="red">
                                    Log out
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Center>
                </Flex>
                <Box p={2}>
                    {children}
                </Box>
            </div>
        </Flex>
    );
}

export default Navbar;