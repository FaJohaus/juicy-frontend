import { Box } from "@chakra-ui/react";

const Sidebar = ({ collapsed }) => {
    return (
        <>
            {collapsed ?
                <Box
                    position="sticky"
                    width={200}
                    minHeight="100vh"
                    backgroundColor="red"
                /> :
                <Box
                    position="sticky"
                    width={2000}
                    minHeight="100vh"
                    backgroundColor="red"
                />
            }
        </>
    );
};

export default Sidebar;