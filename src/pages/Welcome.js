import SSOService from "../sso/SSOService";
import { Button } from "@mantine/core";

const Welcome = () => (
  <div className="pure-g">
    <div className="pure-u">
      <h1>Bienvenido a Buro Profesional</h1>
      <p className="lead">Por favor, inicia sesion con tu usuario.</p>
      <p>
        <Button variant="outline" onClick={() => SSOService.doLogin()}>
          Iniciar Sesion
        </Button>
      </p>
    </div>
  </div>
);

export default Welcome;
