import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Mantine :
import { Title } from "@mantine/core";
import { useForm } from "@mantine/form";

// Compoenets :
import QuizTable from "../components/QuizTable";
import { notifyErrResponse } from "../components/Errors";
import CampaignEditForm from "../components/CampaignEditForm";

// Models :
import { Quiz } from "../models/quiz";
import { Campaign, campaignValidation, cleanCampaign } from "../models/campaign";

// Helpers :
import { CampaignDelete, CampaignLoad, CampaignPut, QuizList } from "../helpers/api"

// CSS :
import '../Styles/campaings.css'


export default function Edit() {
    const id = useParams().id || ""
    const returnURL = "/campaigns"
    const navigate = useNavigate();
    const [campaign, setCampaign] = useState<Campaign>(new Campaign())
    const [quizs, setQuizs] = useState<Quiz[]>([])
    const [canEdit, setCanEdit] = useState<boolean>(true)
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
            setCanEdit(false)
            await CampaignPut(cleanCampaign(data))
            navigate(returnURL);
        } catch (err) {
            await notifyErrResponse(err)
        } finally {
            setCanEdit(true)
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
        <>
            <Title>{campaign.name}</Title>
            <br />
            <CampaignEditForm
                form={form}
                onSubmit={onSubmit}
                canEdit={canEdit}
                campaign={campaign}
                legend="Datos de la Campaña"
                onDelete={onDelete} showDelete={quizs.length === 0}
            />
            {/* <hr />
            <Title>
                Encuestas
            </Title>
            <QuizTable rows={quizs} /> */}
        </>
    )
}
