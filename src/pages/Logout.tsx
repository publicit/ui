import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { UserStore } from "../models/sso_user";
import { useEffect } from "react";

export default function () {
  console.log(`from Logout.tsx`)
  const navigate = useNavigate();
  const logout = () => {
    googleLogout();
    const timer = setTimeout(() => {
      const store = new UserStore();
      store.remove();
      navigate("/");
    }, 1000);
    return () => clearTimeout(timer);
  };
  useEffect(() => {
    logout();
  }, []);

  return (
    <div>
      <p>Logging you out now...</p>
    </div>
  );
}
