import React from 'react';
import ReactPlayer from 'react-player';
import { IconRefresh } from '@tabler/icons-react';

// Mantine :
import { Button, Flex, Group, Table, Text } from '@mantine/core';

// Components :
import { ShareDialogBody } from './ShareDialog';
import { ShowDialog } from './UserQuizShareDialog';

// Models :
import { UserQuestion } from '../models/user_question';
import { UserQuiz, UserQuizStatus } from '../models/user_quiz';

// Helpers :
import { setIconFromAnswer } from '../helpers/user_quiz_utils';
import { ShowGenericDialog } from './UserQuizShareEmailDialog';

type UserQuestionSummaryViewParams = {
  questions: UserQuestion[];
};

function UserQuestionSummaryView({ questions }: UserQuestionSummaryViewParams) {
  return (
    <Table highlightOnHover withTableBorder className="table-container" mt="lg">
      <Table.Thead>
        <Table.Tr></Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {questions.map((q: UserQuestion) => {
          return (
            <Table.Tr key={q.id} className="table-row-container">
              <Table.Td>{q.question.body}</Table.Td>
              <Table.Td className="content-center">
                {setIconFromAnswer(q.has_correct_answer)}
              </Table.Td>
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
  );
}

type params = {
  userQuiz: UserQuiz;
  userQuestions: UserQuestion[];
  onRetry: any;
  sharedUrl: string;
  shareQuiz: any;
  setSharedUrl: any;
  loadData: () => {};
  emailShareDialog: React.ReactElement;
};

export function QuizSummary({
  onRetry,
  userQuiz,
  loadData,
  sharedUrl,
  shareQuiz,
  setSharedUrl,
  userQuestions,
  emailShareDialog,
}: params) {
  return (
    <React.Fragment>
      <div className="form-wrapper">
        <Flex direction="column">
          {userQuiz.quiz.thumbnail_url && (
            <ReactPlayer controls width="100%" url={userQuiz.quiz.video_url} />
          )}
          {userQuiz.percent_completed === 1 && (
            <UserQuestionSummaryView questions={userQuestions} />
          )}
        </Flex>
        {userQuiz.status === UserQuizStatus[UserQuizStatus.success] && (
          <React.Fragment>
            <Text color="green" mt="md">
              Felicidades, has respondido correctamente todas las preguntas!
            </Text>
            <Group>
              <ShowDialog
                children={ShareDialogBody({
                  sharedUrl,
                  onClick: () => {},
                  text: 'Se ha copiado la direccion de la invitacion',
                })}
                onClose={() => setSharedUrl('')}
                onOpen={shareQuiz}
              />
            </Group>
          </React.Fragment>
        )}
        {userQuiz.status === UserQuizStatus[UserQuizStatus.failed] && (
          <React.Fragment>
            <Text mt="md">
              No has respondido correctamente todas las preguntas. Haz click en
              INTENTAR DE NUEVO para otra oportunidad.
            </Text>
            <Button
              size="md"
              type="button"
              variant="outline"
              className="try-again-button"
              onClick={() => onRetry()}
            >
              Intentar de Nuevo
              <IconRefresh className="icon" />
            </Button>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}
