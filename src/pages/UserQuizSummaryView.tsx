import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {notifyErrResponse} from "../components/Errors";
import {UserQuiz} from "../models/user_quiz";
import {Button, Group, Progress, Table, Text} from "@mantine/core";
import {GetUserQuizSummary} from "../helpers/api";
import {UserQuestion} from "../models/user_question";
import {MoodHappy, MoodSick} from "tabler-icons-react";

type UserQuestionSummaryViewParams = {
    questions: UserQuestion[]
}

function UserQuestionSummaryView({questions}: UserQuestionSummaryViewParams) {
    function setIcon(value: boolean | null) {
        if (value === null) {
            return <></>
        }
        return value ? <MoodHappy style={{color: "green"}}/> : <MoodSick style={{color: "red"}}/>
    }

    return (
        <Table striped={true} withRowBorders={true}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th></Table.Th>
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
                                {setIcon(q.has_correct_answer)}
                            </Table.Td>
                        </Table.Tr>
                    )
                })}
            </Table.Tbody>
        </Table>
    )
}

export default function UserQuizSummaryView() {
    const navigate = useNavigate()
    const userQuizId = useParams().user_quiz_id || ""
    const [userQuiz, setUserQuiz] = useState<UserQuiz>(new UserQuiz())
    const [userQuestions, setUserQuestions] = useState<UserQuestion[]>([])

    async function loadData(id: string) {
        try {
            const res = await GetUserQuizSummary(userQuizId)
            setUserQuiz(res.user_quiz)
            setUserQuestions(res.user_questions)
        } catch (err) {
            await notifyErrResponse(err)
        }
    }

    useEffect(() => {
        loadData(userQuizId)
    }, []);


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
                            onClick={() => navigate(`/user/quizs/${userQuizId}`)}
                    >
                        Responder
                    </Button>
                </Group>
            }
            <br/>
            {userQuiz.percent_completed !== 1 &&
                <Group>
                    <Button type="button" variant="outline"
                            onClick={() => navigate(`/user/quizs/${userQuizId}`)}
                    >
                        Responder Encuesta
                    </Button>
                </Group>
            }
            {userQuiz.status === "success" &&
            <Text>Felicidades, has respondido correctamente todas las preguntas!</Text>
            }
            {userQuiz.status === "failed" &&
            <Text>
                No has respondido correctamente todas las preguntas
            </Text>
            }
        </div>
    )
}
