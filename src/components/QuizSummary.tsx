import {Button, Group, Progress, Table, Text} from "@mantine/core";
import {UserQuiz, UserQuizStatus} from "../models/user_quiz";
import {UserQuestion} from "../models/user_question";
import {useNavigate} from "react-router-dom";
import {setIconFromAnswer} from "../helpers/user_quiz_utils";

type UserQuestionSummaryViewParams = {
    questions: UserQuestion[]
}

function UserQuestionSummaryView({questions}: UserQuestionSummaryViewParams) {
    return (
        <Table striped={true} withRowBorders={true}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th></Table.Th>
                    <Table.Th></Table.Th>
                </Table.Tr>
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

export default function QuizSummary({userQuiz, userQuestions, onRetry}: params) {
    const navigate = useNavigate()
    return (
        <div>
            <Progress value={userQuiz.percent_completed * 100}/>
            <br/>
            <Text style={{
                fontSize: "2em",
            }}>
                {userQuiz.quiz.name}
            </Text>
            <br/>
            <hr/>
            <br/>
            {userQuiz.percent_completed === 1
                ?
                <Group>
                    <>
                        <Text style={{fontSize: "1.2em"}}>Preguntas</Text>
                        <UserQuestionSummaryView questions={userQuestions}/>
                    </>
                </Group>
                :
                <Group>
                    <Button type="button" variant="outline"
                            onClick={() => navigate(`/user/quizs/${userQuiz.id}`)}
                    >
                        Responder
                    </Button>
                </Group>
            }
            <br/>
            {userQuiz.status === UserQuizStatus[UserQuizStatus.success] &&
                <>
                    <Text>
                        Felicidades, has respondido correctamente todas las preguntas!
                    </Text>
                </>
            }
            {userQuiz.status === UserQuizStatus[UserQuizStatus.failed] &&
                <>
                    <hr/>
                    <Text>
                        No has respondido correctamente todas las preguntas. Haz click en INTENTAR DE NUEVO para otra
                        oportunidad.
                    </Text>
                    <br/>
                    <Button type="button" variant="outline"
                            onClick={() => onRetry()}
                    >
                        Intentar de Nuevo
                    </Button>
                </>
            }
        </div>
    )
}