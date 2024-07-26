import { Link, useNavigate } from 'react-router-dom';

// Mantine :
import { Button, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { QuizRegisterInvitation } from '../helpers/api';
import { notifyErrResponse } from './Errors';

type params = {
  token: string;
};

export function QuizRegisterForm({ token }: params) {
  const { href } = window.location;
  return (
    <div className="quiz-unregister-form">
      <div className="form-description">
        <h1 className="heading">
          Antes de responder la encuesta, es necesario que te registres.
        </h1>
        <div>
          Haz click en INICIAR REGISTRO para completar este paso. Te tomara 5
          minutos el proceso.
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

export function QuizNoProfileNeededForm({ token }: params) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function loadData(id: string) {
      try {
        if (!token) throw Error('missing token');
        //  call the server api to validate the token
        await QuizRegisterInvitation(token || '');
        // if all goes well, redirect to the user's quiz page
        navigate(`/user/quizs`);
      } catch (err) {
        await notifyErrResponse(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData(token);
  }, []);

  return (
    <div className="quiz-unregister-form">
      <div className="form-description">
        <h1 className="heading">Estamos procesando la invitacion.</h1>
        <div>Por favor espera un momento.</div>
        {isLoading && <Loader color="blue" size="md" />}
      </div>
    </div>
  );
}
