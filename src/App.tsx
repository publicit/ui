import {useEffect, useState} from 'react'
import './App.css';
import {TokenResponse, useGoogleLogin} from '@react-oauth/google';
import {logout, parseToken, saveUserProfile} from "./helpers/sso_service"

type UserProfile = {
    picture: string
    name: string
    email: string
}

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
    return (
        <div>
            <h2>React Google Login</h2>
            {profile ? (
                <div>
                    <img src={profile.picture} alt={profile.name}/>
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google</button>
            )}
        </div>
    );
}

export default App;
