import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Mantine :
import { Progress, Stepper, } from "@mantine/core";

// Components :
import PreLoader from "../components/PreLoader";
import UserQuizForm from "../components/UserQuizForm";
import VideoPlayer from "../components/VideoPlayer";
import { notifyErrResponse } from "../components/Errors";
import UserQuizSummary from "../components/UserQuizsummary";

// Helpers :
import { UserQuestionSendAnswers, UserQuizNextQuestion } from "../helpers/api";

// Models:
import { UserQuiz } from "../models/user_quiz";
import { QuestionType } from "../models/question";
import { UserAnswer } from "../models/user_answer";
import { UserNextQuestion, UserQuestion } from "../models/user_question";


export default function UserQuizFillForm() {
    const userQuestionId = useParams().id || ""

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
    const [selectedAnswer, setSelectedAnswer] = useState<string>("")
    const [userQuiz, setUserQuiz] = useState<UserQuiz>(new UserQuiz())
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
    const [isExploding, setIsExploding] = useState<boolean>(false)
    const [userQuestion, setUserQuestion] = useState<UserQuestion>(new UserQuestion())

    const [active, setActive] = useState(1);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));


    useEffect(() => {
        loadData(userQuestionId)
    }, []);

    function setData(data: UserNextQuestion) {
        if (!data.user_question || !data.user_answers) {
            nextStep()
            return
        }
        setSelectedAnswers([])
        setSelectedAnswer("")
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
        } finally {
            setIsLoading(false)
        }
    }

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
            if (data.user_quiz.status === 'success') {
                setIsExploding(true)
            }
            setData(data)
        } catch (err) {
            await notifyErrResponse(err)
        } finally {
            setIsLoading(false)
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
    return isLoading ? <PreLoader /> : (
        <div className="user-quiz-fill-form-container">
            <h1 className="quiz-name">{userQuiz.quiz.name}</h1>
            <Stepper active={active} mt="lg">
                <Stepper.Step label="Ver Video" description="Ve el video completo antes de responder la encuesta">
                </Stepper.Step>
                <Stepper.Step label="Responder" description="Responde encuesta">
                    <VideoPlayer userQuiz={userQuiz} nextStep={nextStep} />
                </Stepper.Step>
                <Stepper.Step label="Fin" description="Completado">
                    <UserQuizForm
                        userAnswers={userAnswers} prevStep={prevStep}
                        userQuiz={userQuiz} userQuestion={userQuestion}
                        onSubmit={onSubmit} isSubmitEnabled={isSubmitEnabled}
                        selectedAnswers={selectedAnswers} selectMultiAnswer={selectMultiAnswer}
                        selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer}
                    />
                </Stepper.Step>
                <Stepper.Completed>
                    <UserQuizSummary
                        userQuestionId={userQuestionId}
                        isExploding={isExploding}
                    />
                </Stepper.Completed>
            </Stepper>
        </div>
    )
}