import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {CampaignLoad, QuizPost} from "../helpers/api"
import {Title} from "@mantine/core";
import {notifyErrResponse} from "../components/Errors";
import {Quiz, quizValidation} from "../models/quiz";
import QuizEditForm from "../components/QuizEditForm";
import {Campaign} from "../models/campaign";
import {BreadcrumbItem} from "../models/breadcrumbItem";
import {BreadcrumComponent} from "../components/BreadcrumComponent";

export default function QuizNew() {
    const campaignId = useParams().campaign_id || ""
    const navigate = useNavigate();
    const [quiz] = useState<Quiz>(new Quiz())
    const [items, setItems] = useState<BreadcrumbItem[]>([])
    const canEdit=true
    const form = useForm<Quiz>({
        initialValues: quiz,
        validate: quizValidation(),
    })


    useEffect(() => {
        async function loadData(id: string) {
            try {
                const data = await CampaignLoad(id)
                setItems([
                    {
                        text: `${data.name}`,
                        to: `/campaigns/${data.id}`
                    },
                ])
            } catch (err) {
                await notifyErrResponse(err)
            }
        }

        loadData(campaignId)

    }, []);

    async function onSubmit(data: Quiz) {
        try {
            const campaign = new Campaign()
            campaign.id = campaignId
            data.campaign = campaign
            const res: Quiz = await QuizPost(data)
            const returnURL: string = `/quizs/${res.id}`
            navigate(returnURL);
        } catch (err) {
            await notifyErrResponse(err)
        }
    }


    return (
        <>
            <BreadcrumComponent items={items}/>
            <br/>
            <Title>
                {quiz.name}
            </Title>
            <br/>
            <QuizEditForm onSubmit={onSubmit} form={form} legend="Nueva Encuesta" quiz={quiz} canEdit={canEdit}/>
        </>
    )
}
