import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { UserStore } from "../models/sso_user";
import { useEffect } from "react";

export default function () {
  const navigate = useNavigate();
  const logout = () => {
    googleLogout();
    const timer = setTimeout(() => {
      const store = new UserStore();
      store.remove();
    }, 100);
    return () => clearTimeout(timer);
  };
  useEffect(() => {
    logout();
    navigate("/");
  }, []);

  return (
    <div>
      <p>Logging you out now...</p>
    </div>
  );
}
