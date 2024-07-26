import { Link } from 'react-router-dom';

// Mantine :
import { Button } from '@mantine/core';

type params = {
  token: string;
};

export function QuizRegisterForm({ token }: params) {
  const { href } = window.location;
  return (
    <div className="quiz-unregister-form">
      <div className="form-description">
        <h1 className="heading">
          Antes de responder la encuesta, es necesario que te registres!
        </h1>
        <div>
          Haz click en CONTINUAR para acceder a tu registro. Te tomara 5 minutos
          el proceso.
        </div>
        <div></div>
        <Button
          variant="outline"
          component={Link}
          to={`/user/profile?token=${token}&url=${href}`}
        >
          Iniciar Registro
        </Button>
      </div>
    </div>
  );
}

export function QuizUnregisteredForm({ token }: params) {
  return (
    <div className="quiz-unregister-form">
      <div className="form-description">
        <h1 className="heading">Bienvenido a Publicitux!</h1>
        <div className="description">
          <div className="thanks-message">
            Gracias por solicitar completar una encuesta
          </div>
          <div>
            Ya casi estás ahí. Haz clic en el botón de abajo para INICIAR SESIÓN
          </div>
        </div>
      </div>
    </div>
  );
}
