import { Navigate, Route, Routes } from "react-router-dom";
import Root from "./Root";
import Login from "./Login";
import Logout from "./Logout";
import { UserStore } from "../models/sso_user";

export default () => {
  const store = new UserStore();
  return (
    <>
      <Routes>
        <Route
          exact
          path="/login"
          element={
            !store.isLoggedIn() ? <Login /> : <Navigate replace to="/" />
          }
        />
        <Route exact path="/logout" element={<Logout />} />
        <Route path="*" element={<Root />} />
      </Routes>
    </>
  );
};
