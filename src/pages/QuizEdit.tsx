import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {CampaignLoad, QuestionList, QuizDelete, QuizLoad, QuizPut} from "../helpers/api"
import {Title} from "@mantine/core";
import {notifyErrResponse} from "../components/Errors";
import {Quiz, quizValidation} from "../models/quiz";
import QuizEditForm from "../components/QuizEditForm";
import QuestionTable from "../components/QuestionTable";
import {Question} from "../models/question";
import {Campaign} from "../models/campaign";

export default function Edit() {
    const id = useParams().id || ""
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState<Quiz>(new Quiz())
    const [questions, setQuestions] = useState<Question[]>([])
    const [returnUrl, setReturnUrl] = useState<string>("")
    const [campaign,setCampaign]=useState<Campaign>(new Campaign())
    const form = useForm<Quiz>({
        initialValues: quiz,
        validate: quizValidation(),
    })
    useEffect(() => {
        async function loadData(id: string) {
            try {
                const data = await QuizLoad(id)
                setQuiz(data)
                form.setValues(data)
                const res = await QuestionList(id)
                setQuestions(res)
                const resCampaign=await CampaignLoad(data.campaign.id)
                setReturnUrl(`/campaigns/${resCampaign.id}`)
                setCampaign(resCampaign)
            } catch (err) {
                await notifyErrResponse(err)
            }
        }

        loadData(id)
    }, [])

    async function onSubmit(data: Quiz) {
        try {
            await QuizPut(data)
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
            navigate(returnUrl);
        } catch (err) {
            await notifyErrResponse(err)
        }
    }

    return (
        <div>
            <Title>
                <Link to={`/campaigns/${campaign.id}`}>
                    {campaign.name}
                </Link>
            </Title>
            <br/>
            <QuizEditForm onSubmit={onSubmit} form={form} legend="Datos de la Encuesta" quiz={quiz}
                          campaignId={quiz.campaign.id} onDelete={onDelete} showDelete={questions.length === 0}/>
            <QuestionTable rows={questions}/>
        </div>
    )
}
