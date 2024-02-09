import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

// ANT-D :
import {Col, Row} from "antd";

// Mantine :
import {Title} from "@mantine/core";
import {useForm} from "@mantine/form";

// Compoenets :
import QuizTable from "../components/QuizTable";
import PreLoader from "../components/PreLoader";
import {notifyErrResponse} from "../components/Errors";
import CampaignEditForm from "../components/CampaignEditForm";

// Models :
import {Quiz} from "../models/quiz";
import {Campaign, campaignValidation, cleanCampaign} from "../models/campaign";

// Helpers :
import {CampaignDelete, CampaignLoad, CampaignPut, QuizList} from "../helpers/api"


export default function Edit() {
    const id = useParams().id || ""
    const returnURL = "/campaigns"
    const navigate = useNavigate();
    const [campaign, setCampaign] = useState<Campaign>(new Campaign())
    const [quizs, setQuizs] = useState<Quiz[]>([])
    const [canEdit, setCanEdit] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const form = useForm<Campaign>({
        initialValues: campaign,
        validate: campaignValidation(),
    })

    useEffect(() => {
        async function loadData(id: string) {
            try {
                setIsLoading(true)
                const data = await CampaignLoad(id)
                setCampaign(data)
                form.setValues(data)
                setIsLoading(false)
                const quizData: Quiz[] = await QuizList(id)
                setQuizs(quizData)
            } catch (err) {
                setIsLoading(false)
                await notifyErrResponse(err)
            }
        }

        loadData(id)
    }, [])

    async function onSubmit(data: Campaign) {
        try {
            setCanEdit(false)
            setIsLoading(true)
            await CampaignPut(cleanCampaign(data))
            navigate(returnURL);
            setIsLoading(false)
        } catch (err) {
            await notifyErrResponse(err)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
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

    return isLoading ? <PreLoader/> : (
        <Row gutter={15}>
            <Col span={10}>
                <Title>{campaign.name}</Title>
                <div className="campaign-profile-wrap">
                    <CampaignEditForm
                        form={form}
                        onSubmit={onSubmit}
                        canEdit={canEdit}
                        campaign={campaign}
                        legend="Datos de la Campaña"
                        onDelete={onDelete} showDelete={quizs.length === 0}
                    />
                </div>
            </Col>
            <Col span={14}>
                <Title>Encuestas</Title>
                <QuizTable rows={quizs}/>
            </Col>
        </Row>
    )
}
