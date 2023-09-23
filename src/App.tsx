import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { HashRouter, Link } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PrivateRoutes from "./pages/PrivateRoutes";
import { UserStore } from "./models/sso_user";

const versionInfo = {
  version: process.env.REACT_APP_TAG_NAME,
  hash: process.env.REACT_APP_GIT_COMMIT,
};
if (versionInfo.version) {
  console.table(versionInfo);
}
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;

export function App() {
  const store = new UserStore();
  return (
    <ChakraProvider theme={theme}>
      <GoogleOAuthProvider clientId={googleClientId}>
        <HashRouter>
          <>
            <Link to="/">Home</Link>
            {!store.isLoggedIn() && (
              <>
                <br />
                <Link to="/login">Login</Link>
              </>
            )}
            {store.isLoggedIn() && (
              <>
                <br />
                <Link to="/logout">Logout</Link>
              </>
            )}
            <hr />
            <div>ui content will go here</div>
            <PrivateRoutes />
          </>
        </HashRouter>
      </GoogleOAuthProvider>
    </ChakraProvider>
  );
}
