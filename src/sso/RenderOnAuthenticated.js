import SSOService from "./SSOService";

const RenderOnAuthenticated = ({ children }) =>
  SSOService.isLoggedIn() ? children : null;

export default RenderOnAuthenticated;
