import React from "react";
import {NavLink} from "react-router-dom";
import {Box, Button, Flex, Spacer} from "@chakra-ui/react";


export function NavBar() {
    return (
        <>
            <Flex alignItems="center" gap={2}>
                <Box fontSize="20px">
                    <NavLink to="/">PublicitUX</NavLink>
                </Box>
                <NavLink to="/questionnaires">Encuestas</NavLink>
                <Spacer/>
                <Button>
                    <NavLink to="/login">Login</NavLink>
                </Button>
                <Button>
                    <NavLink to="/logout">Logout</NavLink>
                </Button>
            </Flex>
        </>
    )
}
