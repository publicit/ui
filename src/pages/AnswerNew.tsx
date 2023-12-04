import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useState} from "react";
import {useForm} from "@mantine/form";
import {AnswerPost} from "../helpers/api"
import {Title} from "@mantine/core";
import {notifyErrResponse} from "../components/Errors";
import {Question} from "../models/question";
import {Answer, answerValidation} from "../models/answer";
import AnswerEditForm from "../components/AnswerEditForm";

export default function QuestionNew() {
    const questionId = useParams().question_id || ""
    const question = new Question()
    question.id = questionId
    const navigate = useNavigate();
    const [answer] = useState<Answer>(new Answer())
    const form = useForm<Answer>({
        initialValues: answer,
        validate: answerValidation(),
    })

    async function onSubmit(data: Answer) {
        try {
            data.question = question
            await AnswerPost(data)
            const returnURL = `/questions/${questionId}`
            navigate(returnURL);
        } catch (err) {
            await notifyErrResponse(err)
        }
    }


    return (
        <div>
            <Title>
                {question.body}
            </Title>
            <br/>
            <AnswerEditForm onSubmit={onSubmit} form={form} legend="Nueva Respuesta" questionId={questionId}
                            answer={answer}/>
        </div>
    )
}
