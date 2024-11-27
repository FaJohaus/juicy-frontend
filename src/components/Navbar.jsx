import { Flex, Box, Spacer } from "@chakra-ui/react";
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
            <Flex>
                {pageTitle}
                <Spacer />
                <Box w='40px' h='40px' bg='yellow.200'>
                    Icon 1
                </Box>
                <Box w='40px' h='40px' bg='tomato'>
                    Icon 2
                </Box>
                <Box w='40px' h='40px' bg='pink.100'>
                    Icon 3
                </Box>
            </Flex>
            {children}
        </>
    );
}

export default Navbar;