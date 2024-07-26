import React from 'react';
import { useParams } from 'react-router-dom';

// Components :
import {
  QuizNoProfileNeededForm,
  QuizUnregisteredForm,
} from '../components/UserQuizRegisterForm';
import { loadUserProfile } from '../helpers/sso_service';

function ShareStart() {
  const token = useParams().token || '';
  const user = loadUserProfile();
  const isLoggedIn = !!user;

  return (
    <>
      {isLoggedIn ? (
        <QuizNoProfileNeededForm token={token} />
      ) : (
        <QuizUnregisteredForm token={token} />
      )}
    </>
  );
}

export default ShareStart;
