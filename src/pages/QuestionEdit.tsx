import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {AnswerList, QuestionDelete, QuestionLoad, QuestionPut} from "../helpers/api"
import {notifyErrResponse} from "../components/Errors";
import {Question, questionValidation} from "../models/question";
import QuestionEditForm from "../components/QuestionEditForm";
import {Answer} from "../models/answer";
import AnswerTable from "../components/AnswerTable";
import {BreadcrumbItem} from "../models/breadcrumbItem";
import {Breadcrumbs} from "@mantine/core";

export default function Edit() {
    const id = useParams().id || ""
    const navigate = useNavigate();
    const [question, setQuestion] = useState<Question>(new Question())
    const [returnUrl, setReturnUrl] = useState<string>("")
    const [answers, setAnswers] = useState<Answer[]>([])
    const [items, setItems] = useState<BreadcrumbItem[]>([])
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
                setReturnUrl(`/quizs/${data.quiz.id}`)
                const answerData = await AnswerList(id)
                setAnswers(answerData)
                setItems([
                    {
                        text: `${data.quiz.campaign.name}`,
                        to: `/campaigns/${data.quiz.campaign?.id}`
                    },
                    {
                        text: `${data.quiz.name}`,
                        to: `/quizs/${data.quiz.id}`
                    },
                ])
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
        <>
            <Breadcrumbs>
                {items.map((item: BreadcrumbItem) => (
                    <Link to={item.to}>{item.text}</Link>
                ))}
            </Breadcrumbs>
            <br/>
            <QuestionEditForm onSubmit={onSubmit} form={form}
                              question={question} onDelete={onDelete} showDelete={answers.length === 0}/>
            <AnswerTable rows={answers}/>
        </>
    )
}
