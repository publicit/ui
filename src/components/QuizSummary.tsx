import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Mantine :
import { Button, Table, Text } from "@mantine/core";

// Components :
import { ShareDialogBody } from "./ShareDialog";
import { ShowDialog } from "./UserQuizShareDialog";

// Models :
import { UserQuestion } from "../models/user_question";
import { UserQuiz, UserQuizStatus } from "../models/user_quiz";

// Helpers :
import { setIconFromAnswer } from "../helpers/user_quiz_utils";


type UserQuestionSummaryViewParams = {
    questions: UserQuestion[]
}

function UserQuestionSummaryView({ questions }: UserQuestionSummaryViewParams) {
    return (
        <Table highlightOnHover withTableBorder className="table-container" mt="md">
            <Table.Thead>
                <Table.Tr></Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {questions.map((q: UserQuestion) => {
                    return (
                        <Table.Tr key={q.id} className="table-row-container">
                            <Table.Td>
                                {q.question.body}
                            </Table.Td>
                            <Table.Td className="content-center">
                                {setIconFromAnswer(q.has_correct_answer)}
                            </Table.Td>
                        </Table.Tr>
                    )
                })}
            </Table.Tbody>
        </Table>
    )
}

type params = {
    userQuiz: UserQuiz
    userQuestions: UserQuestion[]
    onRetry: any
    sharedUrl: string
    shareQuiz: any
    setSharedUrl: any
}

export default function QuizSummary({
    onRetry,
    userQuiz,
    sharedUrl,
    shareQuiz,
    setSharedUrl,
    userQuestions,
}: params) {
    const navigate = useNavigate()
    return (
        <React.Fragment>
            <h1>Preguntas</h1>
            <div className="form-wrapper">

                {userQuiz.quiz.thumbnail_url &&
                    <Link to={userQuiz.quiz.video_url}>
                        <img
                            src={userQuiz.quiz.thumbnail_url}
                            alt="logo" className="quiz-summary-img"
                        />
                    </Link>
                }
                {userQuiz.percent_completed === 1
                    ?
                    <UserQuestionSummaryView questions={userQuestions} />
                    :
                    <Button size="md" type="button"
                        variant="outline" className="reply-button"
                        onClick={() => navigate(`/user/quizs/${userQuiz.id}`)}
                    >
                        Responder
                    </Button>
                }

                {userQuiz.status === UserQuizStatus[UserQuizStatus.success] &&
                    <>
                        <Text color="green" mt="md">
                            Felicidades, has respondido correctamente todas las preguntas!
                        </Text>
                        <ShowDialog
                            children={ShareDialogBody({
                                sharedUrl,
                                onClick: () => {
                                },
                                text: "Se ha copiado la direccion de la invitacion",
                            })}
                            onClose={() => setSharedUrl("")} onOpen={shareQuiz} />
                    </>
                }

                {userQuiz.status === UserQuizStatus[UserQuizStatus.failed] &&
                    <>
                        <Text mt="md">
                            No has respondido correctamente todas las preguntas. Haz click en INTENTAR DE NUEVO para otra
                            oportunidad.
                        </Text>
                        <Button size="md" type="button"
                            variant="outline" className="try-again-button"
                            onClick={() => onRetry()}
                        >
                            Intentar de Nuevo
                        </Button>
                    </>
                }
            </div>
        </React.Fragment>
    )
}