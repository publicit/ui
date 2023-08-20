import SSOService from "./SSOService";

const RenderOnAnonymous = ({ children }) =>
  !SSOService.isLoggedIn() ? children : null;

export default RenderOnAnonymous;
