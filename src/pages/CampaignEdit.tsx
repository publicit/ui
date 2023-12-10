import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Campaign, campaignValidation, cleanCampaign} from "../models/campaign";
import {useForm} from "@mantine/form";
import {CampaignDelete, CampaignLoad, CampaignPut, QuizList} from "../helpers/api"
import {Title} from "@mantine/core";
import CampaignEditForm from "../components/CampaignEditForm";
import {notifyErrResponse} from "../components/Errors";
import {Quiz} from "../models/quiz";
import QuizTable from "../components/QuizTable";

export default function Edit() {
    const id = useParams().id || ""
    const returnURL = "/campaigns"
    const navigate = useNavigate();
    const [campaign, setCampaign] = useState<Campaign>(new Campaign())
    const [quizs, setQuizs] = useState<Quiz[]>([])
    const canEdit=true
    const form = useForm<Campaign>({
        initialValues: campaign,
        validate: campaignValidation(),
    })
    useEffect(() => {
        async function loadData(id: string) {
            try {
                const data = await CampaignLoad(id)
                setCampaign(data)
                form.setValues(data)
                const quizData: Quiz[] = await QuizList(id)
                setQuizs(quizData)
            } catch (err) {
                await notifyErrResponse(err)
            }
        }

        loadData(id)
    }, [])

    async function onSubmit(data: Campaign) {
        try {
            await CampaignPut(cleanCampaign(data))
            navigate(returnURL);
        } catch (err) {
            await notifyErrResponse(err)
        }
    }


    async function onDelete() {
        try {
            // eslint-disable-next-line no-restricted-globals
            if (!confirm(`Seguro de eliminar la campaña: ${campaign.name}?`)) return
            await CampaignDelete(id)
            navigate(returnURL);
        } catch (err) {
            await notifyErrResponse(err)
        }
    }

    return (
        <div>
            <Title>
                {campaign.name}
            </Title>
            <br/>
            <CampaignEditForm form={form} onSubmit={onSubmit}
                              canEdit={canEdit}
                              legend="Datos de la Campaña" campaign={campaign}
                              onDelete={onDelete} showDelete={quizs.length === 0}
            />
            <hr/>
            <Title>
                Encuestas
            </Title>
            <QuizTable rows={quizs}/>
        </div>
    )
}
