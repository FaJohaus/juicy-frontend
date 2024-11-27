import { Flex, Spacer, Avatar, Button, Center, IconButton } from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon, BellIcon } from "@chakra-ui/icons";
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
            <Flex h='55px'>
                {/* LEFT SIDE */}
                {pageTitle}
                <Spacer />
                {/* RIGHT SIDE */}
                <Center>
                    <IconButton icon={<BellIcon boxSize={6} />} variant='ghost' />
                </Center>
                <Center>
                    <IconButton icon={<SearchIcon />} variant='ghost' />
                </Center>
                <Center>
                    <Button
                        rightIcon={<ChevronDownIcon />}
                        variant='ghost'
                        onClick={() => alert("Gotcha!")}
                        w={20}
                    >
                        <Avatar
                            src="https://i.pinimg.com/736x/ca/78/3f/ca783fbe94d559e23dc9b7dcc4065a42.jpg"
                            boxSize={8}
                        />
                    </Button>
                </Center>
            </Flex>
            {children}
        </>
    );
}

export default Navbar;