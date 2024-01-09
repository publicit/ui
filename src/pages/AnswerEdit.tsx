import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {AnswerDelete, AnswerLoad, AnswerPut} from "../helpers/api"
import {notifyErrResponse} from "../components/Errors";
import {Question} from "../models/question";
import {Answer, answerValidation} from "../models/answer";
import AnswerEditForm from "../components/AnswerEditForm";
import {BreadcrumbItem} from "../models/breadcrumbItem";
import {BreadcrumComponent} from "../components/BreadcrumComponent";
import {QuizStatus} from "../models/quiz";

export default function AnswerEdit() {
    const id = useParams().id || ""
    const navigate = useNavigate();
    const [answer, setAnswer] = useState<Answer>(new Answer())
    const [question, setQuestion] = useState<Question>(new Question())
    const [items, setItems] = useState<BreadcrumbItem[]>([])
    const [canEdit,setCanEdit]=useState<boolean>(false)
    const form = useForm<Answer>({
        initialValues: answer,
        validate: answerValidation(),
    })

    function returnUrl() {
        return `/questions/${question.id}`
    }

    useEffect(() => {
        async function loadData(id: string) {
            try {
                const data = await AnswerLoad(id)
                setAnswer(data)
                setQuestion(data.question)
                enableControls(data.question)
                form.setValues(data)
                setItems([
                    {
                        text: `${data.question.quiz.campaign.name}`,
                        to: `/campaigns/${data.question.quiz.campaign?.id}`
                    },
                    {
                        text: `${data.question.quiz.name}`,
                        to: `/quizs/${data.question.quiz.id}`
                    },
                    {
                        text: `${data.question.body}`,
                        to: `/questions/${data.question.id}`
                    },
                ])
            } catch (err) {
                await notifyErrResponse(err)
            }
        }

        loadData(id)

    }, []);

    function enableControls(q:Question){
        setCanEdit(q.quiz.status === QuizStatus[QuizStatus.draft])
    }

    async function onSubmit(data: Answer) {
        try {
            data.question = question
            await AnswerPut(data)
            navigate(returnUrl());
        } catch (err) {
            await notifyErrResponse(err)
        }finally {
            enableControls(question)
        }
    }

    async function onDelete() {
        try {
            // eslint-disable-next-line no-restricted-globals
            if (!confirm(`Seguro de eliminar la respuesta?`)) return
            await AnswerDelete(answer.id)
            navigate(returnUrl());
        } catch (err) {
            await notifyErrResponse(err)
        }
    }


    return (
        <div>
            <BreadcrumComponent items={items}/>
            <br/>
            <AnswerEditForm onSubmit={onSubmit} form={form} legend={answer.body}
                            answer={answer} onDelete={onDelete} canEdit={canEdit}/>
        </div>
    )
}
