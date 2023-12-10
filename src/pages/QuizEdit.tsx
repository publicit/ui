import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {CampaignLoad, QuestionList, QuizDelete, QuizLoad, QuizPublish, QuizPut} from "../helpers/api"
import {notifyErrResponse} from "../components/Errors";
import {Quiz, QuizStatus, quizValidation} from "../models/quiz";
import QuizEditForm from "../components/QuizEditForm";
import QuestionTable from "../components/QuestionTable";
import {Question} from "../models/question";
import {Campaign} from "../models/campaign";
import {BreadcrumbItem} from "../models/breadcrumbItem";
import {BreadcrumComponent} from "../components/BreadcrumComponent";

export default function Edit() {
    const id = useParams().id || ""
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState<Quiz>(new Quiz())
    const [questions, setQuestions] = useState<Question[]>([])
    const [campaign, setCampaign] = useState<Campaign>(new Campaign())
    const form = useForm<Quiz>({
        initialValues: quiz,
        validate: quizValidation(),
    })
    const [items, setItems] = useState<BreadcrumbItem[]>([])
    useEffect(() => {
        async function loadData(id: string) {
            try {
                const data = await QuizLoad(id)
                setQuiz(data)
                form.setValues(data)
                const res = await QuestionList(id)
                setQuestions(res)
                const resCampaign = await CampaignLoad(data.campaign.id)
                setCampaign(resCampaign)
                setItems([
                    {
                        text: resCampaign.name,
                        to: `/campaigns/${resCampaign.id}`
                    }
                ])
            } catch (err) {
                await notifyErrResponse(err)
            }
        }

        loadData(id)
    }, [])

    async function onSubmit(data: Quiz) {
        try {
            await QuizPut(data)
            const returnUrl = `/campaigns/${campaign.id}`
            navigate(returnUrl);
        } catch (err) {
            await notifyErrResponse(err)
        }
    }

    async function onDelete() {
        try {
            // eslint-disable-next-line no-restricted-globals
            if (!confirm(`Seguro de eliminar la encuesta: ${quiz.name}?`)) return
            await QuizDelete(id)
            const returnUrl = `/campaigns/${campaign.id}`
            navigate(returnUrl);
        } catch (err) {
            await notifyErrResponse(err)
        }
    }

    async function onPublish() {
        try {
            // eslint-disable-next-line no-restricted-globals
            if (!confirm(`Seguro de publicar la encuesta: ${quiz.name}?\nUna vez publicada ya no se podran editar las preguntas.`)) return
            await QuizPublish(id)
            const returnUrl = `/campaigns/${campaign.id}`
            navigate(returnUrl);
        } catch (err) {
            await notifyErrResponse(err)
        }
    }

    return (
        <div>
            <BreadcrumComponent items={items}/>
            <br/>
            <QuizEditForm onSubmit={onSubmit} form={form} legend="Datos de la Encuesta" quiz={quiz}
                          onDelete={onDelete} showDelete={questions.length === 0} onPublish={onPublish}/>
            <QuestionTable rows={questions} canEdit={quiz.status === QuizStatus[QuizStatus.draft]}/>
        </div>
    )
}
