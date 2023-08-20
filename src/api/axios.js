import axios from "axios";
import SSOService from "../sso/SSOService";
import text from "../helpers/text";

const baseURL = process.env.REACT_APP_BASE_API_URL;

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use((config) => {
  if (SSOService.isLoggedIn()) {
    const cb = () => {
      // remove leading/trailing spaces from each string field
      const { data } = config;
      if (data) {
        config.data = text.trimAll(data);
      }
      config.headers.Authorization = `Bearer ${SSOService.getToken()}`;
      return Promise.resolve(config);
    };
    return SSOService.updateToken(cb);
  }
});

export default instance;
