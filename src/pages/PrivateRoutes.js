import { Navigate, Route, Routes } from "react-router-dom";
import Logout from "./Logout";
import { UserStore } from "../models/sso_user";

export default () => {
  const store = new UserStore();
  return (
    <>
      <Routes>
        <Route
          exact
          path="/logout"
          element={
            store.isLoggedIn() ? <Logout /> : <Navigate replace to="/" />
          }
        />
      </Routes>
    </>
  );
};
