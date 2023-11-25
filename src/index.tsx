import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {GoogleOAuthProvider} from "@react-oauth/google";
import {createTheme, MantineProvider} from "@mantine/core";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


// read google credentials from environment
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || ""
if (!clientId) {
    throw new Error("missing clientId")
}


const theme = createTheme({
    //  override as needed
})

root.render(
    <GoogleOAuthProvider clientId={clientId}>
        <MantineProvider theme={theme} defaultColorScheme="dark">
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
