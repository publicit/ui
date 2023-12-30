import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {CampaignLoad, QuestionList, QuizDelete, QuizLoad, QuizPublish, QuizPut, UserQuizShareLink} from "../helpers/api"
import {notifyErrResponse} from "../components/Errors";
import {Quiz, QuizStatus, quizValidation} from "../models/quiz";
import {QuizEditForm} from "../components/QuizEditForm";
import QuestionTable from "../components/QuestionTable";
import {Question} from "../models/question";
import {Campaign} from "../models/campaign";
import {BreadcrumbItem} from "../models/breadcrumbItem";
import {BreadcrumComponent} from "../components/BreadcrumComponent";
import {ShowDialog} from "../components/UserQuizShareDialog"
import {ShareDialogBody} from "../components/ShareDialog";
import {quizTokenShareUrl} from "../helpers/user_quiz_utils";

export default function Edit() {
    const id = useParams().id || ""
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState<Quiz>(new Quiz())
    const [questions, setQuestions] = useState<Question[]>([])
    const [campaign, setCampaign] = useState<Campaign>(new Campaign())
    const [canEdit, setCanEdit] = useState<boolean>(false)
    const form = useForm<Quiz>({
        initialValues: quiz,
        validate: quizValidation(),
    })
    const [items, setItems] = useState<BreadcrumbItem[]>([])
    const [sharedUrl, setSharedUrl] = useState("")
    useEffect(() => {
        async function loadData(id: string) {
            try {
                const data = await QuizLoad(id)
                setQuiz(data)
                setCanEdit(data.status === QuizStatus[QuizStatus.draft])
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
        } catch (err: any) {
            await notifyErrResponse(err)
        }
    }

    async function shareQuiz() {
        try {
            const res = await UserQuizShareLink(quiz.id)
            const tokenUrl = quizTokenShareUrl(res)
            console.log('generating a new token:', tokenUrl)
            setSharedUrl(tokenUrl)
        } catch (error) {
            await notifyErrResponse(error)
        }
    }

    return (
        <div>
            <BreadcrumComponent items={items}/>
            <br/>
            <QuizEditForm onSubmit={onSubmit} form={form} legend="Datos de la Encuesta" quiz={quiz}
                          onDelete={onDelete} showDelete={questions.length === 0} onPublish={onPublish}
                          canEdit={canEdit}
            />
            <hr/>
            {quiz.status === QuizStatus[QuizStatus.published] &&
                <ShowDialog
                    children={ShareDialogBody({
                        sharedUrl,
                        text: "Se ha copiado la direccion de la invitacion",
                    })}
                    onClose={() => setSharedUrl("")} onOpen={shareQuiz}/>
            }
            <hr/>
            <QuestionTable rows={questions} canEdit={quiz.status === QuizStatus[QuizStatus.draft]}/>
        </div>
    )
}
