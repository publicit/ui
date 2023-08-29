// handy information in browser console, to know what we are deploying
import {BrowserRouter, Link} from "react-router-dom";
import {GoogleOAuthProvider} from "@react-oauth/google";
import PrivateRoutes from "./pages/PrivateRoutes";

const versionInfo = {
    version: process.env.REACT_APP_TAG_NAME, hash: process.env.REACT_APP_GIT_COMMIT,
};
if (versionInfo.version) {
    console.table(versionInfo);
}
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

export default () => (<GoogleOAuthProvider clientId={googleClientId}>
    <BrowserRouter>
        <>
            <Link to="/">Home</Link>
            <br/>
            <Link to="/login">Login</Link>
            <br/>
            <Link to="/logout">Logout</Link>
            <hr/>
            <div>
                ui content will go here
            </div>
            <PrivateRoutes/>
        </>
    </BrowserRouter>
</GoogleOAuthProvider>);
