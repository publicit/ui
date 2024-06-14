import React from 'react';
import { useParams } from 'react-router-dom';

// Components :
import {
  QuizRegisterForm,
  QuizUnregisteredForm,
} from '../components/UserQuizRegisterForm';
import { loadUserProfile } from '../helpers/sso_service';

function ShareStart() {
  const token = useParams().token || '';
  const user = loadUserProfile();
  const isLoggedIn = !!user;

  return (
    <React.Fragment>
      {isLoggedIn ? (
        <QuizRegisterForm token={token} />
      ) : (
        <QuizUnregisteredForm token={token} />
      )}
    </React.Fragment>
  );
}

export default ShareStart;
