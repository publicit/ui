import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {notifyErrResponse} from "../components/Errors";
import {UserQuestionSendAnswers, UserQuizNextQuestion} from "../helpers/api";
import {UserQuiz} from "../models/user_quiz";
import {UserNextQuestion, UserQuestion} from "../models/user_question";
import {UserAnswer} from "../models/user_answer";
import {Button, Checkbox, CheckIcon, Group, Progress, Radio, Text} from "@mantine/core";
import {QuestionType} from "../models/question";

export default function UserQuizFillForm() {
    const navigate = useNavigate()
    const returnUrl = "/user/quizs"
    const userQuestionId = useParams().id || ""
    const [userQuestion, setUserQuestion] = useState<UserQuestion>(new UserQuestion())
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
    const [userQuiz, setUserQuiz] = useState<UserQuiz>(new UserQuiz())
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
    const [selectedAnswer, setSelectedAnswer] = useState<string>("")

    function setData(data: UserNextQuestion) {
        if (!data.user_question || !data.user_answers) {
            navigate(returnUrl)
            return
        }
        setUserAnswers(data.user_answers)
        setUserQuestion(data.user_question)
        setUserQuiz(data.user_quiz)
    }

    async function loadData(id: string) {
        try {
            const userQuiz = new UserQuiz()
            userQuiz.id = userQuestionId
            const data: UserNextQuestion = await UserQuizNextQuestion(userQuiz)
            setData(data)
        } catch (err) {
            await notifyErrResponse(err)
        }
    }

    useEffect(() => {
        loadData(userQuestionId)

    }, []);


    async function onSubmit() {
        const answers = [
            selectedAnswer,
            ...[...selectedAnswers],
        ]
        try {
            const data = await UserQuestionSendAnswers({
                questionId: userQuestion.question.id,
                quizId: userQuiz.quiz.id,
                answers: answers.filter(x => x.length !== 0),
            })
            setData(data)
        } catch (err) {
            await notifyErrResponse(err)
        }
    }

    function selectMultiAnswer(e: any) {
        const id = e.target.value
        let s = [...selectedAnswers]
        if (selectedAnswers.find(x => x === id)) {
            s = s.filter(x => x !== id)
        } else {
            s.push(id)
        }
        setSelectedAnswers(s)
    }

    function isSubmitEnabled(): boolean {
        if (userQuestion.question.type === QuestionType[QuestionType.single]) {
            return !!selectedAnswer
        }
        return selectedAnswers.length !== 0
    }

    return (
        <div>
            <Progress value={userQuiz.percent_completed * 100}/>
            <br/>
            <Text style={{
                fontSize: "2em",
            }}>
                {userQuestion.question.body}
            </Text>
            <br/>
            <hr/>
            <br/>
            {userQuestion.question.type === QuestionType[QuestionType.single]
                ?
                <Radio.Group>
                    {userAnswers.map((a: UserAnswer) => (
                        <>
                            <Radio key={a.answer.id}
                                   value={a.answer.id}
                                   variant="outline"
                                   icon={CheckIcon}
                                   label={a.answer.body}
                                   onClick={e => setSelectedAnswer(e.currentTarget.value)}
                            />
                            <br/>
                        </>
                    ))}
                </Radio.Group>
                :
                <>
                    {userAnswers.map((a: UserAnswer) => (
                        <>
                            <Checkbox key={a.answer.id}
                                      variant="outline"
                                      value={a.answer.id}
                                      label={a.answer.body}
                                      onClick={e => selectMultiAnswer(e)}
                            />
                            <br/>
                        </>
                    ))}
                </>
            }
            <br/>
            <Group>
                <Button type="button" variant="outline"
                        onClick={() => onSubmit()}
                        disabled={!isSubmitEnabled()}
                >
                    Siguiente
                </Button>
            </Group>
        </div>
    )
}
