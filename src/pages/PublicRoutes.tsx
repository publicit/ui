import {Route, Routes} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import {UserStore} from "../models/sso_user";

interface PublicRoutesParams {
    store: UserStore
}


export function PublicRoutes({store}: PublicRoutesParams) {
    console.log(`from publicRoutes: ${store.isLoggedIn()}`)
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<Home/>}/>
        </Routes>
    );
};
