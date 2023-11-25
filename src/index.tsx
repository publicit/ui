import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {GoogleOAuthProvider} from "@react-oauth/google";
import {MantineProvider} from "@mantine/core";
import {MantineThemeOverride} from "@mantine/styles/lib/theme/types";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const theme: MantineThemeOverride = {
    colorScheme: "dark",
    fontFamily: "Tahoma,Ubuntu,Georgia",
    fontSizes: {},
    globalStyles: (theme) => ({
        body: {
            ...theme.fn.fontStyles(),
            backgroundColor:
                theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
            color:
                theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
            lineHeight: theme.lineHeight,
        },
    }),
}


// read google credentials from environment
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || ""
if (!clientId) {
    throw new Error("missing clientId")
}

root.render(
    <GoogleOAuthProvider clientId={clientId}>
        <MantineProvider theme={theme}>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </MantineProvider>
    </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
