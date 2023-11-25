import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {GoogleOAuthProvider} from "@react-oauth/google";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

// read google credentials from environment
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || ""
if (!clientId) {
    throw new Error("missing clientId")
}

root.render(
    <GoogleOAuthProvider clientId={clientId}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
