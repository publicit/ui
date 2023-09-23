import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
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
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
};
