import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';

// Mantine :
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger, Group } from "@mantine/core";

// Components :
import Logo from "./components/Logo";
import Navbar from "./components/Navbar";
import RouteSwitcher from "./RouteSwitcher"

// Helpers :
import { parseToken, saveUserProfile } from "./helpers/sso_service"

// Models :
import { User, UserProfileResponse } from "./models/user";

// CSS :
import '@mantine/core/styles/global.css';
import "@mantine/core/styles.css"
import '@mantine/dates/styles.css';


function App() {
    const navigate = useNavigate();
    // user contains the access token information, and expiration
    const [user, setUser] = useState<TokenResponse>();
    // profile contains the parsed information after we verify the access token with Google endpoint
    const [profile, setProfile] = useState<UserProfileResponse>();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse)
            saveUserProfile(codeResponse)
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        parseToken()
            .then(p => setProfile(p))
            .catch(() => {
            });
    }, [user]);

    const logOut = () => {
        setProfile(undefined);
        localStorage.clear()
        navigate('/');
    };

    function CollapseDesktop() {
        const [mobileOpened] = useDisclosure();
        const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
        const [opened] = useDisclosure()
        const user = new User()
        user.email = profile?.email
        user.name = profile?.name
        user.image = profile?.picture
        const version = process.env.REACT_APP_TAG_NAME || ""

        return (
            <AppShell
                padding="md"
                header={{ height: 60 }}
                navbar={{
                    width: 250,
                    breakpoint: 'sm',
                    collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
                }}>
                <AppShell.Header className='flex-verticle-center'>
                    <Group pl="sm">
                        <Burger opened={opened} onClick={toggleDesktop} aria-label="Toggle navigation" />
                        <Logo />
                    </Group>
                </AppShell.Header>
                <AppShell.Navbar>
                    <Navbar profile={profile} version={version} login={login} logout={logOut} />
                </AppShell.Navbar>
                <AppShell.Main>
                    <RouteSwitcher profile={profile} />
                </AppShell.Main>
            </AppShell>
        );
    }

    return (
        <>
            <CollapseDesktop />
        </>
    );
}

export default App;
