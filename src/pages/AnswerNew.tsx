import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {AnswerPost, QuestionLoad} from "../helpers/api"
import {Breadcrumbs} from "@mantine/core";
import {notifyErrResponse} from "../components/Errors";
import {Question} from "../models/question";
import {Answer, answerValidation} from "../models/answer";
import AnswerEditForm from "../components/AnswerEditForm";
import {BreadcrumbItem} from "../models/breadcrumbItem";

export default function AnswerNew() {
    const questionId = useParams().question_id || ""
    const navigate = useNavigate();
    const [answer] = useState<Answer>(new Answer())
    const [question, setQuestion] = useState<Question>(new Question())
    const [items, setItems] = useState<BreadcrumbItem[]>([])
    const form = useForm<Answer>({
        initialValues: answer,
        validate: answerValidation(),
    })

    useEffect(() => {
        async function loadData(id: string) {
            try {
                const data = await QuestionLoad(id)
                setQuestion(data)
                setItems([
                    {
                        text: `${data.quiz.campaign.name}`,
                        to: `/campaigns/${data.quiz.campaign.id}`
                    },
                    {
                        text: `${data.quiz.name}`,
                        to: `/quizs/${data.quiz?.id}`
                    },
                    {
                        text: `${data.body}`,
                        to: `/questions/${data.id}`
                    },
                ])
            } catch (err) {
                await notifyErrResponse(err)
            }
        }

        loadData(questionId)

    }, []);

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
            <Breadcrumbs>
                {items.map((item: BreadcrumbItem) => (
                    <Link to={item.to}>{item.text}</Link>
                ))}
            </Breadcrumbs>
            <br/>
            <AnswerEditForm onSubmit={onSubmit} form={form} legend="Nueva Respuesta"
                            answer={answer}/>
        </div>
    )
}
