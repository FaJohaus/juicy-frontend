import React, { useState } from "react";
import {
    Card,
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading,
    Text,
    VStack,
    Link,
    Center
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import JuciyLogo from "../widgets/JuciyLogo";
import { createUser } from "../actions/user";

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createUser({
                "Email": formData.email,
                "First": formData.firstName,
                "Last": formData.lastName,
                "Password": formData.password,
                "Phone": "09090909S",
                "Language": "Deutsch"
            })
        } catch (e) {
            console.error("Error creating user: ", e);
        }

        /* navigate("/login"); */
    };

    return (
        <Center
            bgColor="gray.200"
            height="100vh"
            width="100vw"
        >
            <Card
                width={600}
                height={650}
                p={20}
            >
                <JuciyLogo />
                <Heading as="h2" size="lg" /* textAlign="center" */ mb={6}>
                    Sign Up
                </Heading>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <FormControl id="firstName" isRequired>
                            <FormLabel>First Name</FormLabel>
                            <Input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl id="lastName" isRequired>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <Button type="submit" colorScheme="orange" width="full">
                            Sign Up
                        </Button>
                    </VStack>
                </form>
                <Text mt={4} textAlign="center">
                    Already have an account?{" "}
                    <Link color="blue.500" onClick={() => navigate("/login")}>
                        Log in
                    </Link>
                </Text>
            </Card>
        </Center>
    );
};

export default Signup;