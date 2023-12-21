import React, {useEffect, useState} from 'react'
import {TokenResponse, useGoogleLogin} from '@react-oauth/google';
import {logout, parseToken, saveUserProfile} from "./helpers/sso_service"
import '@mantine/core/styles/global.css';
import "@mantine/core/styles.css"
import '@mantine/dates/styles.css';
import {AppShell, Burger, Group} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import Logo from "./components/Logo";
import Navbar from "./components/Navbar";
import RouteSwitcher from "./RouteSwitcher"
import {UserProfile} from "./models/user";


function App() {
    // user contains the access token information, and expiration
    const [user, setUser] = useState<TokenResponse>();
    // profile contains the parsed information after we verify the access token with Google endpoint
    const [profile, setProfile] = useState<UserProfile>();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse)
            saveUserProfile(codeResponse)
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            parseToken()
                .then(p => setProfile(p))
                .catch(() => {
                });
        },
        [user]
    );

    const logOut = () => {
        logout()
        setProfile(undefined);
    };

    function CollapseDesktop() {
        const [mobileOpened] = useDisclosure();
        const [desktopOpened, {toggle: toggleDesktop}] = useDisclosure(true);
        const [opened] = useDisclosure()
        const user = {
            email: profile?.email,
            name: profile?.name,
            image: profile?.picture,
            last_login: new Date(),
        }
        const version = process.env.REACT_APP_TAG_NAME || ""


        return (
            <>
                <AppShell
                    padding="md"
                    header={{height: 60}}
                    navbar={{
                        width: 200,
                        breakpoint: 'sm',
                        collapsed: {mobile: !mobileOpened, desktop: !desktopOpened},
                    }}
                >
                    <AppShell.Header>
                        <Group>
                            <Burger opened={opened} onClick={toggleDesktop} aria-label="Toggle navigation"/>
                            <div>
                                <Logo/>
                            </div>
                        </Group>
                    </AppShell.Header>
                    <AppShell.Navbar>
                        <Navbar user={user} version={version} login={login} logout={logOut}/>
                    </AppShell.Navbar>
                    <AppShell.Main>
                        <RouteSwitcher profile={profile}/>
                    </AppShell.Main>
                </AppShell>
            </>
        );
    }


    return (
        <>
            <CollapseDesktop/>
        </>
    );
}

export default App;
