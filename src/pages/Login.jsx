import { Box, Link, Stack, Card, Button, Center, FormControl, FormLabel, Input, Heading, FormErrorMessage } from '@chakra-ui/react';
import JuciyLogo from '../widgets/JuciyLogo';

const Login = () => {
    return (
        <Center
            bgColor="gray.200"
            height="100vh"
            width="100vw"
        >
            <Card
                width={600}
                height={500}
                p={20}
            >
                <JuciyLogo />
                <Heading>Login</Heading>
                <FormControl /* isInvalid */>
                    <Stack spacing={5}>
                        <Box>
                            <FormLabel>Email address</FormLabel>
                            <Input type='email' />
                        </Box>
                        <Box>
                            <FormLabel>Password</FormLabel>
                            <Input type='password' />
                            <FormErrorMessage>Invalid email address or password</FormErrorMessage>
                        </Box>
                        <Button
                            colorScheme='orange'
                            type='submit'
                        >
                            Login
                        </Button>
                        <Link color="blue.700">
                            Not so juicy customer satisfaction?
                            <br />
                            Elevate your customer journeys - start here!
                        </Link>
                    </Stack>
                </FormControl>
            </Card>
        </Center>
    )
}

export default Login;