import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useState} from "react";
import {useForm} from "@mantine/form";
import {QuestionPost} from "../helpers/api"
import {Title} from "@mantine/core";
import {notifyErrResponse} from "../components/Errors";
import {Quiz} from "../models/quiz";
import {Question, questionValidation} from "../models/question";
import QuestionEditForm from "../components/QuestionEditForm";
import {Campaign} from "../models/campaign";

export default function QuestionNew() {
    const [searchParams] = useSearchParams()
    const quizId = useParams().quiz_id || ""
    console.info(`useParams(): ${JSON.stringify(useParams())}`)
    const quiz = new Quiz()
    quiz.id = quizId
    quiz.campaign = new Campaign()
    quiz.campaign.id = searchParams.get("id") || ""
    const navigate = useNavigate();
    const [question] = useState<Question>(new Question())
    const form = useForm<Question>({
        initialValues: question,
        validate: questionValidation(),
    })

    async function onSubmit(data: Question) {
        try {
            data.quiz = quiz
            const res = await QuestionPost(quiz, data)
            const returnURL = `/questions/${quizId}/${res.id}`
            navigate(returnURL);
        } catch (err) {
            await notifyErrResponse(err)
        }
    }


    return (
        <div>
            <Title>
                {quiz.name}
            </Title>
            <br/>
            <QuestionEditForm onSubmit={onSubmit} form={form} legend="Nueva Pregunta" quiz={quiz}/>
        </div>
    )
}
