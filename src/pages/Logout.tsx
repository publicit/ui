import {googleLogout} from "@react-oauth/google";
import {useNavigate} from "react-router-dom";

export default function () {
    const navigate = useNavigate()
    const logout = () => {
        googleLogout()
        const timer = setTimeout(() => navigate("/"), 1000)
        return () => clearTimeout(timer)
    }
    logout()
    return (
        <div>
            <p>Logging you out now...</p>
        </div>
    )
}