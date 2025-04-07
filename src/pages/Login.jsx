import { useEffect, useState } from 'react';
import { Box, Link, Stack, Card, Button, Center, FormControl, FormLabel, Input, Heading, FormErrorMessage } from '@chakra-ui/react';
import JuciyLogo from '../widgets/JuciyLogo';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Login = () => {
    const navigate = useNavigate();
    const { login, user } = useUser();

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [error, setError] = useState(false);

    const onLogin = async (e) => {
        e.preventDefault();

        try {
            await login(email, pwd);
        } catch (e) {
            setError(true)
        }
    }

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
                <form onSubmit={onLogin}>
                    <FormControl isInvalid={error} isRequired>
                        <Stack spacing={5}>
                            <Box>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type='email'
                                />
                            </Box>
                            <Box>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    value={pwd}
                                    onChange={(e) => setPwd(e.target.value)}
                                    type='password'
                                />
                                <FormErrorMessage>Invalid email address or password</FormErrorMessage>
                            </Box>
                            <Button
                                colorScheme='orange'
                                type='submit'
                            >
                                Login
                            </Button>
                            <Link color="blue.700" onClick={() => navigate("/signup")}>
                                Not so juicy customer satisfaction?
                                <br />
                                Elevate your customer journeys - start here!
                            </Link>
                        </Stack>
                    </FormControl>
                </form>
            </Card>
        </Center>
    )
}

export default Login;