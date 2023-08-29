import {GoogleLogin} from "@react-oauth/google";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {parseJWTToken} from "../helpers/jwt_parser";

export default function () {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    return (
        <div>
            {email ? `Welcome ${email}` : "Hi, this is the login page"}

            <GoogleLogin
                onSuccess={credentialResponse => {
                    const jwtToken = parseJWTToken(credentialResponse.credential)
                    console.log(JSON.stringify(jwtToken, null, '  '))
                    setEmail(jwtToken.email)
                    setTimeout(() => navigate("/"), 1000)
                }}
                onError={() => console.log("login failed")}
            />
        </div>
    )
}