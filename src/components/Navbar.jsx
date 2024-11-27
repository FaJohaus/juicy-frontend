import { Flex, Spacer, Avatar, Button, Center, IconButton, Text } from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon, BellIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import pageTitles from '../assets/pageTitles.json'

const Navbar = ({ children }) => {
    const location = useLocation();

    const [pageTitle, setPageTitle] = useState("");

    useEffect(() => {
        setPageTitle(pageTitles[location.pathname.substring(1)]); /* TBD: Just write a custom hook for this shit */
    }, [location.pathname]);

    return (
        <>
            <Flex h='55px' borderWidth='1px'>
                {/* LEFT SIDE */}
                <Center>
                    <IconButton ml={2} icon={<HamburgerIcon boxSize={5} />} variant='ghost' rounded={100} />
                    <Text fontSize='xl' ml={2} pt={1}>
                        {pageTitle}
                    </Text>
                </Center>
                <Spacer />
                {/* RIGHT SIDE */}
                <Center>
                    <IconButton icon={<BellIcon boxSize={5} />} variant='ghost' rounded={100} />
                    <IconButton icon={<SearchIcon boxSize={4} />} variant='ghost' rounded={100} />
                    <Button
                        rightIcon={<ChevronDownIcon />}
                        variant='ghost'
                        onClick={() => alert("Gotcha!")}
                        w={20}
                        rounded={100}
                    >
                        <Avatar
                            src="https://i.pinimg.com/736x/ca/78/3f/ca783fbe94d559e23dc9b7dcc4065a42.jpg"
                            boxSize={7}
                        />
                    </Button>
                </Center>
            </Flex>
            {children}
        </>
    );
}

export default Navbar;