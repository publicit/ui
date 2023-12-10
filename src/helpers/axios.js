import axios from "axios";
import {isLoggedIn, loadUserProfile} from "./sso_service"

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
});

instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    if (error.response.status === 401) {
        window.alert(`Tu sesion ha expirado`)
        window.location.href = "/"
    }
    return Promise.reject(error);
});

export default instance;
