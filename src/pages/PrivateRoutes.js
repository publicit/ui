import {Route, Routes} from "react-router-dom";
import Root from "./Root";
import Login from "./Login";
import Logout from "./Logout";

export default () => (
    <>
        <Routes>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/logout" element={<Logout/>}/>
            <Route path="*" element={<Root/>}/>
        </Routes>
    </>
);
