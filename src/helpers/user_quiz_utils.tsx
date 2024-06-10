import { RxCross1 } from 'react-icons/rx';
import {
  Check,
  MoodBoy,
  MoodCrazyHappy,
  MoodHappy,
  MoodSick,
} from 'tabler-icons-react';

import { UserQuizStatus } from '../models/user_quiz';

export function resolveUserQuizStatusIcon(status: string): any {
  switch (status) {
    case UserQuizStatus[UserQuizStatus.success]:
      return <MoodCrazyHappy style={{ color: 'green' }} />;
    case UserQuizStatus[UserQuizStatus.failed]:
      return <MoodSick style={{ color: 'red' }} />;
    case UserQuizStatus[UserQuizStatus.pending]:
      return <MoodBoy style={{ color: 'yellow' }} />;
    case UserQuizStatus[UserQuizStatus.started]:
      return <MoodHappy style={{ color: 'orange' }} />;
    default:
      return null;
  }
}

export function resolveUserQuizStatus(status: string): string {
  switch (status) {
    case UserQuizStatus[UserQuizStatus.success]:
      return 'Completado';
    case UserQuizStatus[UserQuizStatus.failed]:
      return 'Incorrecto';
    case UserQuizStatus[UserQuizStatus.pending]:
      return 'Pendiente';
    case UserQuizStatus[UserQuizStatus.started]:
      return 'En Proceso';
    default:
      return '';
  }
}

export function setIconFromAnswer(value: boolean | null) {
  if (value === null) {
    return <></>;
  }
  return value ? (
    <Check style={{ color: 'green' }} />
  ) : (
    <RxCross1 style={{ color: 'red', fontSize: '18px' }} />
  );
}

// extractCurrentLocation returns the base url for the current location.
// if port is 80, is omitted.
function extractCurrentLocation(): string {
  const loc = window.location;
  if (!loc) return '';
  const { protocol, hostname, port } = loc;
  const p = port === '' ? '' : `:${port}`;
  return `${protocol}://${hostname}${p}`;
}

type quizTokenShareParams = {
  token: string;
};

export function quizTokenShareUrl({ token }: quizTokenShareParams): string {
  return `${extractCurrentLocation()}/invitation/${token}`;
}
