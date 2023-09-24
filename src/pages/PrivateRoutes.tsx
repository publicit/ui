import {Route, Routes} from "react-router-dom";
import Logout from "./Logout";
import {UserStore} from "../models/sso_user";
import {Questionnaires} from "../hooks/Questionnaires";

interface PrivateRoutesParams {
    store: UserStore
}

export function PrivateRoutes({store}: PrivateRoutesParams) {
    return (
        <Routes>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/questionnaires" element={<Questionnaires/>}/>
        </Routes>
    );
};
