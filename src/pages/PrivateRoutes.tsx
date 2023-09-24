import {Route, Routes} from "react-router-dom";
import Logout from "./Logout";
import {UserStore} from "../models/sso_user";

interface PrivateRoutesParams {
    store: UserStore
}

export function PrivateRoutes({store}: PrivateRoutesParams) {
    return (
        <Routes>
            <Route path="/logout" element={<Logout/>}/>
        </Routes>
    );
};
