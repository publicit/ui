import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { SSOUserFromJWTToken, UserStore } from "../models/sso_user";

export default function () {
  const navigate = useNavigate();
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const user = SSOUserFromJWTToken(credentialResponse.credential);
          const store = new UserStore();
          store.save(user);
          setTimeout(() => navigate("/"), 100);
        }}
        onError={() => console.log("login failed")}
      />
    </div>
  );
}
