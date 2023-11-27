import React, {useEffect, useState} from 'react'
import {TokenResponse, useGoogleLogin} from '@react-oauth/google';
import {logout, parseToken, saveUserProfile} from "./helpers/sso_service"
import "@mantine/core/styles.css"
import {AppShell, Burger, Button, Group} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import Logo from "./components/Logo";
import RouteDefinitions from "./RouteDefinitions";
import {RouterProvider} from "react-router-dom";
import Navbar from "./components/Navbar";

type UserProfile = {
    picture: string
    name: string
    email: string
}

const router = RouteDefinitions()

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
                        <Navbar />
                    </AppShell.Navbar>
                    <AppShell.Main>
                        <GoogleSection/>
                        <RouterProvider router={router}/>
                    </AppShell.Main>
                </AppShell>
            </>
        );
    }

    function GoogleSection() {
        return (
            <div>
                <br/>
                {profile ? (
                    <div>
                        <img src={profile.picture} alt={profile.name}/>
                        <h3>User Logged in</h3>
                        <p>Name: {profile.name}</p>
                        <p>Email Address: {profile.email}</p>
                        <Button variant="outline" onClick={logOut}>Log out</Button>
                    </div>
                ) : (
                    <Button variant="outline" onClick={() => login()}>Sign in with Google</Button>
                )}
                <p>Just a dummy text to make sure nothing overlaps the footer</p>
            </div>
        )
    }

    return (
        <>
            <CollapseDesktop/>
        </>
    );
}

export default App;
