import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, loadUserProfile } from "./sso_service"

const baseURL = process.env.REACT_APP_BASE_API_URL;

const instance = axios.create({
    baseURL,
});

instance.interceptors.request.use((config) => {
    if (isLoggedIn()) {
        const profile = loadUserProfile()
        config.headers.Authorization = `Bearer ${profile.access_token}`;
        return Promise.resolve(config);
    }
    return Promise.resolve(config);
});

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    const status = error?.response?.status;
    const navigate = useNavigate();
    switch (status) {
        case 401:
            navigate('/errors/unauthenticated')
            break;
        case 403:
            navigate('/errors/unauthorized')
            break;
        default:
            if (status >= 400) {
                return Promise.reject(error);
            }
    }
});

export default instance;
