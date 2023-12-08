import {useNavigate, useParams} from "react-router-dom";
import {ChangeEventHandler, useEffect, useState} from "react";
import {notifyErrResponse} from "../components/Errors";
import {Answer} from "../models/answer";
import {UserQuizNextQuestion} from "../helpers/api";
import {UserQuiz} from "../models/user_quiz";
import {UserNextQuestion, UserQuestion} from "../models/user_question";
import {UserAnswer} from "../models/user_answer";
import {Button, Checkbox, Group, Progress, Radio, Text} from "@mantine/core";
import {QuestionType} from "../models/question";

export default function UserQuizFillForm() {
    const navigate = useNavigate()
    const userQuestionId = useParams().id || ""
    const [userQuestion, setUserQuestion] = useState<UserQuestion>(new UserQuestion())
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
    const [userQuiz, setUserQuiz] = useState<UserQuiz>(new UserQuiz())
    useEffect(() => {
        async function loadData(id: string) {
            try {
                const userQuiz = new UserQuiz()
                userQuiz.id = userQuestionId
                const data: UserNextQuestion = await UserQuizNextQuestion(userQuiz)
                setUserAnswers(data.user_answers)
                setUserQuestion(data.user_question)
                setUserQuiz(data.user_quiz)
            } catch (err) {
                await notifyErrResponse(err)
            }
        }

        loadData(userQuestionId)

    }, []);

    async function onSubmit(data: Answer) {
        try {
            navigate("/");
        } catch (err) {
            await notifyErrResponse(err)
        }
    }

    function setAnswer(a: UserAnswer) {
        console.info(`set a:${a.answer.body}`)
    }

    return (
        <div>
            <Progress value={userQuiz.percent_completed * 100}/>
            <Text style={{
                fontSize: "2em",
            }}>
                {userQuestion.question.body}
            </Text>
            <hr/>
            <br/>
            {userQuestion.question.type === QuestionType[QuestionType.multiple]
                ?
                <Radio.Group>
                    {userAnswers.map((a: UserAnswer) => (
                        <>
                            <Radio key={a.answer.id} value={a.answer.id} label={a.answer.body}/>
                            <br/>
                        </>
                    ))}
                </Radio.Group>
                :
                <>
                    {userAnswers.map((a: UserAnswer) => (
                        <>
                            <Checkbox key={a.answer.id}
                                      value={a.answer.id}
                                      label={a.answer.body}

                            />
                            <br/>
                        </>
                    ))}
                </>
            }
            <Group>
                <Button type="button" variant="outline">
                    Siguiente
                </Button>
            </Group>
        </div>
    )
}
