import React from "react";
import { useNavigate } from "react-router-dom";

// Mantine :
import { Button, Progress, Table, Text } from "@mantine/core";

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
        <Table highlightOnHover withTableBorder className="table-container">
            <Table.Thead>
                <Table.Tr> </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {questions.map((q: UserQuestion) => {
                    return (
                        <Table.Tr key={q.id}>
                            <Table.Td>
                                {q.question.body}
                            </Table.Td>
                            <Table.Td>
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
}

export default function QuizSummary({ userQuiz, userQuestions, onRetry }: params) {
    const navigate = useNavigate()
    return (
        <React.Fragment>
            <Text className="quiz-name">{userQuiz.quiz.name}</Text>
            <Progress mt="lg" value={userQuiz.percent_completed * 100} />

            {userQuiz.percent_completed === 1
                ?
                <>
                    <Text className="question-title">Preguntas</Text>
                    <UserQuestionSummaryView questions={userQuestions} />
                </>
                :
                <Button size="md" type="button"
                    variant="outline" className="reply-button"
                    onClick={() => navigate(`/user/quizs/${userQuiz.id}`)}
                >
                    Responder
                </Button>
            }

            {userQuiz.status === UserQuizStatus[UserQuizStatus.success] &&
                <Text color="green" mt="sm">
                    Felicidades, has respondido correctamente todas las preguntas!
                </Text>
            }
            {userQuiz.status === UserQuizStatus[UserQuizStatus.failed] &&
                <>
                    <Text className="try-again-text">
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
        </React.Fragment>
    )
}