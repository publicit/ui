import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import reportWebVitals from './reportWebVitals';

// Mantine :
import { ModalsProvider } from "@mantine/modals";
import { createTheme, MantineProvider } from "@mantine/core";

// Component :
import App from './App';


// CSS :
import './styles/main.scss'


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


// read google credentials from environment
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || ""
if (!clientId) {
    throw new Error("missing clientId")
}

// display git info
const gitTag = process.env.REACT_APP_TAG_NAME
const gitCommit = process.env.REACT_APP_GIT_COMMIT

if (gitTag && gitCommit) {
    console.table({
        tag: gitTag,
        hash: gitCommit,
    })
}

const theme = createTheme({
    cursorType: 'pointer',
})


root.render(
    <GoogleOAuthProvider clientId={clientId}>
        <MantineProvider theme={theme} defaultColorScheme="dark">
            <ModalsProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ModalsProvider>
        </MantineProvider>
    </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
