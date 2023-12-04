import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {AnswerList, QuestionDelete, QuestionLoad, QuestionPut, QuizLoad} from "../helpers/api"
import {notifyErrResponse} from "../components/Errors";
import {Quiz} from "../models/quiz";
import {Question, questionValidation} from "../models/question";
import QuestionEditForm from "../components/QuestionEditForm";
import {Answer} from "../models/answer";

export default function Edit() {
    const id = useParams().id || ""
    const navigate = useNavigate();
    const [question, setQuestion] = useState<Question>(new Question())
    const [quiz, setQuiz] = useState<Quiz>(new Quiz())
    const [returnUrl, setReturnUrl] = useState<string>("")
    const [answers, setAnswers] = useState<Answer[]>([])
    const form = useForm<Question>({
        initialValues: question,
        validate: questionValidation(),
    })
    useEffect(() => {
        async function loadData(id: string) {
            try {
                const data = await QuestionLoad(id)
                setQuestion(data)
                form.setValues(data)
                const quizData = await QuizLoad(data.quiz.id)
                setQuiz(quizData)
                setReturnUrl(`/quizs/${quizData.id}`)
                const answerData = await AnswerList(id)
                setAnswers(answerData)
            } catch (err) {
                await notifyErrResponse(err)
            }
        }

        loadData(id)
    }, [])

    async function onSubmit(data: Question) {
        try {
            await QuestionPut(data)
            navigate(returnUrl);
        } catch (err) {
            await notifyErrResponse(err)
        }
    }

    async function onDelete() {
        try {
            // eslint-disable-next-line no-restricted-globals
            if (!confirm(`Seguro de eliminar la pregunta?`)) return
            await QuestionDelete(id)
            navigate(returnUrl);
        } catch (err) {
            await notifyErrResponse(err)
        }
    }

    return (
        <div>
            <br/>
            <QuestionEditForm onSubmit={onSubmit} form={form} legend={quiz.name} quizId={quiz.id}
                              question={question} onDelete={onDelete} showDelete={answers.length === 0}/>
        </div>
    )
}
