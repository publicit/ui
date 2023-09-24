import * as React from "react";
import {useEffect, useState} from "react";
import {Box, ChakraProvider, theme} from "@chakra-ui/react";
import {HashRouter} from "react-router-dom";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {PrivateRoutes} from "./pages/PrivateRoutes";
import {UserStore} from "./models/sso_user";
import {NavBar} from "./components/NavBar";
import {PublicRoutes} from "./pages/PublicRoutes";

const versionInfo = {
    version: process.env.REACT_APP_TAG_NAME,
    hash: process.env.REACT_APP_GIT_COMMIT,
};
if (versionInfo.version) {
    console.table(versionInfo);
}
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;

export function App() {
    const [store, setStore] = useState<UserStore>(new UserStore());
    useEffect(() => {
        // TODO: fix the refreshing issue after login/logout
    }, []);
    return (
        <ChakraProvider theme={theme}>
            <GoogleOAuthProvider clientId={googleClientId}>
                <HashRouter>
                    <>
                        <Box p={2}>
                            <NavBar/>
                            <hr/>
                            <PublicRoutes store={store}/>
                            <PrivateRoutes store={store}/>
                        </Box>
                    </>
                </HashRouter>
            </GoogleOAuthProvider>
        </ChakraProvider>
    );
}
